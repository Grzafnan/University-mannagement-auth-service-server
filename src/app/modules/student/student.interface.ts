import { Model } from 'mongoose';

export type IBlood = 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';

export type IStudent = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  gender: string;
  dateOfBirth: Date;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: IBlood;
  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
  };
  localGuardian: {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
  };
};

export type IStudentModel = Model<IStudent, object>;
