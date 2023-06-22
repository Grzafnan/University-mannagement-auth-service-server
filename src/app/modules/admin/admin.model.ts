import { Schema, model } from 'mongoose';
import { Blood, Gender } from '../../../constants/common';
import { IAdmin, IAdminModel } from './admin.interface';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const adminSchema = new Schema<IAdmin, IAdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      required: true,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: Gender,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: Blood,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.pre('save', async function (next) {
  const isExists = await Admin.findOne({
    email: this.email,
    contactNo: this.contactNo,
  });

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "You can't to be a Admin with this email and contact number!"
    );
  }
  next();
});

const Admin = model<IAdmin, IAdminModel>('Admin', adminSchema);

export default Admin;
