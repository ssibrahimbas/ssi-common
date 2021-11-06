import { IDataResult } from "./IDataResult";

type ErrorParams<T> = {
    status?: number;
    message: string;
    data: T;
};

export class ErrorDataResult<T> implements IDataResult<T> {
    success = false;
    status!: number;
    message!: string;
    data!: T;

    constructor(err: ErrorParams<T>) {
        this.message = err.message;
        this.data = err.data;
        this.status = err.status || 400;
    }
}