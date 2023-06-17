import { Model } from 'mongoose';

export type IUser = {
  id: string | undefined;
  password: string;
  role: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
