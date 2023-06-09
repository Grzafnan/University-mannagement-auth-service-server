import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';

const createAcademicSemester = async (
  academicSemester: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (
    academicSemesterTitleCodeMapper[academicSemester.title] !==
    academicSemester.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid academic semester code!!!'
    );
  }
  const createdAcademicSemester = AcademicSemester.create(academicSemester);

  if (!createdAcademicSemester) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create academic semester!'
    );
  }
  return createdAcademicSemester;
};

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;
  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
};
