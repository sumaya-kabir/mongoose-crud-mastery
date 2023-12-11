import { TUser } from './user.interface';
import { User } from './user.model';

// Create a new user to Database
const createNewUserToDB = async (userData: TUser) => {
  const result = await User.create(userData);

  const { password, ...userDataWithoutPassword } = result.toJSON();

  return userDataWithoutPassword;
};

// Get all users from database
const getAllUsersFromDB = async () => {
  const result = await User.find({}, 'username fullName age email address');
  return result;
};

// Get Single Users data from database
const getSingleUserFromDB = async (userId: any) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error();
  }
  const result = await User.findOne({ userId }).select('-password');
  return result;
};

// Update user data from database
const updateUserFromDB = async (userId: any, userData: TUser) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error();
  }
  const result = await User.findOneAndUpdate(
    { userId: userId },
    { $set: userData },
    { new: true, runValidators: true, select: '-password' },
  );
  return result;
};

// delete user data from database
const deleteUserFromDB = async (userId: any) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error();
  }
  const result = await User.deleteOne({ userId });
  return result;
};

// add new order to the database
const addOrderToDB = async (orderData: any, userId: any) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error();
  }
  const newProduct = orderData;
  const user = await User.findOne({ userId });

  console.log(user, newProduct);

  if (!user) {
    throw new Error();
  }

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(newProduct);

  await User.findOneAndUpdate({ $addToSet: { orders: user.orders } });

  return newProduct;
};

// Get order data for a particular user from database
const getOrdersFromDB = async (userId: any) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error();
  }
  const result = await User.findOne({ userId });
  return result?.orders;
};

// Calculate total price
const getTotalPriceFromDB = async (userId: any) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error();
  }

  const user = await User.findOne({ userId });

  if (!user?.orders || user.orders.length === 0) {
    return { totalPrice: 0 };
  }

  const totalPrice = user.orders.reduce((acc: number, order) => {
    // using nullish coalescing for handling undefined values
    const price = order.price ?? 0;
    const quantity = order.quantity ?? 0;

    return acc + price * quantity;
  }, 0);
  return { totalPrice };
};

export const UserServices = {
  createNewUserToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  addOrderToDB,
  getOrdersFromDB,
  getTotalPriceFromDB,
};
