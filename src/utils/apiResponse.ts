// Module Imports
import { Request, Response, NextFunction } from "express";
import { ValidationError, NotFoundError, DBError, DataError } from "objection";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";

import createError from "http-errors";

// Helper Imports
import { logger } from "./logger";


export interface ApiResponse {
    error: boolean;
    status: number;
    message: any;
    data: any;
    count?: number;
}

export const getOkResponse = (data: any = {}, count = 0, message = "OK"): ApiResponse => {
    console.log(count);
    // console.log(data);
    return { error: false, status: 200, message, data: data };
};

export const getErrorResponse = (err: Error): ApiResponse => {
    const apiResponse = {
        error: true,
        status: 500,
        message: "There was an error, please try again",
        data: {},
    };
    if (err instanceof ValidationError) {
        apiResponse.status = 406;
        apiResponse.message = err.message;
    } else if (err instanceof DataError) {
        apiResponse.status = 406;
        apiResponse.message = "invalid data sent";
    } else if (err instanceof DBError) {
        console.log(err);
        apiResponse.status = 406;
        apiResponse.message = "unable to update";
    } else if (err instanceof NotFoundError) {
        apiResponse.status = 404;
        apiResponse.message = "record does not exist";
    } else if (err instanceof NotBeforeError) {
        apiResponse.status = 400;
        apiResponse.message = "jwt not active";
    } else if (err instanceof JsonWebTokenError) {
        apiResponse.status = 401;
        apiResponse.message = err.message;
    } else if (err instanceof TokenExpiredError) {
        apiResponse.status = 401;
        apiResponse.message = "jwt token expired";
    } else if (err instanceof createError.HttpError) {
        apiResponse.status = err.statusCode;
        apiResponse.message = err.message;
        const { data } = err;
        if (data) {
            apiResponse.data = { data };
        }
    } else if (err.message === "ESOCKETTIMEDOUT" || err.message === "ETIMEDOUT") {
        apiResponse.status = 500;
        apiResponse.message = "There was a network issue. Please try again";
    } else {
        logger.error(err.message);
        console.log(err);
    }
    logger.error(err.message);
    return apiResponse;
};

export const sendApiResponse = (
    req: Request,
    res: Response,
    next: NextFunction,
    cb: (req: Request, res: Response, next: NextFunction) => Promise<ApiResponse>
) => {
    cb(req, res, next)
        .then((apiResponse) => {
            res.locals.apiResponse = apiResponse; // Store response in res.locals
            // Do not send the response here, encryption middleware will handle it
            next(); // Call next to continue to the middleware
        })
        .catch((err) => {
            console.log(err.stack);
            logger.info(`Error Block`);
            const errResponse = getErrorResponse(err);
            res.locals.apiResponse = errResponse; // Store error response in res.locals
            // Do not send the response here, encryption middleware will handle it
            next(); // call to the next middleware
        });
};

export const sendApiNonEncryptResponse = (
    req: Request,
    res: Response,
    next: NextFunction,
    cb: (req: Request, res: Response, next: NextFunction) => Promise<ApiResponse>
) => {
    cb(req, res, next)
        .then((apiResponse) => {
            res.status(apiResponse.status).send(apiResponse);
        })
        .catch((err) => {
            logger.info(`Error Block`);
            const errResponse = getErrorResponse(err);
            res.status(errResponse.status).send(errResponse);
        });
};
