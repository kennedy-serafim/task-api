import { Router } from "express";
import { router as userRouter } from "./UserRoutes";
import { router as authRouter } from './AuthRoutes';
import { router as activityRouter } from './ActivityRoutes';
import { router as activityNotesRouter } from './ActivityNotesRoutes';
import { authenticate } from '../middleware/AuthPassportHandler';

const router = Router();
const apiPrefix = '/api';

//===================PUBLIC ROUTES====================

router.get('/', (req, res) => {
    return res.redirect(apiPrefix);
});

router.get(apiPrefix, (req, res) => {
    return res.json({
        message: 'Welcome to Task Manager API'
    });
});

router.use(apiPrefix, authRouter);

//===================PRIVATE ROUTES====================

router.use(apiPrefix, authenticate, userRouter);
router.use(apiPrefix, authenticate, activityRouter);
router.use(apiPrefix, authenticate, activityNotesRouter);

//===================ERRORS ROUTES====================

router.use("*", (req, res) => {
    res.status(404).send({
        info: "Resource not found",
        message: "Make sure url is correct!"
    });
});

export { router };