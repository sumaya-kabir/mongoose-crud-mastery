import { TUser } from "./user.interface";
import { User } from "./user.model";

const createNewUserToDB = async (userData: TUser) => {

    const result = await User.create(userData);

    return result;
};

const getAllUsersFromDB = async () => {
    const result = await User.find({}, 'username fullName age email address');
    return result;
  };
  
  const getSingleUserFromDB = async (userId: any) => {
    const userExists = await User.isUserExists(userId);
        if (!userExists) {
          throw new Error();
        }
        const result = await User.findOne({userId}).select('-password');
        return result;
      
  };

  const updateUserFromDB = async (userId: any, userData: TUser) => {
    const userExists = await User.isUserExists(userId);
        if (!userExists) {
          throw new Error();
        }
        const result = await User.findOneAndUpdate(
          { userId: userId },
          { $set: userData },
          { new: true, runValidators: true, select: '-password' }
          );
        return result;
  }
  
  const deleteUserFromDB = async (userId: any) => {
    const userExists = await User.isUserExists(userId);
        if (!userExists) {
          throw new Error();
        }
    const result = await User.deleteOne({ userId });
    return result;
  };

export const UserServices = {
    createNewUserToDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
}