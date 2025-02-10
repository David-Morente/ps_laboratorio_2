import Assignment from "./../models/assignment.model.js";

export const assignmentCourse = async (req, res) => {
    try{
        const data = req.body

        const assignamentCount = await Assignment.countDocuments({student: data.student})

        if (assignamentCount == 3) {
            return res.status(400).json({
                success: false,
                message: "Ya te asignaste al limite de cursos"
            })
        }

        const assignamentExist = await Assignment.findOne({ student: data.student, course: data.course});

        if(assignamentExist){
            return res.status(400).json({
                success: false,
                message: "Ya te asignaste a este curso"
            })
        }

        const assignment = await Assignment.create(data)
        return res.status(201).json({
            message: "Curso asignado",
            assignment
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "Fallo al asignarse a un curso",
            error: err.message
        })
    }
}

export const getAssignamentCoursesByIdStudent = async (req, res) => {
    try {
        const { uid_student } = req.params;

        const assignaments = await Assignment.find({ student: uid_student, status: true })
            .populate({
                path: "course",
                select: "name teacher",
                populate: {
                    path: "teacher", 
                    select: "name email"
                }
            })
            .populate("student", "name email");

        if (assignaments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay cursos asignados a este alumno"
            });
        }

        return res.status(200).json({
            success: true,
            assignaments
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