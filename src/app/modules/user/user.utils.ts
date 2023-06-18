/* eslint-disable prefer-const */
import { ENUM_USER_ROLE } from '../../../enums/user';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const user = await User.findOne(
    { role: ENUM_USER_ROLE.STUDENT },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return user?.id ? user.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const lastStudentId = await findLastStudentId();
  let nextId = (Number(lastStudentId) + 1 || 1).toString().padStart(5, '0');
  nextId = `${academicSemester?.year?.substring(2)}${
    academicSemester?.code
  }${nextId}`;

  return nextId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFacultyId = await User.findOne(
    { role: ENUM_USER_ROLE.FACULTY },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFacultyId?.id ? lastFacultyId.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId = await findLastFacultyId();
  let nextId = (Number(currentId) + 1 || 1).toString().padStart(5, '0');
  nextId = `F-${nextId}`;
  return nextId;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdminId = await User.findOne(
    { role: ENUM_USER_ROLE.ADMIN },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdminId?.id ? lastAdminId.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId = await findLastAdminId();
  let nextId = (Number(currentId) + 1 || 1).toString().padStart(5, '0');
  nextId = `A-${nextId}`;
  return nextId;
};

export const findLastSuperAdminId = async (): Promise<string | undefined> => {
  const lastSuperAdminId = await User.findOne(
    { role: ENUM_USER_ROLE.SUPPER_ADMIN },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastSuperAdminId?.id ? lastSuperAdminId.id.substring(4) : undefined;
};

export const generateSuperAdminId = async (): Promise<string> => {
  const currentId = await findLastSuperAdminId();
  let nextId = (Number(currentId) + 1 || 1).toString().padStart(5, '0');
  nextId = `SA-${nextId}`;
  return nextId;
};
