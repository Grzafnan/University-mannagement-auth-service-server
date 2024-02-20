import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
  syncId: string;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;

export type IAcademicFacultyFilters = {
  searchTerm?: string;
  title?: string;
};

export type IAcademicFacultyCreatedEvent = {
  id: string;
  title: string;
};
