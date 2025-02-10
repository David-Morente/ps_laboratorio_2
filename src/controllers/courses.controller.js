import Courses from "./../models/courses.model.js"

export const createCourse = async (req, res) => {
    try{
        const data = req.body

        const course = await Courses.create(data)
        return res.status(201).json({
            message: "Curso creado",
            course
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "Fallo al agregar curso",
            error: err.message
        })
    }
}

export const getCoursesByIdTeacher = async (req, res) => {
    try {
        const { uid_teacher } = req.params;

        const courses = await Courses.find({ teacher: uid_teacher, status: true }).populate("teacher", "name email");

        if (courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay cursos asignados a este profesor"
            });
        }

        return res.status(200).json({
            success: true,
            courses
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        });
    }
};

export const findCourseById = async(req, res) => {
    try{
        const { uid } = req.params;
        const course = await Courses.findById(uid)


        if(!course){
            return res.status(404).json({
                success: false,
                message: "Curso no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            course
        })

    } catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error al obtener el curso",
            error: err.message
        })
    }
}

export const deleteCourse = async (req, res) => {
    try{
        const { uid } = req. params

        const course =  await Courses.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Curso Eliminado",
            course
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el curso",
            error: err.message
        })
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const course = await Courses.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Curso actualizado",
            course,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el curso',
            error: err.message
        });
    }
}