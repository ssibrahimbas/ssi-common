import {SsiDataError} from './ssiErrorData';
import {ValidationError} from "express-validator";
import { ErrorDataResult } from '..';

type ErrorType = {
    message: string;
    field: string;
}

export class RequestValidatorError extends SsiDataError<ErrorType[]> {
    data!: ErrorType[];
    status = 400;

    constructor(public errors : ValidationError[], message? : string) {
        super(message || "Invalid Request Parameters!");
        this.data = this.errors.map(err => {
            return {
                message: err.msg,
                field: err.param
            }
        })
        Object.setPrototypeOf(this, RequestValidatorError.prototype);
    }

    serializeErrors() {
        return new ErrorDataResult<ErrorType[]>({
            status: this.status,
            message: this.message,
            data: this.data
        })
    }
}