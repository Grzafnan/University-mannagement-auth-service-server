import { z } from 'zod';
import { Blood, Gender } from '../../../constants/common';

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
      })
      .optional(),
    email: z.string().email().optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    profileImage: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.enum([...Blood] as [string, ...string[]]).optional(),
    designation: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
});

export const FacultyValidation = {
  updateFacultyZodSchema,
};
