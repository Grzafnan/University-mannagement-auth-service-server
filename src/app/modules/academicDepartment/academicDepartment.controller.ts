import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { paginationFields } from '../../../constants/pagination';
import { IPaginationOptions } from '../../../interfaces/pagination';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartment } = req.body;
  const result = await academicDepartmentService.createDepartment(
    academicDepartment
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully!',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters: IAcademicDepartmentFilters = pick(
    req.query,
    academicDepartmentFilterableFields
  );
  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );
  const result = await academicDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department retrieved successfully.',
    data: result,
  });
});

export const academicDepartmentController = {
  createDepartment,
  getAllDepartment,
};
