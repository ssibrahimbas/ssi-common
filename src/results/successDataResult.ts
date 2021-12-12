import { IDataResult } from "./IDataResult";
import {SuccessResult} from "./successResult";

type ResultParams<T> = {
    status?: number;
    message: string;
    data: T;
};

export class SuccessDataResult<T> extends SuccessResult implements IDataResult<T> {
    success = true;
    data!: T;
    message!: string;
    status!: number;

    constructor(result: ResultParams<T>) {
        super({status: result.status || 200, message: result.message});
        this.data = result.data;

    }
}