import { IDataResult } from "./IDataResult";

type ProccessParams<T> = {
    status?: number;
    message: string;
    data: T;
};

export class SuccessDataResult<T> implements IDataResult<T> {
    success = true;
    data!: T;
    message!: string;
    status!: number;

    constructor(process: ProccessParams<T>) {
        this.status = process.status || 200;
        this.data = process.data;
        this.message = process.message;
    }
}