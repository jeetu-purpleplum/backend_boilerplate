// Module Imports
import knex from "knex"; // ← actual Knex function
import { Knex } from "knex";
// File Imports
import { config } from "../config/config";
import { logger } from "./logger";
import { DatabaseConnections, IPgConfig, IPgPoolConfig, SqlParam } from "../types";
import Redis, { RedisOptions } from "ioredis";

const getDbConfig = (dbConfig: any): IPgConfig => {
    const commonConfig = {
        host: dbConfig.host,
        user: dbConfig.user,
        port: dbConfig.port,
        password: dbConfig.password,
        database: dbConfig.database,
    };

    let pgconfig: IPgConfig;

    if (config.env === "LOCAL") {
        pgconfig = { ...commonConfig, keepAlive: true };
    } else {
        pgconfig = {
            ...commonConfig,
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
            keepAlive: true,
        };
    }
    return pgconfig;
};

const pgpool: IPgPoolConfig = {
    min: config.pool.min,
    max: config.pool.max,
    idleTimeoutMillis: config.pool.idleTimeoutMillis,
    acquireTimeoutMillis: config.pool.acquireTimeoutMillis || 10000,
};

// 1. PRIMARY CONNECTION
const primaryPgConfig = getDbConfig(config.db);
export const primaryConnection = knex({
    client: "postgresql",
    connection: primaryPgConfig,
    debug: true,
    pool: pgpool,
});

logger.info(`Primary DB Connection Settings: ${JSON.stringify(primaryPgConfig)}`);


// 2. SECONDARY CONNECTION (e.g., for logging, or a separate service)
// **We need to define config.dbSecondary in your config file!**
const secondaryPgConfig = getDbConfig(config.dbSecondary); 
export const secondaryConnection = knex({
    client: "postgresql",
    connection: secondaryPgConfig,
    debug: true,
    pool: pgpool,
});

logger.info(`Secondary DB Connection Settings: ${JSON.stringify(secondaryPgConfig)}`);

const allConnections: DatabaseConnections = [primaryConnection, secondaryConnection];

// --- Existing Error Handling & safeRaw (needs modification to accept Knex instance) ---

primaryConnection.on("error", function (err: Error) {
    logger.error(`Primary idle client error, ${err.message} | ${err.stack}`);
});

secondaryConnection.on("error", function (err: Error) {
    logger.error(`Secondary idle client error, ${err.message} | ${err.stack}`);
});



// ✅ Patch: Wrap queries with retry once logic
// ✅ Patch: Retry once if idle connection was killed
async function safeRaw<TResult = Record<string, unknown>>(
    knexInstance: Knex,
    sql: string,
    params: SqlParam[] = [],
    trx?: Knex.Transaction,
    maxRetries = 1,
    retryDelayMs = 200
): Promise<TResult[]> {
    const executor = trx ?? knexInstance;
    let attempt = 0;

    while (true) {
        try {
            console.log("I am executing saferaw");
            const result = await executor.raw(sql, ...params);
            return result.rows as TResult[]; // fix: return just the rows
        } catch (err) {
            attempt++;

            const error = err as Error & { message?: string };

            const isIdleError =
                error?.message.includes("Connection terminated unexpectedly") ||
                error?.message.includes("Connection ended unexpectedly");

            if (isIdleError && attempt <= maxRetries) {
                logger.warn(
                    `Idle PG connection closed, retrying query (attempt ${attempt}/${maxRetries})...`
                );
                if (retryDelayMs > 0) {
                    await new Promise((res) => setTimeout(res, retryDelayMs));
                }
                continue;
            }

            throw err;
        }
    }
}

// ✅ Replace all usage with proxiedConnection
(async () => {
    try {
        console.log("Testing PRIMARY PostgreSQL connection...");
        const resPrimary = await safeRaw(primaryConnection, "SELECT 1"); // Pass primaryConnection
        console.log("PRIMARY PostgreSQL connected", resPrimary);
        
        console.log("Testing SECONDARY PostgreSQL connection...");
        const resSecondary = await safeRaw(secondaryConnection, "SELECT 1"); // Pass secondaryConnection
        console.log("SECONDARY PostgreSQL connected", resSecondary);
    } catch (err) {
        console.error("A PostgreSQL connection failed");
        console.error(err);
        process.exit(1);
    }
})();


// Add connection behavior options for redis
const redisOptions: RedisOptions = {
    host: config?.redis?.host || "127.0.0.1",
    password: config?.redis?.password || undefined,
    port: config?.redis?.port || 6379,
    connectTimeout: 10000,
    retryStrategy: (times: number) => Math.min(times * 100, 3000),
    reconnectOnError: (err: Error) =>
        ["READONLY", "ECONNRESET"].some((msg) => err.message.includes(msg)),
    enableOfflineQueue: true,
    maxRetriesPerRequest: null, // Avoid timeout errors under load
};

// Separate condition for SSL configuration
if (config?.redis?.ssl) {
    redisOptions.tls = {}; // Add TLS configuration if SSL is enabled
}

// console.log("Redis connection options", redisOptions);

export const redisConnection = new Redis(redisOptions);

// Event listeners
redisConnection.on("connect", () => logger.info("Redis connected"));
redisConnection.on("ready", () => logger.info("Redis ready for use!!!"));
redisConnection.on("error", (err) => logger.error("Redis error", err));
redisConnection.on("close", () => logger.warn("Redis connection closed.."));
redisConnection.on("reconnecting", () => logger.info("Reconnecting to Redis..."));

process.on("SIGTERM", async () => {
    console.log("Graceful shutdown initiated: Closing DB connections");
    // Close ALL connections
    for (const conn of allConnections) {
        await conn.destroy().catch(e => logger.error("Failed to destroy connection:", e));
    }
    process.exit(0);
});

// ✅ Extra safety to catch silent failures
process.on("unhandledRejection", (err) => console.error("Unhandled Rejection:", err));
process.on("uncaughtException", (err) => console.error("Uncaught Exception:", err));

export default primaryConnection;
