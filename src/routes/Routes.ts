import { Router } from "express";
import { router as userRouter } from "./UserRoutes";
import { router as authRouter } from './AuthRoutes';

const router = Router();
const apiPrefix = '/api/v1';

router.use(apiPrefix, authRouter);

router.use(apiPrefix, userRouter);

export { router };