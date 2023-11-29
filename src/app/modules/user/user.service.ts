import { TUser } from "./user.interface";
import { User } from "./user.model";

const createNewUserToDB = async (userData: TUser) => {
    if (await User.isUserExists(userData.userId)) {
        throw new Error();
    }
    const result = await User.create(userData);
    return result;
}

export const UserServices = {
    createNewUserToDB,
}