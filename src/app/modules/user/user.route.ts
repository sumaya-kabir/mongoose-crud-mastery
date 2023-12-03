import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-new-user', UserController.createNewUser);

router.get('/', UserController.getAllUsers);

router.get('/:userId', UserController.getSingleUser);

router.put('/:userId', UserController.updateUserData);

router.delete('/:userId', UserController.deleteUser);


export const UserRoutes = router;