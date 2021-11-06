import { BadRequestError } from "../errors/badRequestError";
import {Request, Response, NextFunction} from "express";

const asyncWrapper = (asyncFunction: Function) => {
    return async function (...args: any[]) {
        return await asyncFunction(...args).catch((err : Error) => {
            throw new BadRequestError("Something went wrong");
        });
    }
};

const errorWrapper = (asyncFunction : Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        asyncFunction(req, res, next).catch(next);
    }
}

export { asyncWrapper, errorWrapper };