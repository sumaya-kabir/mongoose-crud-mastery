import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-new-user', UserController.createNewUser);

export const UserRoutes = router;