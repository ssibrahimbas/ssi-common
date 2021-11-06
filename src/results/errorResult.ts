import { IResult } from "./IResult";

export class ErrorResult implements IResult {
    status!: number;
    success = false;
    message!: string;

    constructor(err: { message: string, status?: number }) {
        this.status = err.status || 400;
        this.message = err.message;
    }
}