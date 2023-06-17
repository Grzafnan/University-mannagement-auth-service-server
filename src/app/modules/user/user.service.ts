import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
  generateSuperAdminId,
} from './user.utils';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { ENUM_USER_ROLE } from '../../../enums/user';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // generated incremental id
  const academicSemester: IAcademicSemester = {
    title: 'Summer',
    year: '2023',
    code: '01',
    startMonth: 'January',
    endMonth: 'May',
  };

  if (user.role === ENUM_USER_ROLE.STUDENT) {
    user.id = await generateStudentId(academicSemester);
  } else if (user.role === ENUM_USER_ROLE.FACULTY) {
    user.id = await generateFacultyId();
  } else if (user.role === ENUM_USER_ROLE.ADMIN) {
    user.id = await generateAdminId();
  } else if (user.role === ENUM_USER_ROLE.SUPPER_ADMIN) {
    user.id = await generateSuperAdminId();
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unknown User type!');
  }

  if (!user.password) {
    // default password
    user.password = config.default_user_pass as string;
  }

  const createdUser = User.create(user);
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
