import { IResult } from "./IResult";

type ResultParams = {
    message : string;
    status? : number;
}

export class ErrorResult implements IResult {
    status!: number;
    success = false;
    message!: string;

    constructor(result: ResultParams) {
        this.status = result.status || 400;
        this.message = result.message;
    }
}