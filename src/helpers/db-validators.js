import User from "./../models/user.model.js"
import Courses from "./../models/courses.model.js"

export const existeEmail = async(email = '') =>{
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}

export const existeUsername = async(username = '') =>{
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El email ${username} ya fue registrado previamente`)
    }
}

export const userExists = async(uid = '') =>{
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("El usuario no existe")
    }
}

export const courseExists = async(uid = '') =>{
    const existe = await Courses.findById(uid)
    if(!existe){
        throw new Error("El curso no existe")
    }
}