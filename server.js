import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js"
import cors from "cors";
import mongoose from "mongoose";

dotenv.config({
    path: "./.env",
});
Connection();


const app = express();

app.use(express.json());    
app.use(express.urlencoded({extended:true}));
app.use(cors());

const todoSchema = new mongoose.Schema({
    task:String,
    done:{
        type:Boolean,
        default: false
    }
});
const TodoModel = mongoose.model("todo",todoSchema);



// create/ Add  Task API
app.post('/add', async (req, res) => {
    const { task,done} = req.body;
    const data = await TodoModel.create({"task":task, "done":done});
    res.send(data);
    console.log(task);
    console.log(done);
    });

// View Task API
app.get('/',async (req, res) => {
    const todo = await TodoModel.find();
    res.send(todo)
});

// Update task API
app.put("/update/:id",async (req,res)=>{
    let todo = await TodoModel.findById(req.params.id);
    todo = await TodoModel.findByIdAndUpdate(req.params.id,req.body,{new:true,
              useFindAndModify:false, runValidators:true})
    res.status(200).json({success:true,todo})
});

// Delete task API
app.delete("/delete/:id", async (req,res)=>{
    let todo = await TodoModel.findById(req.params.id);
    if(!todo){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        }) 
    }
    await TodoModel.findByIdAndDelete(req.params.id,req.body,{new:true,
        useFindAndModify:false, runValidators:true})
    res.status(200).json({success:true, message:"Product deleted successfully"})
});
const port = process.env.port || 5000 ;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});