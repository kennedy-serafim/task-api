import { Router } from "express";
import { router as userRouter } from "./UserRoutes";
import { router as authRouter } from './AuthRoutes';
import { authenticate } from '../middleware/AuthPassportHandler';

const router = Router();
const apiPrefix = '/api/v1';

//===================PUBLIC ROUTES====================

router.use(apiPrefix, authRouter);

//===================PRIVATE ROUTES====================

router.use(apiPrefix, [authenticate], userRouter);

export { router };