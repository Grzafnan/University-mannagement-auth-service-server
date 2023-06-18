import { z } from 'zod';
import { Blood, Gender } from './student.constant';

const updateStudentZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }),
    email: z.string().email().optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    profileImage: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.enum([...Blood] as [string, ...string[]]).optional(),
    guardian: z
      .object({
        fatherName: z.string().optional(),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string().optional(),
        motherOccupation: z.string().optional(),
        motherContactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z.string().optional(),
        occupation: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    academicFaculty: z.string().optional(),
    academicSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
});

export const StudentValidation = {
  updateStudentZodSchema,
};
