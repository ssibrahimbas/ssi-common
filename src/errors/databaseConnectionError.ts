import { SsiError } from "./ssiError";
import { IResult } from '../results/IResult';
import { ErrorResult } from "../results/errorResult";

export class DatabaseConnectionError extends SsiError {
    status = 500;
    message = "Error connecting to database";

    constructor() {
        super("Error connecting to database");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(): IResult {
        return new ErrorResult({ status: this.status, message: "Error connecting to database" });
    }

}