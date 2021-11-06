import { SsiError } from "./ssiError";
import { IResult } from "../results/IResult";
import {ErrorResult} from "../results/errorResult";

export class BadRequestError extends SsiError {
    status = 400;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): IResult {
        return new ErrorResult({status: this.status, message: this.message});
    }

}