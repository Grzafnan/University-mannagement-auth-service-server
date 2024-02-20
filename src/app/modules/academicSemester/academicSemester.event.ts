import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_SEMESTER_CREATED } from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.createAcademicSemesterFromEvent(data);
  });
};

export default initAcademicSemesterEvents;
