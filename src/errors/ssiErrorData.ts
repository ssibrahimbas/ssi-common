import { IDataResult } from "../results/IDataResult";
import { SsiError } from "./ssiError";

export abstract class SsiDataError<T> extends SsiError {
    abstract data : T;

    abstract serializeErrors() : IDataResult<T>;
}