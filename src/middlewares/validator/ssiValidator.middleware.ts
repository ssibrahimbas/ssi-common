import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";
import { RequestValidatorError } from "../../errors/requestValidatorError";

class ValidatorMiddleware {

    constructor() {
    }

    /**
     * @param validate Express-validator middleware or middlewares 
     * @returns Runs the express-validator middleware
     */
    runValidator = (validate: () => RequestHandler | RequestHandler[]): RequestHandler | RequestHandler[] | any => {
        return validate();
    }

    /**
     * @param req Express Request 
     * @param res Express Response
     * @param next Express Next Function
     * @returns It must be called after the run validator is called. If you get an error with express-validator it will return it as an error.
     */
    validateRequest = (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new RequestValidatorError(errors.array()));
        }
        next();
    }

}

const validatorMiddleware = new ValidatorMiddleware();
export { validatorMiddleware as default };
