import { Schema, model } from "mongoose";
import { TAddress, TFullname, TOrder, TUser, UserModel } from "./user.interface";

const fullNmaeSchema = new Schema<TFullname>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
});

const addressSchema = new Schema<TAddress>({
    street: String,
    city: String,
    country: String,
});

const orderSchema = new Schema<TOrder>({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

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
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: [String],
    address: addressSchema,
    orders: [orderSchema]
});

userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({userId});
    return !!existingUser;
}

export const User = model<TUser, UserModel>('User', userSchema )