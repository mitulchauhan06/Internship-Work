import express from 'express';
import mongoose  from 'mongoose';
import cors from  'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import configRoutes from  './routes/configRoutes.js';

dotenv.config();


const app =express();

//moddleware
app.use(cors());
app.use(express.json());



//routes
app.use('/api/tasks', taskRoutes);
app.use('/api/config', configRoutes);



//db connections 

mongoose.connect(process.env.MONGODB_URI)
.then(() => 
    
    console.log("mongodb connected"))
    .catch( err => console.error("mongodb error:" , err));


// mongoose.connect("mongodb://localhost:27017/taskmanager")
//   .then(() => console.log("✅ MongoDB Connected (Local)"))
//   .catch(err => console.error("❌ MongoDB Error:", err));
    

    //server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => 
    console.log(`server running on port  ${PORT}`)
    );
    
