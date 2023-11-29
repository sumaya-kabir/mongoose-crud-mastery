import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createNewUser = async (req: Request, res: Response) => {
    try {
        const {user} = req.body;

        const result = await UserServices.createNewUserToDB(user)
        res.status(200).json({
            success: true,
            message: 'User is created succesfully',
            data: result,
          });
        } catch (err: any) {
          res.status(404).json({
            success: false,
            message: err.message || 'User not found!',
            data: err,
          });
        }
};


export const UserController = {
    createNewUser,
}