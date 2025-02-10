import { Router } from "express";
import { assignmentCourse, getAssignamentCoursesByIdStudent } from "./../controllers/assignament.controller.js";
import { assignmentCourseValidator, getAssignamentCoursesByIdStudentValidator } from "./../middlewares/check-validator.js";
import { ValidarToken } from "./../middlewares/validar-JWT.js";
import { ValidarRol } from "./../middlewares/validar-rol.js";


const router = Router()

router.post("/assignmentCourse", assignmentCourseValidator, ValidarToken, ValidarRol('STUDENT_ROLE'), assignmentCourse)

router.get("/getAssignamentCoursesByIdStudent/:uid_student", getAssignamentCoursesByIdStudentValidator, ValidarToken, ValidarRol('STUDENT_ROLE'), getAssignamentCoursesByIdStudent)

export default router