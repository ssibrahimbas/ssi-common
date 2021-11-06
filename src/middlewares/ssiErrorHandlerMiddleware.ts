import { Request, Response, NextFunction } from "express";
import { SsiError } from "../errors/ssiError";
import { SsiDataError } from "../errors/ssiErrorData";

const middleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message === "keyfim") {
        return err;
    }
    if (err instanceof SsiDataError) {
        return res.ErrorData(err.serializeErrors());
    }
    if (err instanceof SsiError) {
        return res.Error(err.serializeErrors());
    }
    return res.InternalServer({ message: "Something went wrong" });
}

export { middleware as ssiErrorHandlerMiddleware }