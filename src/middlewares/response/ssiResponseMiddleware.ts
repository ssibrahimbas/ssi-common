import { Request, Response, NextFunction } from 'express';
import { SuccessDataResult } from "../../results/successDataResult";
import { SuccessResult } from '../../results/successResult';
import { ErrorResult } from '../../results/errorResult';
import { ErrorDataResult } from '../../results/errorDataResult';

declare global {
    namespace Express {
        export interface Request {
            data: any;
        }
        export interface Response {
            /**
             * @param message Successful transaction message. Required!
             * @description It automatically returns status: 200, success: true. Used as API Response.
             */
            Success(params: { message: string }): Response;

            /**
             * @params Successful transaction message. Required!
             * @params data Data for successful operation. Required!
             * @description It automatically returns status: 200, success: true. Used as API Response.
             */
            SuccessData<T>(params: { message: string, data: T }): void;

            /**
             * @param params The object containing the failed operation message and the status value. message is required, status defaults to 400.
             * @description It automatically returns status: 400, success: false. Used as API Response.
             */
            Error(params: { message: string, status?: number }): Response;

            /**
             * @param params Object with failed operation message, data and status value. message data required, status default 400.
             * @description It automatically returns status: 400, success: false. Used as API Response.
             */
            ErrorData<T>(params: { message: string | any, data: T, status?: number }): Response;

            /**
             * @param message Message that a new data has been created. Mandatory!
             * @description It automatically returns status: 201, success: true. Used as API Response.
             */
            Created(params: { message: string }): Response;

            /**
             * @param params. Object containing message and data values. message and data are required.
             * @description It automatically returns status: 201, success: true. Used as API Response.
             */
            CreatedData<T>(params: { message: string, data: T }): Response;

            /**
             * @param params. The object containing the message. message is required.
             * @description It automatically returns status: 401, success: false. Used as API Response.
             */
            Unauthorized(params: { message?: string }): Response;

            /**
             * @param params. The object containing the message. message is required.
             * @description It automatically returns status: 403, success: false. Used as API Response.
             */
            Forbidden(params: { message?: string }): Response;

            /**
             * @param message. Message about incorrect operation. Required.
             * @description It automatically returns status: 400, success: false. Used as API Response.
             */
            BadRequest(params: { message: string }): Response;

            /**
             * @param message. Message about the not found operation. Compulsory.
             * @description It automatically returns status: 404, success: false. Used as API Response.
             */
            NotFound(params: { message: string }): Response;

            /**
             * @param params. Object containing message and status. Status default 500.
             * @description It automatically returns status: 500, success: false. Used as API Response.
             */
            InternalServer(params: { message: string, status?: number }): Response;
        }
    }
}

const middleware = (req: Request, res: Response, next: NextFunction) => {
    res.Success = (params: { message: string }) => {
        const data = new SuccessResult({ message: params.message, status: 200 })
        req.data = data;
        return res.status(200).send(data);
    }
    res.SuccessData = (params: { message: string, data: any }) => {
        const data = new SuccessDataResult({ ...params, status: 200 });
        req.data = data;
        res.status(200).send(data);
    }
    res.Error = (params: { message: string, status?: number }) => {
        const data = new ErrorResult({ ...params });
        return res.status(params.status || 400).send(data)
    }
    res.ErrorData = (params: { message: string, data: any, status?: number }) => {
        const data = new ErrorDataResult({ ...params })
        return res.status(params.status || 400).send(data);
    }
    res.Created = (params: { message: string }) => {
        const data = new SuccessResult({ message: params.message, status: 201 })
        return res.status(201).send(data);
    }
    res.CreatedData = (params: { message: string, data: any }) => {
        const data = new SuccessDataResult({ ...params, status: 201 })
        return res.status(201).send(data);
    }
    res.Unauthorized = (params: { message?: string }) => {
        const data = new ErrorResult({ message: params.message || "Authorization Required.", status: 401 })
        return res.status(401).send(data);
    }
    res.Forbidden = (params: { message?: string }) => {
        const data = new ErrorResult({ message: params.message || 'You do not have access to this page.', status: 403 })
        return res.status(403).send(data);
    }
    res.BadRequest = (params: { message: string }) => {
        const data = new ErrorResult({ message: params.message, status: 400 })
        return res.status(400).send(data);
    }
    res.NotFound = (params: { message: string }) => {
        const data = new ErrorResult({ message: params.message, status: 404 })
        return res.status(404).send(data);
    };
    res.InternalServer = (params: { message: string, status?: number }) => {
        const data = new ErrorResult(params)
        return res.status(params.status || 500).send(data);
    }
    next();
}

export { middleware as isResponseMiddleware };
