import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import { JWT_SECRET } from '../config/config';
import * as jwt from 'jsonwebtoken';
import passport from "passport";

class UserController {

    async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);

        const {
            firstname,
            lastname,
            birth,
            username,
            email,
            password,
            phone,
            country,
            city
        } = request.body;

        try {

            const user = userRepository.create({
                firstname,
                lastname,
                birth,
                username,
                email,
                password,
                phone,
                country,
                city
            });

            user.hashPassword();

            await userRepository.save(user);

            const token = jwt.sign({ username }, JWT_SECRET);

            return response.status(201).json({
                data: user,
                token
            });
        } catch (error) {
            return response.status(400).json(error);
        }
    }

    async index(request: Request, response: Response) {
        return response.json({
            message: "User index"
        });
    }

    public authenticateUser(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("local", function (err, user, info) {
            // no async/await because passport works only with callback ..
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            } else {
                const token = jwt.sign({ username: user.username }, JWT_SECRET);
                res.status(200).send({ token: token });
            }
        });
    }
}

export { UserController };