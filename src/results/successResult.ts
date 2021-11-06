import { IResult } from "./IResult";

export class SuccessResult implements IResult {
    status!: number;
    success = true;
    message!: string;

    constructor(process: {message?: string; status?: number}) {
        this.message = process.message || 'OK';
        this.status = process.status || 200;
     }
}