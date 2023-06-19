import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { StudentValidation } from './student.validation';
import { StudentController } from './student.controller';
const router = express.Router();

// router.post(
//   '/update-student',
//   validateRequest(StudentValidation.updateStudentZodSchema),
//   StudentController.updateStudent
// );

router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
