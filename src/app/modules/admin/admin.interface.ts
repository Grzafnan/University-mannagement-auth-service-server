import { Model, Types } from 'mongoose';
import { IBlood, IGender, IUserName } from '../../../interfaces/common';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';

export type IAdmin = {
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
  managementDepartment: Types.ObjectId | IAcademicDepartment;
};

export type IAdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  designation?: string;
  emergencyContactNo?: string;
};
