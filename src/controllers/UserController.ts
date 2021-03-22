import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
class UserController {

    async update(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const user: any = request.user;
        const {
            firstname, lastname, birth, phone, country, city
        } = request.body;

        const { id } = request.params;

        try {

            if (user.id !== id) {
                return response.status(403).json({
                    message: "Haven't permission to update the resource"
                });
            }

            await userRepository.update(user.id, {
                firstname, lastname, birth, phone, country, city
            });

            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async index(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const user: any = request.user;
        const { id } = request.params;

        try {
            if (user.id !== id) {
                return response.status(403).json({
                    message: "Haven't permission to get the resource"
                });
            }

            const userModel = await userRepository.findOneOrFail(user.id, {
                relations: ['activities']
            });
            userModel.password = undefined;

            return response.json({ user: userModel });
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async delete(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const user: any = request.user;
        const { id } = request.params;

        try {
            if (user.id !== id) {
                return response.status(403).json({
                    message: "Haven't permission to delete the resource"
                });
            }

            await userRepository.remove(user);

            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ error });
        }

    }

    async destroy(request: Request, response: Response) { }
}

export { UserController };