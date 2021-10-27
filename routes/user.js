const router=require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require('../models/user');
const {requireLogin} = require('../middleware/auth')
//register
router.post('/register', async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({error:'Already Exist'});
        }
        const hashed_pass=await bcrypt.hash(password,10);
        user=new User({
            email,name,password:hashed_pass
        })
        await user.save();
        return res.status(201).json({
            message:'User Created Successully'
        })
    }catch(err){
        console.log(err)
    }
});
//login
router.post('/login', async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:'Invalid Credentials'});
        }
       const isMatch = bcrypt.compare(password,user.password);
       if(!isMatch){
        return res.status(400).json({error:'Invalid Credentials'});
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        return res.json({token})
    }catch(err){
        console.log(err)
    }
})

router.get('/', requireLogin, async (req,res)=>{
    console.log(req.user)
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    }catch(err){
        console.log(err)
    }
})
module.exports=router;