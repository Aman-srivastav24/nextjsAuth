import mongoose from "mongoose";

export async function connectDB(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB Conncectd")
        });
        connection.on('error',(err)=>{
            console.log('MongoDB connection error,Please makeSure db is up and running' + err)
        });
     

    } catch (error) {
        console.log('Something Went wrong in db :',error);
        
    }
}