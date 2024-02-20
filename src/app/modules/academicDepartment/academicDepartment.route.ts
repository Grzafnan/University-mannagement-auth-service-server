import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';
const router = express.Router();

router.post(
  '/create',
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  auth(
    ENUM_USER_ROLE.SUPPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  academicDepartmentController.createDepartment
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  academicDepartmentController.getSingleDepartment
);

router.patch(
  '/:id',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  auth(
    ENUM_USER_ROLE.SUPPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  academicDepartmentController.updateDepartment
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicDepartmentController.deleteDepartment
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  academicDepartmentController.getAllDepartment
);

export const academicDepartmentRoutes = router;
