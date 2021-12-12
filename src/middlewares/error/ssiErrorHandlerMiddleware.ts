import { Request, Response, NextFunction } from "express";
import { SsiError } from "../../errors/ssiError";
import { SsiDataError } from "../../errors/ssiErrorData";

const middleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SsiDataError) {
        res.ErrorData(err.serializeErrors());
        res.end();
        return;
    }
    if (err instanceof SsiError) {
        res.Error(err.serializeErrors());
        res.end();
        return;
    }
    return res.InternalServer({ message: "Something went wrong" });
}

export { middleware as ssiErrorHandlerMiddleware }