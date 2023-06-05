import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemester = async (
  academicSemester: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  const createdAcademicSemester = AcademicSemester.create(academicSemester);
  if (!createdAcademicSemester) {
    throw new ApiError(400, 'Failed to create academic semester!');
  }
  return createdAcademicSemester;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
