import express from "express"
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import fileRoutes from "./routes/file.routes.js"
import MailRoutes from './routes/mail.routes.js'

const app = express()
const PORT = 5000

app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/files',fileRoutes)
app.use('/api/files',MailRoutes)
//mounting
connectDB()

app.get('/',(req,res)=>{
    res.send("ColdMailer api is running")

})

app.listen(PORT,()=>{
    console.log(`server is running on port : ${PORT}`)
})