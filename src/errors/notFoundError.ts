import { ErrorResult } from "../results/errorResult";
import { IResult } from "../results/IResult";
import { SsiError } from "./ssiError";

export class NotFoundError extends SsiError {
    status = 404;
    message!: string;

    constructor(message: string) {
        super(message);
        this.message = message;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): IResult {
        return new ErrorResult({ status: this.status, message: this.message });
    }

}