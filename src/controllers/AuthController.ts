import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/UserRepository';
import { validate } from 'class-validator';

class AuthController {

    public async register(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);

        const { firstname, lastname, password, email } = request.body;

        try {
            if (await userRepository.findOne({ email })) {
                return response.status(409).send({
                    message: "User with email already exists!"
                });
            }

            const user = userRepository.create({
                firstname, lastname, password, email
            });

            const errors = await validate(user);
            if (errors.length > 0) {
                return response.status(400).send({ errors });
            }

            user.hashPassword();;
            await userRepository.save(user);
            user.password = undefined;

            return response.status(201).send({
                data: user
            });
        } catch (error) {
            return response.status(500).send(error);
        }

    }

    public async authenticate(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const { email, password } = request.body;

        try {
            const user = await userRepository.findOne({ email });

            if (!user) {
                return response.status(400).send({ message: 'User not found' });
            }

            if (!user.checkIfUnEncryptedPasswordIsValid(password)) {
                return response.status(400).send({ message: 'Invalid password' });
            }

            user.password = undefined;
            return response.status(200).send({
                data: user
            });
        } catch (error) {
            return response.status(500).send({ error });
        }
    }

}

export { AuthController };