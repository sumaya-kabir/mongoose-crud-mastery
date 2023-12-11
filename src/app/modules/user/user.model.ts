import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullname,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const fullNmaeSchema = new Schema<TFullname>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const addressSchema = new Schema<TAddress>(
  {
    street: String,
    city: String,
    country: String,
  },
  { _id: false },
);

const orderSchema = new Schema<TOrder>(
  {
    productName: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: fullNmaeSchema,
  age: Number,
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [String],
  address: addressSchema,
  orders: {
    type: [orderSchema],
    default: [],
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// create custom static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return !!existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
