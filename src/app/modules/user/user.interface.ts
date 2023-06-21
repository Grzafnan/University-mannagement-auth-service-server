import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';

export type IUser = {
  id: string | undefined;
  password: string;
  role: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  // admin?: Schema.Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
