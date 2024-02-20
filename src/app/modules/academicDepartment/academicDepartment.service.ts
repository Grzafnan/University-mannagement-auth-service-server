import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import AcademicFaculty from '../academicFaculty/academicFaculty.model';
import { academicDepartmentSearchAbleFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentCreatedEvent,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const createdDepartment = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );

  if (!createdDepartment) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create academic Department!'
    );
  }

  return createdDepartment;
};

const getAllDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchAbleFields.map(field => ({
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

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById({ _id: id }).populate(
    'academicFaculty'
  );
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid academic department id!'
    );
  }
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');

  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete({
    _id: id,
  }).populate('academicFaculty');
  return result;
};

const createDepartmentFromEvent = async (
  e: IAcademicDepartmentCreatedEvent
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
    syncId: e.id,
  };

  await AcademicDepartment.create(payload);
};

const updateDepartmentFromEvent = async (
  e: IAcademicDepartmentCreatedEvent
): Promise<void> => {
  await AcademicFaculty.findOneAndUpdate(
    { syncId: e.academicFacultyId },
    {
      $set: {
        title: e.title,
        academicFaculty: e.academicFacultyId,
        syncId: e.id,
      },
    }
  );
};

export const academicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartmentFromEvent,
  updateDepartmentFromEvent,
};
