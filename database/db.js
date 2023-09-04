import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const username = process.env.db_username;
const password = process.env.db_password;
const database = process.env.db_database;

const Connection = ()=>{
    const urlConnect = `mongodb+srv://${username}:${password}@cluster0.9ca9gxg.mongodb.net/${database}?retryWrites=true&w=majority`;
    mongoose.connect(urlConnect,{useNewUrlParser:true})

    mongoose.connection.on('connected', ()=>{
        console.log("database connected successfully");
    });
    mongoose.connection.on('disconnected',()=>{
        console.log("DataBase disconnected");
    });
    mongoose.connection.on('error',()=>{
        console.log("error occured");
    });
};

export default Connection;