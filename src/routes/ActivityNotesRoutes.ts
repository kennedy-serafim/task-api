import { Router } from 'express';
import { ActivityNotesController } from '../controllers/ActivityNotesController';

const router = Router();
const activityNotesController = new ActivityNotesController();

router.post('/activity-notes/:activityId', activityNotesController.create);

export { router };