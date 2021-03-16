import { NextFunction, Request, Response } from "express";
import passport from 'passport';
import '../libs/authentication';

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('jwt', (error, user, info) => {
        if (error) {
            return response.status(401).send({
                message: "unauthorized",
                error,
                info
            });
        }

        if (!user) {
            return response.status(401).send({
                message: "unauthorized",
                info: "User doesn't exists or not token provider"
            });
        } else {
            request.logIn(user, { session: true }, (error) => {
                if (error) {
                    return response.status(401).send({
                        message: "unauthorized",
                        error,
                        info
                    });
                }
                return next();
            })
        }
    })(request, response, next);
}