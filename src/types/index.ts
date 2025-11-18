import { Knex } from "knex";

export interface IConfig {
    serviceName: string;
    port: number;
    loggerLevel: string;
    env: string;
    db: IPgConfig;
    dbSecondary: IPgConfig;
    pool: IPgPoolConfig;
    redis: IRedisConfig;
    swagger: ISwaggerConfig;
    encryption: IEncryption;

}

export interface IPgConfig {
    user: string;
    database: string;
    password: string;
    host: string;
    port: number;
    keepAlive: boolean;
    ssl?: ISsl;
}

interface IRedisConfig {
    host: string;
    port: number;
    password: string;
    ssl: boolean;
}

export interface IPgPoolConfig {
    min: number;
    max: number;
    idleTimeoutMillis: number;
    acquireTimeoutMillis: number;
}

export interface ISsl {
    require: boolean;
    rejectUnauthorized: boolean;
}

export interface ISwaggerConfig {
    user: string;
    password: string;
}

interface IEncryption {
    dataEncryptionKey: string;
    responseEncryptionKey: string;
}

export type DatabaseConnections = Knex[];

export type SqlParam = string | number | boolean | null | Date | Record<string, unknown>;