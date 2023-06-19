/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import Student from './student.model';
import { IStudent, IStudentFilters } from './student.interface';
import { studentSearchableFields } from './student.constant';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id }).populate([
    { path: 'academicFaculty' },
    { path: 'academicDepartment' },
    { path: 'academicSemester' },
  ]);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not find student!');
  }
  return result;
};

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereConditions)
    .populate([
      {
        path: 'academicSemester',
      },
      {
        path: 'academicFaculty',
      },
      {
        path: 'academicDepartment',
      },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExists = await Student.findOne({ id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found!!!');
  }

  const { name, guardian, localGuardian, ...student } = payload;

  const updatedStudentData: Partial<IStudent> = { ...student };

  // Dynamically Handling Update
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  }).populate([
    { path: 'academicFaculty' },
    { path: 'academicDepartment' },
    { path: 'academicSemester' },
  ]);

  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOneAndDelete({ id }).populate([
    { path: 'academicFaculty' },
    { path: 'academicDepartment' },
    { path: 'academicSemester' },
  ]);
  return result;
};

export const StudentService = {
  getSingleStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
