import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";

const createNewUserToDB = async (userData: TUser) => {

    const result = await User.create(userData);

    
    const {password, ...userDataWithoutPassword} = result.toJSON();

    return userDataWithoutPassword;
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

  const addOrderToDB = async (user: any, userId: any, productName: string, price: number, quantity: number) => {
    const userExists = await User.isUserExists(userId);
        if (!userExists) {
          throw new Error();
        }
        const newProduct = {productName, price, quantity}
        user.orders.push(newProduct);

        await User.findOneAndUpdate({userId: userId}, {orders: user.orders})

        return null;
  };

  const getOrdersFromDB = async (userId: any) => {
    const userExists = await User.isUserExists(userId);
        if (!userExists) {
          throw new Error();
        }
        const result = await User.findOne({userId});
        return result?.orders;
      
  };

  const getTotalPriceFromDB = async (userId: any) => {
    const userExists = await User.isUserExists(userId);
        if (!userExists) {
          throw new Error();
        }

        const user = await User.findOne({userId});

        if(!user?.orders || user.orders.length === 0) {
          return {totalPrice: 0}
        }

        const totalPrice = user.orders.reduce((acc: number, order) => acc + (order.price * order.quantity), 0);
console.log(totalPrice);
        return {totalPrice}
  }

export const UserServices = {
    createNewUserToDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
    addOrderToDB,
    getOrdersFromDB,
    getTotalPriceFromDB
}