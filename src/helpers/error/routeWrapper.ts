import {Request, Response, NextFunction} from "express";

/**
 * @param asyncFunction Express Controller Function 
 * @returns Express Controller Function with safety
 */
const routeWrapper = (asyncFunction : Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        asyncFunction(req, res, next).catch(next);
    }
};

export { routeWrapper };