import { Schema, model } from 'mongoose';
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: 'string',
      required: true,
    },
    year: {
      type: 'number',
      required: true,
    },
    code: {
      type: 'string',
      required: true,
    },
    startMonth: {
      type: 'string',
      required: true,
    },
    endMonth: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);

export default AcademicSemester;
