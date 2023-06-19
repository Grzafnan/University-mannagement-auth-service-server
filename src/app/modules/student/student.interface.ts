import { Model, Types } from 'mongoose';
import {
  IBlood,
  IGender,
  IGuardian,
  ILocalGuardian,
  IUserName,
} from '../../../interfaces/common';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IStudent = {
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
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicSemester: Types.ObjectId | IAcademicSemester;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
};

export type IStudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
