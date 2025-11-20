import dotenv from 'dotenv';
import { IConfig } from '../types';
dotenv.config();

export const config: IConfig = {
    serviceName: process.env.SERVICENAME || "boiler_plate_service",
    port: Number(process.env.PORT) || 5001,
    loggerLevel: "debug",
    env: process.env.ENVIRONMENT || "LOCAL",
    db: {
        user: process.env.DB_USER || "",
        database: process.env.DB_SCHEMA || "",
        password: process.env.DB_PASSWORD || "",
        host: process.env.DB_HOST || "",
        keepAlive: true,
        port: Number(process.env.DB_PORT) || 5432,
    },
    dbSecondary: {
        user: process.env.DB_USER || "",
        database: process.env.DB_SCHEMA2 || "boilerplate_db2",
        password: process.env.DB_PASSWORD || "",
        host: process.env.DB_HOST || "",
        keepAlive: true,
        port: Number(process.env.DB_PORT) || 5432,
    },
    pool: {
        min: Number(process.env.DB_MIN_CLIENTS) || 2,
        max: Number(process.env.DB_MAX_CLIENTS),
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000,
        acquireTimeoutMillis: Number(process.env.DB_ACQUIRE_TIMEOUT_MS) || 10000,
    },
    redis: {
        host: process.env.REDIS_HOST || "",
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || "",
        ssl: process.env.REDIS_SSL === "true" || false,
    },
    swagger: {
        user: process.env.SWAGGER_USER || "",
        password: process.env.SWAGGER_PASSWORD || ""
    },
    encryption: {
        dataEncryptionKey: process.env.DATA_ENCRYPTION_KEY || "",
        responseEncryptionKey: process.env.RESPONSE_ENCRYPTION_KEY || "",
    },
    kafka: {
        brokers: process.env.KAFKA_BROKERS || "kafka:29092",
        clientId: process.env.KAFKA_CLIENT_ID || "backend-service",
        groupId: process.env.KAFKA_GROUP_ID || "backend-group"
    }

};
