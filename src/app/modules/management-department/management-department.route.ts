import express from 'express';
const router = express.Router();
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentValidation } from './management-department.validation';
import { ManagementDepartmentController } from './management-department.controller';

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);
router.get('/', ManagementDepartmentController.getAllManagementDepartments);

export const ManagementDepartmentRoutes = router;
