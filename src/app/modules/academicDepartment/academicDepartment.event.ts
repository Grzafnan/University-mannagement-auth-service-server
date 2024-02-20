import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
} from './academicDepartment.constant';
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

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_UPDATED,
    async (e: string) => {
      const data: IAcademicDepartmentCreatedEvent = JSON.parse(e);
      await academicDepartmentService.updateDepartmentFromEvent(data);
    }
  );
};

export default initAcademicDepartmentEvents;
