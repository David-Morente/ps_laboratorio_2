import { Router } from "express";
import { createCourse, deleteCourse, findCourseById, getCoursesByIdTeacher, updateCourse } from "./../controllers/courses.controller.js";
import { createCourseValidator, deleteCourseValidator, getCoursesByTeacherIdValidator, findCourseByIdValidator, updateCourseValidator } from "../middlewares/check-validator.js";
import { ValidarToken } from "../middlewares/validar-JWT.js";
import { ValidarRol } from "../middlewares/validar-rol.js";

const router = Router()

router.post("/createCourse", createCourseValidator, ValidarToken, ValidarRol('TEACHER_ROLE'), createCourse)

router.get("/getCoursesByIdTeacher/:uid_teacher", getCoursesByTeacherIdValidator, ValidarToken, ValidarRol('TEACHER_ROLE'),  getCoursesByIdTeacher)

router.get("/findCourse/:uid", findCourseByIdValidator, ValidarToken, ValidarRol('TEACHER_ROLE'), findCourseById)

router.delete("/deleteCourse/:uid", deleteCourseValidator, ValidarToken, ValidarRol('TEACHER_ROLE'), deleteCourse)

router.put("/updateCourse/:uid", updateCourseValidator, ValidarToken, ValidarRol('TEACHER_ROLE'), updateCourse)

export default router