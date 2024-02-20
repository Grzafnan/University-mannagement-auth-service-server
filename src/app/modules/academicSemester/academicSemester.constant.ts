import {
  IAcademicSemesterCodes,
  IAcademicSemesterTitles,
  IMonth,
} from './academicSemester.interface';

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterMonths: IMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableFields: string[] = [
  'title',
  'year',
  'code',
];

export const academicSemesterFilterableFields: string[] = [
  'searchTerm',
  'title',
  'year',
  'code',
];

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academicSemesters.created';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academicSemesters.updated';
