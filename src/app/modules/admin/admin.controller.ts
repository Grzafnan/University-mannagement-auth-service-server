import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationFields } from '../../../constants/pagination';
import { AdminService } from './admin.service';
import { IAdmin, IAdminFilters } from './admin.interface';
import { adminFilterableFields } from './admin.constant';

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...adminData } = req.body;

  const result = await AdminService.updateAdmin(id, adminData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Updated Successfully!',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Retrieved Successfully!',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters: IAdminFilters = pick(req.query, adminFilterableFields);
  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );

  const result = await AdminService.getAllAdmins(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins Retrieved Successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Deleted Successfully!',
    data: result,
  });
});

export const AdminController = {
  updateAdmin,
  getSingleAdmin,
  getAllAdmins,
  deleteAdmin,
};
