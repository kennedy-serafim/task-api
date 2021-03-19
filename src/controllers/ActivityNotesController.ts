import { Request, Response } from 'express';
import { getCustomRepository, ILike, Like } from 'typeorm';
import { ActivityNotesRepository } from '../repository/ActivityNotesRepository';
import { ActivityRepository } from '../repository/ActivityRepository';
import { validate } from 'class-validator';

class ActivityNotesController {

    async create(request: Request, response: Response) {
        const user: any = request.user;
        const { activityId } = request.params;
        const activityNotesRepository = getCustomRepository(ActivityNotesRepository);
        const activityRepository = getCustomRepository(ActivityRepository);
        const { title, description } = request.body;

        try {

            const activity = await activityRepository.findOne(activityId, {
                relations: ['user']
            });

            if (!activity) {
                return response.status(400).json({
                    message: "Activity not found"
                });
            }

            if (activity.user.id != user.id) {
                return response.status(403).json({
                    message: "Unauthorized",
                    info: "Haven't permission to create resource"
                });
            }

            const activityNotesExist = await activityNotesRepository.findOne({
                where: {
                    title,
                    activity
                }
            });

            const activityNotes = activityNotesRepository.create({
                title, description
            });

            activity.user.password = undefined;
            activityNotes.activity = activity;

            const errors = await validate(activityNotes);
            if (errors.length > 0) {
                return response.status(400).send({ errors });
            }

            if (activityNotesExist) {
                return response.status(200).send({
                    activity_notes: activityNotesExist,
                    message: `Activity note with title ${title} already exists`
                });
            }

            await activityNotesRepository.save(activityNotes);

            return response.status(201).send({
                activity_notes: activityNotes,
            });

        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async update(request: Request, response: Response) {
        const user: any = request.user;
        const { activityId, activityNotesId } = request.params;
        const activityNotesRepository = getCustomRepository(ActivityNotesRepository);
        const activityRepository = getCustomRepository(ActivityRepository);
        const { title, description } = request.body;

        try {

            const activityNotes = await activityNotesRepository.findOne(activityNotesId, {
                relations: ['activity']
            });
            if (!activityNotes) {
                return response.status(404).json({
                    message: "Activity Note not found"
                });
            }

            const activity = await activityRepository.findOne(activityId, {
                relations: ['user']
            });

            if (!activity) {
                return response.status(400).json({
                    message: "Activity not found"
                });
            }
            activityNotes.title = title;
            activityNotes.description = description;
            const errors = await validate(activityNotes);
            if (errors.length > 0) {
                return response.status(400).send({ errors });
            }

            if (activity.user.id != user.id) {
                return response.status(403).json({
                    message: "Unauthorized",
                    info: "Haven't permission to update resource"
                });
            }

            if (activityNotes.activity.id != activity.id) {
                return response.status(400).json({
                    message: "Activity notes doesn't belong to Activity"
                });
            }

            if (activityNotes.title != title) {
                const activityNotesExist = await activityNotesRepository.findOne({
                    where: {
                        title,
                        activity
                    }
                });

                if (activityNotesExist) {
                    return response.status(400).send({
                        message: `Activity note with title ${title} already exists`,
                        activity_notes: activityNotesExist
                    });
                }
            }

            await activityNotesRepository.update(activityNotesId, {
                title, description
            });

            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async index(request: Request, response: Response) {
        const user: any = request.user;
        const { activityId } = request.params;
        const activityNotesRepository = getCustomRepository(ActivityNotesRepository);
        const activityRepository = getCustomRepository(ActivityRepository);
        const { title, take = 1, skip = 5 } = request.query;

        try {
            const activity = await activityRepository.findOne(activityId, {
                relations: ['user']
            });

            if (!activity) {
                return response.status(400).json({
                    message: "Activity not found"
                });
            }

            if (activity.user.id != user.id) {
                return response.status(403).json({
                    message: "Unauthorized",
                    info: "Haven't permission to create resource"
                });
            }
            activity.user.password = undefined

            if (title == undefined) {
                const [result, total] = await activityNotesRepository.findAndCount({
                    where: {
                        activity
                    },
                    skip: skip[0],
                    take: take[0]
                });

                return response.send({
                    activity_notes: result,
                    activity,
                    skip,
                    take,
                    total
                });
            } else {
                const [result, total] = await activityNotesRepository.findAndCount({
                    where: {
                        activity,
                        title: ILike(`%${title}%`)
                    },
                    skip: skip[0],
                    take: take[0]
                });

                return response.send({
                    activity_notes: result,
                    activity,
                    skip,
                    take,
                    total
                })
            }
        } catch (error) {
            return response.status(400).send({ error });
        }
    }

    async findByNoteId(request: Request, response: Response) {
        const user: any = request.user;
        const { activityId, activityNotesId } = request.params;
        const activityNotesRepository = getCustomRepository(ActivityNotesRepository);
        const activityRepository = getCustomRepository(ActivityRepository);

        try {
            const activity = await activityRepository.findOne(activityId, {
                relations: ['user']
            });

            if (!activity) {
                return response.status(400).json({
                    message: "Activity not found"
                });
            }

            if (activity.user.id != user.id) {
                return response.status(403).json({
                    message: "Unauthorized",
                    info: "Haven't permission to create resource"
                });
            }
            activity.user.password = undefined;

            const activityNotes = await activityNotesRepository.findOne(activityNotesId, {
                where: {
                    activity
                }
            });

            return response.send({
                activity_notes: activityNotes,
                activity,
            });
        } catch (error) {
            return response.status(400).send({ error });
        }
    }

    async delete(request: Request, response: Response) {
        const user: any = request.user;
        const { activityId } = request.params;
        const activityNotesRepository = getCustomRepository(ActivityNotesRepository);
        const activityRepository = getCustomRepository(ActivityRepository);

        try {
            const activity = await activityRepository.findOne(activityId, {
                relations: ['user']
            });

            if (!activity) {
                return response.status(400).json({
                    message: "Activity not found"
                });
            }

            if (activity.user.id != user.id) {
                return response.status(403).json({
                    message: "Unauthorized",
                    info: "Haven't permission to create resource"
                });
            }

            await activityNotesRepository.delete({ activity });

            return response.status(204).send();
        } catch (error) {
            return response.status(400).send({ error });
        }
    }

    async deleteOne(request: Request, response: Response) {
        const user: any = request.user;
        const { activityId, activityNotesId } = request.params;
        const activityNotesRepository = getCustomRepository(ActivityNotesRepository);
        const activityRepository = getCustomRepository(ActivityRepository);

        try {
            const activity = await activityRepository.findOne(activityId, {
                relations: ['user']
            });

            if (!activity) {
                return response.status(400).json({
                    message: "Activity not found"
                });
            }

            if (activity.user.id != user.id) {
                return response.status(403).json({
                    message: "Unauthorized",
                    info: "Haven't permission to create resource"
                });
            }

            const activityNotes = await activityNotesRepository.findOne(activityNotesId, {
                where: {
                    activity
                }
            });

            if (!activityNotes) {
                return response.status(404).json({
                    message: "Activity notes Not Found"
                });
            }

            await activityNotesRepository.remove(activityNotes);

            return response.status(204).send();

        } catch (error) {
            return response.status(400).send({ error });
        }
    }

}

export { ActivityNotesController };