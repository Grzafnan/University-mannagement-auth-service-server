import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_DEPARTMENT_CREATED } from './academicDepartment.constant';
import { IAcademicDepartmentCreatedEvent } from './academicDepartment.interface';
import { academicDepartmentService } from './academicDepartment.service';

const initAcademicDepartmentEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    async (e: string) => {
      const data: IAcademicDepartmentCreatedEvent = JSON.parse(e);
      await academicDepartmentService.createDepartmentFromEvent(data);
    }
  );
};

export default initAcademicDepartmentEvents;
