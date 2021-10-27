const express =require('express');
const mongoose=require('mongoose');
const cors =require('cors')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('mongoose is connected')).catch((err)=>console.log(err))
const app=express();
app.use(cors())
app.use(express.json());
app.use('/auth',require('./routes/user'))
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log('server is running'));