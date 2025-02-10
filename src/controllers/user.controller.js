import { hash, verify } from "argon2"
import User from "./../models/user.model.js"
import { generateJWT } from "./../helpers/generate-jwt.js"

export const register = async (req, res) => {
    try{
        const data = req.body
        const encryptedPassword = await hash(data.password)

        data.password = encryptedPassword
        const user = await User.create(data)
        return res.status(201).json({
            message: "Usuario registrado",
            name: user.name,
            email: user.email
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "Registro del usuario fallido",
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or: [{email: email}, {username: username}]
        })

        if(!user){
            return res.status(404).json({
                message: "Credenciales inválidas",
                error: "Username o email no existe en la base de datos"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails:{
                token: token,
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error en inicio de sesión",
            error: err.message
        })
    }
}

export const getUserById = async(req, res) => {
    try{
        const { uid } = req.params;
        const user = await User.findById(uid)


        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    } catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const getUsers = async(req, res) => {
    try{
        const { limits = 3, from = 0} = req.query
        const query = {status: true}

        const [ total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los usuarios",
            error: err.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { uid } = req. params

        const user =  await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario Eliminado",
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } =  req.body

        const user = await User.findById(uid)

        const matchPassword = await verify(user.password, newPassword)

        if(matchPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }
        
        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(uid, {password: encryptedPassword})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Usuario actualizado",
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: err.message
        });
    }
}