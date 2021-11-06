import { Request, Response, NextFunction } from 'express';
import { SuccessDataResult } from "../results/successDataResult";
import { SuccessResult } from '../results/successResult';
import { ErrorResult } from '../results/errorResult';
import { ErrorDataResult } from '../results/errorDataResult';

declare global {
    namespace Express {
        export interface Response {
            Success(message: string): Response;
            SuccessData<T>(params: { message: string, data: T }): Response;
            Error(params: { message: string, status?: number }): Response;
            ErrorData<T>(params: { message: string, data: T, status?: number }): Response;
            Created(message: string): Response;
            CreatedData<T>(params: { message: string, data: T }): Response;
            Unauthorized(params: { message?: string }): Response;
            Forbidden(params: { message?: string }): Response;
            BadRequest(message: string): Response;
            NotFound(message: string): Response;
            InternalServer(params: { message: string, status?: number }): Response;
        }
    }
}

const middleware = (req: Request, res: Response, next: NextFunction) => {
    res.Success = (message: string) => {
        return res.status(200).send(new SuccessResult({ message, status: 200 }));
    }
    res.SuccessData = (params: { message: string, data: any }) => {
        console.log('PARAMS', params)
        return res.status(200).send(new SuccessDataResult({ ...params, status: 200 }));
    }
    res.Error = (params: { message: string, status?: number }) => {
        return res.status(params.status || 400).send(new ErrorResult({ ...params }))
    }
    res.ErrorData = (params: { message: string, data: any, status?: number }) => {
        return res.status(params.status || 400).send(new ErrorDataResult({ ...params }));
    }
    res.Created = (message: string) => {
        return res.status(201).send(new SuccessResult({ message, status: 201 }));
    }
    res.CreatedData = (params: { message: string, data: any }) => {
        return res.status(201).send(new SuccessDataResult({ ...params, status: 201 }));
    }
    res.Unauthorized = (params: { message?: string }) => {
        return res.status(401).send(new ErrorResult({ message: params.message || 'Authorization Required.', status: 401 }));
    }
    res.Forbidden = (params: { message?: string }) => {
        return res.status(403).send(new ErrorResult({ message: params.message || 'You do not have access to this page.', status: 403 }));
    }
    res.BadRequest = (message: string) => {
        return res.status(400).send(new ErrorResult({ message, status: 400 }));
    }
    res.NotFound = (message: string) => {
        return res.status(404).send(new ErrorResult({ message, status: 404 }));
    };
    res.InternalServer = (params: { message: string, status?: number }) => {
        return res.status(params.status || 500).send(new ErrorResult(params));
    }
    next();
}

export { middleware as ssiResponseMiddleware };