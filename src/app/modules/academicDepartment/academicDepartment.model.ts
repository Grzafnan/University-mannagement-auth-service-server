import { Schema, model } from 'mongoose';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicDepartment,
  AcademicDepartmentModel,
} from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<
  IAcademicDepartment,
  AcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
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

academicDepartmentSchema.pre('save', async function (next) {
  const isExits = await AcademicDepartment.findOne({
    title: this.title,
    academicFaculty: this.academicFaculty,
  });

  if (isExits) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Department with the same academic faculty already exists!!'
    );
  } else {
    next();
  }
});

const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>(
  'AcademicDepartment',
  academicDepartmentSchema
);

export default AcademicDepartment;
