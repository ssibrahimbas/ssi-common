import { IResult } from "./IResult";

type ResultParams = {
    message? : string;
    status? : number;
}

export class SuccessResult implements IResult {
    status!: number;
    success = true;
    message!: string;

    constructor(result: ResultParams) {
        this.message = result.message || 'OK';
        this.status = result.status || 200;
    }

}