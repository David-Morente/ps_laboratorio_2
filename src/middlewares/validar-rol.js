export const ValidarRol = (role) => {
   return function(req, res, next) {

    const { user } = req.body;

    if (role != user.role) {
        return res.status(400).send({
            success: false,
            message: "El rol de usuario es distinto al de TEACHER_ROLE.",
        });
    }

    next()
   }
};