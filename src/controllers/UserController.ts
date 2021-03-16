import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";

class UserController {

    async create(request: Request, response: Response) {
        const user: any = request.user;
        return response.json({
            message: `User create ${user.id}`
        });
    }

    async index(request: Request, response: Response) {
        const user: any = request.user;
        return response.json({
            message: `User index ${user.id}`
        });
    }
}

export { UserController };