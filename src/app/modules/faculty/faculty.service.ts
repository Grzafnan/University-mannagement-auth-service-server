/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import Faculty from './faculty.model';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { SortOrder } from 'mongoose';
import { facultySearchableFields } from './faculty.constant';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExists = await Faculty.findOne({ id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found!!!');
  }

  const { name, ...faculty } = payload;

  const updatedFacultyData: Partial<IFaculty> = { ...faculty };

  // Dynamically Handling Update
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  }).populate([{ path: 'academicFaculty' }, { path: 'academicDepartment' }]);

  return result;
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id }).populate([
    { path: 'academicFaculty' },
    { path: 'academicDepartment' },
  ]);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not find faculty!');
  }
  return result;
};

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await Faculty.find(whereConditions)
    .populate([
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

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOneAndDelete({ id }).populate([
    { path: 'academicFaculty' },
    { path: 'academicDepartment' },
  ]);
  return result;
};

export const FacultyService = {
  updateFaculty,
  getSingleFaculty,
  getAllFaculties,
  deleteFaculty,
};
