/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { IStudent } from './../student/student.interface';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { ENUM_USER_ROLE } from '../../../enums/user';
import AcademicSemester from '../academicSemester/academicSemester.model';
import Student from '../student/student.model';

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

export const UserService = {
  createStudent,
};
