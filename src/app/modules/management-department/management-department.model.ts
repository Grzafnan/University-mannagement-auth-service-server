import { Schema, model } from 'mongoose';
import {
  IManagementDepartment,
  IManagementDepartmentModel,
} from './management-department.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const managementDepartmentSchema = new Schema<IManagementDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

managementDepartmentSchema.pre('save', async function (next) {
  const isxist = await ManagementDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Management Department is already exists.'
    );
  } else {
    next();
  }
});

const ManagementDepartment = model<
  IManagementDepartment,
  IManagementDepartmentModel
>('ManagementDepartment', managementDepartmentSchema);

export default ManagementDepartment;
