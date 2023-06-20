import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import {
  IBlood,
  IGender,
  IGuardian,
  IUserName,
} from '../../../interfaces/common';

export type IFaculty = {
  id: string;
  name: IUserName;
  email: string;
  gender: IGender;
  dateOfBirth: string;
  profileImage: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: IBlood;
  designation: string;
  guardian: IGuardian;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
};

export type IFacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  designation?: string;
  emergencyContactNo?: string;
};
