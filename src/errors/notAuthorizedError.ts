import { IResult } from '../results/IResult';
import {ErrorResult} from "../results/errorResult";
import { SsiError } from "./ssiError";

export class NotAuthorizedError extends SsiError {
    status : number = 401;

    constructor() {
        super("Not authorized");
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(): IResult {
        return new ErrorResult({status: this.status, message: "Not authorized"});
    }

}