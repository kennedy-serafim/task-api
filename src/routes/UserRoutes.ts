import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.get('/users/:id', userController.index);
router.patch('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

export { router };