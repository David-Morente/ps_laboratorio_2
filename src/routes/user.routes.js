import { Router } from "express";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator } from "./../middlewares/check-validator.js";
import { register, login, getUserById, getUsers, deleteUser, updatePassword, updateUser } from "./../controllers/user.controller.js";
import { registerValidator, loginValidator } from "../middlewares/check-validator.js";

const router = Router()

router.post(
    "/register",
    registerValidator, 
    register
)

router.post("/login", loginValidator, login)

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

export default router