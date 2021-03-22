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
            title, description, start = new Date(), duration = 1, end, status = 'Pendente'
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
                return response.status(409).send({
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

    async index(request: Request, response: Response) {
        const user: any = request.user;
        const { userId } = request.params;
        const activityRepository = getCustomRepository(ActivityRepository);

        try {
            if (user.id !== userId) {
                return response.status(403).json({
                    message: "Haven't permission to get the resource"
                });
            }

            const activities = await activityRepository.find({
                where: {
                    user
                },
                relations: ["activityNotes"]
            });

            user.password = undefined;
            return response.json({
                activities,
                user
            });
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async findById(request: Request, response: Response) {
        const user: any = request.user;
        const { userId, id } = request.params;
        const activityRepository = getCustomRepository(ActivityRepository);

        try {
            if (user.id !== userId) {
                return response.status(403).json({
                    message: "Haven't permission to get the resource"
                });
            }

            const activities = await activityRepository.findOne(id, {
                where: {
                    user
                },
                relations: ["activityNotes"]
            });

            user.password = undefined;
            return response.json({
                activities,
                user
            });
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async findByTitle(request: Request, response: Response) {
        const user: any = request.user;
        const { userId, title } = request.params;
        const activityRepository = getCustomRepository(ActivityRepository);

        try {
            if (user.id !== userId) {
                return response.status(403).json({
                    message: "Haven't permission to get the resource"
                });
            }

            const activities = await activityRepository.findOne({
                where: {
                    user,
                    title
                },
                relations: ["activityNotes"]
            });

            user.password = undefined;
            return response.json({
                activities,
                user
            });
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async findByStatus(request: Request, response: Response) {
        const user: any = request.user;
        const { userId, status } = request.params;
        const activityRepository = getCustomRepository(ActivityRepository);

        try {
            if (user.id !== userId) {
                return response.status(403).json({
                    message: "Haven't permission to get the resource"
                });
            }

            const activities = await activityRepository.findOne({
                where: {
                    user,
                    status
                },
                relations: ["activityNotes"]
            });

            user.password = undefined;
            return response.json({
                activities,
                user
            });
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async update(request: Request, response: Response) {
        const user: any = request.user;
        const { userId, id } = request.params;
        const activityRepository = getCustomRepository(ActivityRepository);
        const {
            title, description, start = new Date(), duration = 1, end, status = 'Pendente'
        } = request.body;

        try {
            if (user.id !== userId) {
                return response.status(403).json({
                    message: "Haven't permission to update the resource"
                });
            }

            if (!await activityRepository.findOne(id)) {
                return response.status(404).json({
                    message: "Activity not found"
                });
            }

            if (title == undefined || title.length < 3) {
                return response.status(400).json({
                    message: "Title must be longer then 3 caracteres"
                });
            }

            await activityRepository.update(id, {
                title, description, start, duration, end, status
            });

            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ error });
        }

    }

    async deleteOne(request: Request, response: Response) {
        const user: any = request.user;
        const { userId, id } = request.params;
        const activityRepository = getCustomRepository(ActivityRepository);

        try {
            if (user.id !== userId) {
                return response.status(403).json({
                    message: "Haven't permission to delete the resource"
                });
            }

            const activity = await activityRepository.findOne(id);

            if (!activity) {
                return response.status(404).json({
                    message: "Activity not found"
                });
            }

            await activityRepository.remove(activity);
            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async deleteAll(request: Request, response: Response) {
        const user: any = request.user;
        const { userId } = request.params;
        const activityRepository = getCustomRepository(ActivityRepository);

        try {
            if (user.id !== userId) {
                return response.status(403).json({
                    message: "Haven't permission to delete the resource"
                });
            }

            await activityRepository.delete({
                user
            });

            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ error });
        }
    }


}

export { ActivityController };