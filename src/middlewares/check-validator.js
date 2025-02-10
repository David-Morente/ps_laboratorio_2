import { body, param } from "express-validator";
import { existeEmail, existeUsername, userExists, courseExists } from "./../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";

export const registerValidator = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("username","El username es obligatorio").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty(),
    body("email", "Ingrese un correo válido").isEmail(),
    body("email").custom(existeEmail),
    body("username").custom(existeUsername),
    body("role", "El rol es obligatorio").not().isEmpty(),
    /*body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    }),*/
    validarCampos
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Ingrese un correo válido"),
    body("username").optional().isString().withMessage("Ingrese un username válido"),
    body("password").isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos
]

export const getUserByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExists),
    validarCampos
]

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExists),
    validarCampos
]

export const updatePasswordValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExists),
    body("newPassword").isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos
]

export const updateUserValidator = [
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos
]

/**
 * Validadores de cursos
 */

export const createCourseValidator = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("teacher","El maestro es obligatorio").not().isEmpty(),
    validarCampos
]

export const getCoursesByTeacherIdValidator = [
    param("uid_teacher").isMongoId().withMessage("No es un ID válido"),
    param("uid_teacher").custom(userExists),
    validarCampos
]

export const findCourseByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(courseExists),
    validarCampos
]

export const deleteCourseValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(courseExists),
    validarCampos
]

export const updateCourseValidator = [
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(courseExists),
    validarCampos
]

/**
 * Validadores de asignación
 */

export const assignmentCourseValidator = [
    body("course", "El curso es obligatorio").not().isEmpty(),
    body("course").custom(courseExists),
    body("student","El estudiante es obligatorio").not().isEmpty(),
    body("student").custom(userExists),
    validarCampos
]

export const getAssignamentCoursesByIdStudentValidator = [
    param("uid_student").isMongoId().withMessage("No es un ID válido"),
    param("uid_student").custom(userExists),
    validarCampos
]