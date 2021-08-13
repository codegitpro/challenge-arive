import express from "express";
import httpStatus from "http-status";
import expressValidation from "express-validation";
import { APIError } from "./APIError";

export const ErrorMiddleware = {
    handler: (err: any, req: express.Request, res: express.Response) => {
        const response = {
            code: err.status,
            message: err.message || httpStatus[err.status],
            errors: err.errors,
        };

        res.status(err.status);
        res.json(response);
    },

    converter: (err: any, req: express.Request, res: express.Response, next: any) => {
        let convertedError = err;

        if (err instanceof expressValidation.ValidationError) {
            convertedError = new APIError({
                message: "Validation Error",
                errors: err.details,
                status: err.statusCode,
            });
        } else if (!(err instanceof APIError)) {
            convertedError = new APIError({
                message: err.message,
                status: err.status,
            });
        }

        return ErrorMiddleware.handler(convertedError, req, res);
    },

    notFound: (req: express.Request, res: express.Response, next: any) => {
        const err = new APIError({
            message: "Not found",
            status: httpStatus.NOT_FOUND,
        });
        return ErrorMiddleware.handler(err, req, res);
    },
};
