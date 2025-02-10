import {Schema, model} from "mongoose";

const assignamentSchema = Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Courses',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Assignaments", assignamentSchema)