import httpStatus from "http-status";

class ExtendableError extends Error {
    errors: any;
    status: any;

    constructor({ message, errors, status }: { message: string; errors: any; status?: any }) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
    }
}

export class APIError extends ExtendableError {
    constructor({ message, errors, status = httpStatus.INTERNAL_SERVER_ERROR }: { message: string; errors?: any; status?: any }) {
        super({
            message,
            errors,
            status,
        });
    }
}
