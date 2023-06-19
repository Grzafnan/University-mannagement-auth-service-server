import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AcademicFacultyService } from './academicFaculty.service';
import pick from '../../../shared/pick';

import { paginationFields } from '../../../constants/pagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { academicFacultyFilterableFields } from './academicFaculty.constant';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFaculty } = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(
      academicFaculty
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created successfully!',
      data: result,
    });
  }
);

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Retrieved Successfully!',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters: IAcademicFacultyFilters = pick(
    req.query,
    academicFacultyFilterableFields
  );

  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties Retrieved Successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updateData } = req.body;

  const result = await AcademicFacultyService.updateFaculty(id, updateData);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Updated Successfully!',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.deleteFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Deleted Successfully!',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
};
