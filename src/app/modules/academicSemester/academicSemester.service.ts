import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';

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

export const AcademicSemesterService = {
  createAcademicSemester,
};
