import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterCreatedEvent,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

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

  const createdAcademicSemester = await AcademicSemester.create(
    academicSemester
  );

  return createdAcademicSemester;
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid academic semester id!');
  }
  return result;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
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

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid academic semester code!!!'
    );
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete({ _id: id });
  return result;
};

const createAcademicSemesterFromEvent = async (
  e: IAcademicSemesterCreatedEvent
): Promise<void> => {
  const { id, ...data } = e;
  await AcademicSemester.create({
    ...data,
    syncId: id,
  });
};

const updateAcademicSemesterFromEvent = async (
  e: IAcademicSemesterCreatedEvent
): Promise<void> => {
  const { id, ...data } = e;
  await AcademicSemester.findOneAndUpdate(
    { syncId: id },
    {
      $set: {
        ...data,
      },
    }
  );
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getSingleSemester,
  getAllSemesters,
  updateSemester,
  deleteSemester,
  createAcademicSemesterFromEvent,
  updateAcademicSemesterFromEvent,
};
