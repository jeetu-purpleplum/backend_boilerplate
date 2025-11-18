import { NextFunction, Request, Response } from "express";
import { body, param, query, ValidationChain, validationResult } from "express-validator";
import { ValidationError } from "express-validator/lib/base"


type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export const bodyNotEmpty = (field: string, validationType = "body"): ValidationChain => {
    function validate(validationType: string) {
        if (validationType == "body") {
            return body(field);
        } else if (validationType == "query") {
            return query(field);
        } else if (validationType == "param") {
            return param(field);
        }
    }

    return validate(validationType)!.not().isEmpty().withMessage("must be provided");
};

const getValidationResponse = (error: ValidationError) => {
    const apiResponse = {
        error: true,
        status: 406,
        message: "Validation Error",
        data: {},
    };
    apiResponse.message = `${error.type} ${error.msg}`;
    return apiResponse;
};

export const validate = (validations: ValidationChain[]): Middleware => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
            return;
        }

        const errResponse = getValidationResponse(errors.array({ onlyFirstError: true })[0]);

        res.status(errResponse.status).send(errResponse);
    };
};