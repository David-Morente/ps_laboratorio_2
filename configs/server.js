"use strict"

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import userRoutes from "./../src/routes/user.routes.js"
import coursesRoutes from "./../src/routes/courses.routes.js" 
import assignamentRoutes from "./../src/routes/assignament.routes.js" 
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/api/v1/user", userRoutes)
    app.use("/api/v1/courses", coursesRoutes)
    app.use("/api/v1/assignament", assignamentRoutes)
}

const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server runing  on port: ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}