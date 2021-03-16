import { Router } from 'express';
import { ActivityController } from '../controllers/ActivityController';

const router = Router();
const activityController = new ActivityController();

router.post('/activities/users/:userId', activityController.create);

router.put('/activities/:id/users/:userId', activityController.update);

router.delete('/activities/users/:userId', activityController.deleteAll);
router.delete('/activities/:id/users/:userId', activityController.deleteOne);

router.get('/activities/users/:userId', activityController.index);
router.get('/activities/:id/users/:userId', activityController.findById);
router.get('/activities/:title/users/:userId', activityController.findByTitle);
router.get('/activities/:status/users/:userId', activityController.findByStatus);

export { router };