import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
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

            const activityNotes = await activityNotesRepository.findOne(activityId);
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

            if (activity.user.id != user.id) {
                return response.status(403).json({
                    message: "Unauthorized",
                    info: "Haven't permission to update resource"
                });
            }



            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ error });
        }
    }
    async index(request: Request, response: Response) { }
    async findByNoteId(request: Request, response: Response) { }
    async findByTitle(request: Request, response: Response) { }
    async delete(request: Request, response: Response) { }
    async deleteOne(request: Request, response: Response) { }
}

export { ActivityNotesController };