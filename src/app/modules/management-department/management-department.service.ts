import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './management-department.interface';
import ManagementDepartment from './management-department.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { managementDepartmentFilterableFields } from './management-department.constant';

const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const createdManagementDepartment = ManagementDepartment.create(payload);

  if (!createdManagementDepartment) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create management department!'
    );
  }
  return createdManagementDepartment;
};

const getSingleManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid management department id!'
    );
  }
  return result;
};

const getAllManagementDepartments = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentFilterableFields.map(field => ({
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

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );

  return result;
};

const deleteManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete({ _id: id });
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  getSingleManagementDepartment,
  getAllManagementDepartments,
  updateManagementDepartment,
  deleteManagementDepartment,
};
