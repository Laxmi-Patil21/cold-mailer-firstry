import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async()=>{
    try
    {
        const connection = await mongoose.connect(process.env.mongodb_url)
        console.log("Mongodb Connected")
    }
    catch(e){
        console.log(e.message)

    }
}
export default connectDB;



