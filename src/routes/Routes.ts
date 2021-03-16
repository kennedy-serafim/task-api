import { Router } from "express";
import { router as userRouter } from "./UserRoutes";
import { router as authRouter } from './AuthRoutes';
import { router as activityRouter } from './ActivityRoutes';
import { authenticate } from '../middleware/AuthPassportHandler';

const router = Router();
const apiPrefix = '/api/v1';

//===================PUBLIC ROUTES====================
router.get(apiPrefix, (req, res) => {
    return res.json({
        message: 'Welcome to Task Manager API'
    });
});
router.use(apiPrefix, authRouter);

//===================PRIVATE ROUTES====================

router.use(apiPrefix, authenticate, userRouter);
router.use(apiPrefix, authenticate, activityRouter);

export { router };