/* eslint-disable no-unused-vars */
import { ENUM_USER_ROLE } from './../../../enums/user';
import mongoose from 'mongoose';
import { IStudent } from './../student/student.interface';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import Student from '../student/student.model';
import { IFaculty } from '../faculty/faculty.interface';
import Faculty from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import Admin from '../admin/admin.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    // default password
    user.password = config.default_student_pass as string;
  }

  user.role = ENUM_USER_ROLE.STUDENT;

  const academicSemester: IAcademicSemester | null =
    await AcademicSemester.findById(student.academicSemester);

  const session = await mongoose.startSession();
  let newUserAllData = null;
  try {
    session.startTransaction();
    // Generate Student and User Id
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    // GET student as array
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student!');
    }

    // Set student ID: into user.student
    user.student = newStudent[0]._id;

    // Create and GET user as Array
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    newUserAllData = newUser[0];
    //Session end after all operation is successful
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // User --> Student --> academicSemester , academicFaculty, academicDepartment
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    // default password
    user.password = config.default_faculty_pass as string;
  }

  user.role = ENUM_USER_ROLE.FACULTY;

  const session = await mongoose.startSession();
  let newFacultyAllData = null;

  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], {
      session,
    });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty!');
    }

    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newFacultyAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newFacultyAllData) {
    newFacultyAllData = await User.findOne({ id: newFacultyAllData.id })
      .populate({
        path: 'faculty',
        populate: [
          { path: 'academicFaculty', options: { strictPopulate: false } },
          { path: 'academicDepartment', options: { strictPopulate: false } },
        ],
      })
      .lean();
  }

  return newFacultyAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    // default password
    user.password = config.default_admin_pass as string;
  }

  user.role = ENUM_USER_ROLE.ADMIN;

  const session = await mongoose.startSession();
  let newAdminAllData = null;

  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], {
      session,
    });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin!');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newAdminAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newAdminAllData) {
    newAdminAllData = await User.findOne({ id: newAdminAllData.id })
      .populate({
        path: 'admin',
        populate: {
          path: 'managementDepartment',
          options: { strictPopulate: false },
        },
      })
      .lean();
  }

  return newAdminAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
