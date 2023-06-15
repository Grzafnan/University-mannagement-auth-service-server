import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { paginationFields } from '../../../constants/pagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createAcademicSemesterToDB = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemester } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemester
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully!',
      data: result,
    });
  }
);

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.getSingleSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrieved Successfully!',
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters: IAcademicSemesterFilters = pick(
    req.query,
    academicSemesterFilterableFields
  );

  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters Retrieved Successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updateData);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Updated Successfully!',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Deleted Successfully!',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemesterToDB,
  getSingleSemester,
  getAllSemesters,
  updateSemester,
  deleteSemester,
};
