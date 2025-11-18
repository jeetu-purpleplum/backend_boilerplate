import { config } from "../config/config";
import { createLogger, format, transports } from "winston";
import type { Request, NextFunction, Response } from "express";

const { combine, timestamp, printf } = format;

const loggerFormat = printf((info) => {
    return `${info.timestamp} | ${info.level}: ${info.message}`;
});

export const logger = createLogger({
    level: config.loggerLevel,
    format: combine(format.colorize(), timestamp(), loggerFormat),
    transports: [new transports.Console()],         // Here Transports the logs to console
});

export const requestInfo = (req: Request, res: Response, next: NextFunction) => {
    logger.info("Headers");
    logger.info(JSON.stringify(req.headers, null, 4));
    logger.info("Query");
    logger.info(JSON.stringify(req.query, null, 4));
    logger.info("Path Params");
    logger.info(JSON.stringify(req.params, null, 4));
    logger.info("Body");
    logger.info(JSON.stringify(req.body, null, 4));
    next();
};
