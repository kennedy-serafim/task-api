import { Router } from 'express';
import { ActivityController } from '../controllers/ActivityController';

const router = Router();
const activityController = new ActivityController();

router.post('/activities/users/:userId', activityController.create);

export { router };