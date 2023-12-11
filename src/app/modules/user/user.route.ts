import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createNewUser);

router.get('/', UserController.getAllUsers);

router.get('/:userId', UserController.getSingleUser);

router.put('/:userId', UserController.updateUserData);

router.delete('/:userId', UserController.deleteUser);

router.put('/:userId/orders', UserController.addUserOrder);

router.get('/:userId/orders', UserController.getOrders);

router.get('/:userId/orders/total-price', UserController.getTotalPrice);

export const UserRoutes = router;
