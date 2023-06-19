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

router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);

router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
