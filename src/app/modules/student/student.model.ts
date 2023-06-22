import { Schema, model } from 'mongoose';
import { IStudent, IStudentModel } from './student.interface';
import { Blood, Gender } from '../../../constants/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

export const StudentSchema = new Schema<IStudent, IStudentModel>(
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
    guardian: {
      required: true,
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    localGuardian: {
      required: true,
      type: {
        name: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
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
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
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

StudentSchema.pre('save', async function (next) {
  const isExists = await Student.findOne({
    email: this.email,
    contactNo: this.contactNo,
  });

  if (isExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "You can't to be a student with this email and contact number!"
    );
  }
  next();
});

const Student = model<IStudent, IStudentModel>('Student', StudentSchema);

export default Student;
