import { Schema, model } from 'mongoose';
import { IFaculty, IFacultyModel } from './faculty.interface';
import { Blood, Gender } from '../../../constants/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const facultySchema = new Schema<IFaculty, IFacultyModel>(
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
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
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

facultySchema.pre('save', async function (next) {
  const isExists = await Faculty.findOne({
    email: this.email,
    contactNo: this.contactNo,
  });

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "You can't to be a Faculty with this email and contact number!"
    );
  }
  next();
});

const Faculty = model<IFaculty, IFacultyModel>('Faculty', facultySchema);

export default Faculty;
