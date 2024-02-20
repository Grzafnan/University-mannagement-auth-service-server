import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicFaculty,
  IAcademicFacultyCreatedEvent,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  academicFacultySearchableFields,
} from './academicFaculty.constant';

const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const createdAcademicFaculty = AcademicFaculty.create(payload);

  if (!createdAcademicFaculty) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create academic faculty!'
    );
  }

  await RedisClient.publish(
    EVENT_ACADEMIC_FACULTY_CREATED,
    JSON.stringify(createdAcademicFaculty)
  );

  return createdAcademicFaculty;
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid academic semester id!');
  }
  return result;
};

const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
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

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete({ _id: id });
  return result;
};

const createAcademicFacultyFromEvent = async (
  e: IAcademicFacultyCreatedEvent
): Promise<void> => {
  await AcademicFaculty.create({
    title: e.title,
    syncId: e.id,
  });
};

const updateAcademicFacultyFromEvent = async (
  e: IAcademicFacultyCreatedEvent
): Promise<void> => {
  await AcademicFaculty.findOneAndUpdate({ syncId: e.id }, { title: e.title });
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
  createAcademicFacultyFromEvent,
  updateAcademicFacultyFromEvent,
};
