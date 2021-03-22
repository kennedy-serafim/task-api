import { Router } from 'express';
import { ActivityNotesController } from '../controllers/ActivityNotesController';

const router = Router();
const activityNotesController = new ActivityNotesController();

router.post('/activity-notes/activities/:activityId', activityNotesController.create);

router.put('/activity-notes/:activityNotesId/activities/:activityId', activityNotesController.update);

router.get('/activity-notes/activities/:activityId', activityNotesController.index);
router.get('/activity-notes/:activityNotesId/activities/:activityId', activityNotesController.findByNoteId);

router.delete('/activity-notes/activities/:activityId', activityNotesController.delete);
router.delete('/activity-notes/:activityNotesId/activities/:activityId', activityNotesController.deleteOne);

export { router };