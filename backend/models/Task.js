import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    priority: {
        type: String,
        required: true,
        enum: ["high" , "medium" , "low"],
        default: "low"
    },

    status:{
        type:String,
        enum: ["todo" , "in-progress" , "done"],
        default: "todo"
    },

    createdAt: {
        type: Date, 
        default: Date.now
    }
    

})

export default mongoose.model("Task" , taskSchema);