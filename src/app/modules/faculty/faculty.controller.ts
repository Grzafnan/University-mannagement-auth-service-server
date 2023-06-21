import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { FacultyService } from './faculty.service';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constant';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationFields } from '../../../constants/pagination';

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...facultyData } = req.body;

  const result = await FacultyService.updateFaculty(id, facultyData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Updated Successfully!',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Retrieved Successfully!',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters: IFacultyFilters = pick(req.query, facultyFilterableFields);
  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );

  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties Retrieved Successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Deleted Successfully!',
    data: result,
  });
});

export const FacultyController = {
  updateFaculty,
  getSingleFaculty,
  getAllFaculties,
  deleteFaculty,
};
