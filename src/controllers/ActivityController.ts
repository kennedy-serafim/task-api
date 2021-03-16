import { Request, Response } from "express";
import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { ActivityRepository } from '../repository/ActivityRepository';

class ActivityController {
    async create(request: Request, response: Response) {
        const user: any = request.user;
        const { userId } = request.params;
        const activityRepository = getCustomRepository(ActivityRepository);
        const {
            title, description, start, duration, end
        } = request.body;

        try {
            if (user.id !== userId) {
                return response.status(403).json({
                    message: "Haven't permission to create the resource"
                });
            }

            const activityExist = await activityRepository.findOne({
                where: {
                    title,
                    user
                }
            });

            if (activityExist) {
                return response.status(200).send({
                    activity: activityExist,
                    message: `Activity with title ${title} already exists`
                });
            }

            const activity = activityRepository.create({
                title, description, start: new Date(start), duration, end
            });

            activity.user = user;
            activity.user.password = undefined;
            const errors = await validate(activity);
            if (errors.length > 0) {
                return response.status(400).send({ errors });
            }

            await activityRepository.save(activity);

            return response.status(201).send({
                activity,
            });

        } catch (error) {
            return response.status(400).json({ error });
        }
    }
}

export { ActivityController };