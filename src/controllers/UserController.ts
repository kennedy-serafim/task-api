import { Request, Response } from "express";

export class UserController {
    public async registerUser(req: Request, res: Response): Promise<void> {
        res.status(200).send({ token: "12" });
    }
}