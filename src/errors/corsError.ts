import { SsiError } from "./ssiError";
import { IResult } from "../results/IResult";
import { ErrorResult } from "../results/errorResult";

export class CorsError extends SsiError {
    status = 403;
    name = "CorsError";

    constructor(public origin: string) {
        super("out of whitelist: " + origin);
        Object.setPrototypeOf(this, CorsError.prototype);
    }

    serializeErrors(): IResult {
        return new ErrorResult({ status: this.status, message: this.message });
    }

}
