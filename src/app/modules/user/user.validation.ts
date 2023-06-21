import { z } from 'zod';
import { Blood, Gender } from '../../../constants/common';

//* Create user request validation by Zod
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object(
        {
          firstName: z.string({
            required_error: 'First Name is required!',
          }),
          middleName: z.string().optional(),
          lastName: z.string({
            required_error: 'Last Name is required!',
          }),
        },
        {
          required_error: 'Name is required!',
        }
      ),
      email: z.string().email(),
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: 'Gender is required!',
      }),
      dateOfBirth: z.string({
        required_error: 'DateOfBirth is required!',
      }),
      profileImage: z.string({
        required_error: 'Profile Image is required!',
      }),
      contactNo: z.string({
        required_error: 'Contact Number is required!',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is required!',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is required!',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required!',
      }),
      bloodGroup: z.enum([...Blood] as [string, ...string[]], {
        required_error: 'Blood group is required!',
      }),
      guardian: z.object(
        {
          fatherName: z.string({
            required_error: 'Guardian Father Name is required!',
          }),
          fatherOccupation: z.string({
            required_error: 'Guardian Father Occupation is required!',
          }),
          fatherContactNo: z.string({
            required_error: 'Guardian Father Contact Number is required!',
          }),
          motherName: z.string({
            required_error: 'Guardian Mother Name is required!',
          }),
          motherOccupation: z.string({
            required_error: 'Guardian Mother Occupation Number is required!',
          }),
          motherContactNo: z.string({
            required_error: 'Guardian Mother Contact Number is required!',
          }),
          address: z.string({
            required_error: 'Guardian Address is required!',
          }),
        },
        {
          required_error: 'Guardian is required!',
        }
      ),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local Guardian Name is required!',
        }),
        occupation: z.string({
          required_error: 'Local Guardian Occupation is required!',
        }),
        contactNo: z.string({
          required_error: 'Local Guardian Contact Number is required!',
        }),
        address: z.string({
          required_error: 'Local Guardian Address is required!',
        }),
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required!',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is required!',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required!',
      }),
    }),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object(
        {
          firstName: z.string({
            required_error: 'First Name is required!',
          }),
          middleName: z.string().optional(),
          lastName: z.string({
            required_error: 'Last Name is required!',
          }),
        },
        {
          required_error: 'Name is required!',
        }
      ),
      email: z.string().email(),
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: 'Gender is required!',
      }),
      dateOfBirth: z.string({
        required_error: 'DateOfBirth is required!',
      }),
      profileImage: z.string({
        required_error: 'Profile Image is required!',
      }),
      contactNo: z.string({
        required_error: 'Contact Number is required!',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is required!',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is required!',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required!',
      }),
      bloodGroup: z.enum([...Blood] as [string, ...string[]], {
        required_error: 'Blood group is required!',
      }),
      designation: z.string({
        required_error: 'Designation is required!',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required!',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required!',
      }),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  createFacultyZodSchema,
};
