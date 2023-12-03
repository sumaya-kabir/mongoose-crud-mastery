import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createNewUser = async (req: Request, res: Response) => {
    try {
        const {user} = req.body;

        const result = await UserServices.createNewUserToDB(user);

        res.status(200).json({
            success: true,
            message: 'User is created succesfully',
            data: result,
          });
        } catch (err: any) {
          res.status(404).json({
            success: false,
            message: err.message || 'User not found!',
            error: {
                code: 404,
                description: 'User Not found!'
            },
          });
        }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users are retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
          code: 404,
          description: 'User Not found!'
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User is fetched succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
          code: 404,
          description: 'User Not found!'
      },
    });
  }
};


const updateUserData = async (req: Request, res: Response) => {
    try{
      const {userId} = req.params;
      const {user} = req.body;

      const result = await UserServices.updateUserFromDB(userId, user);

      res.status(200).json({
        success: true,
        message: 'User is updated succesfully',
        data: result,
    });
    } catch (err: any) {
      res.status(404).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
          code: 404,
          description: 'User Not found!'
      },
    });
}
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User is deleted succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found!',
      error: {
          code: 404,
          description: 'User Not found!'
      },
    });
  }
};


export const UserController = {
    createNewUser,
    getAllUsers,
    getSingleUser,
    updateUserData,
    deleteUser
}