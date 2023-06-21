import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './management-department.interface';
import { ManagementDepartmentService } from './management-department.service';
import { managementDepartmentFilterableFields } from './management-department.constant';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartment } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartment
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department created successfully!',
      data: result,
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Retrieved Successfully!',
      data: result,
    });
  }
);

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters: IManagementDepartmentFilters = pick(
      req.query,
      managementDepartmentFilterableFields
    );

    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );

    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions
      );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Departments Retrieved Successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { ...updateData } = req.body;

    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updateData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Updated Successfully!',
      data: result,
    });
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Deleted Successfully!',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getSingleManagementDepartment,
  getAllManagementDepartments,
  updateManagementDepartment,
  deleteManagementDepartment,
};
