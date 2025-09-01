import mongoose, { Schema, Types } from "mongoose";


export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer' | 'employee';
}

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'customer', 'employee'], default: 'customer' }
});

export const User = mongoose.model<IUser>('User', userSchema);