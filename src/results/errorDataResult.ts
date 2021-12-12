import { IDataResult } from "./IDataResult";
import {ErrorResult} from "./errorResult";

type ResultParams<T> = {
    status?: number;
    message: string;
    data: T;
};

export class ErrorDataResult<T> extends ErrorResult implements IDataResult<T> {
    success = false;
    status!: number;
    message!: string;
    data!: T;

    constructor(result: ResultParams<T>) {
        super({status: result.status || 400, message: result.message});
        this.data = result.data;

    }
}