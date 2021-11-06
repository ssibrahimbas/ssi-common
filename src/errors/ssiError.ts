import { IResult } from "../results/IResult";

export abstract class SsiError extends Error {
    abstract status : number;
    success: boolean = false;

    constructor(message : string) {
        super(message);
        Object.setPrototypeOf(this, SsiError.prototype);
    }

    abstract serializeErrors() : IResult;
}