const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const creatToken = (_id) =>{
    const jwtkey = process.env.JWT_SCERET_KEY;
    return jwt.sign({_id}, jwtkey, {expiresIn : "3d"});
}

module.exports.registerUser = async (req, res) =>{

    try{
        
    const {name, email, password} = req.body;

    let user = await userModel.findOne({email});

    if(user)return res.status(400).json("User with the given email already exist...");

    if(!name || !email || !password) return res.status(400).json("All field are requird...");

    if(!validator.isEmail(email))return res.status(400).json("Email must be a valid email...");

    if(!validator.isStrongPassword(password))return res.status(400).json("Password must be a strong password...");

    user = new userModel({name, email, password});

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save(); 

    const token = creatToken(user._id);

    return res.status(200).json({_id : user._id, name, email, token});
    }
    catch(error){
        console.log(error);
        return res.status(500).json(error);
    }  
}

module.exports.login = async (req, res) =>{

    const {email, password} = req.body;
    try {
     let user =await userModel.findOne({email});

     if(!user)return res.status(400).json("Invaild username and password...");

     const isVaildPassword = await bcrypt.compare(password, user.password);
     
     if(!isVaildPassword)return res.status(400).json("Invaild username and password...");


    const token = creatToken(user._id);

    return res.status(200).json({_id:user._id, name:user.name, email, token});

    } catch (error) {
        return res.send(500).json(error);
    }
}

module.exports.findUser = async (req, res) =>{
    const userId = req.params.userId;

    try{
        const user = await userModel.findById(userId);
        return res.status(200).json(user);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

module.exports.getUser = async (req, res) => {
    try{
        const users = await userModel.find();
        return res.status(200).json(users);
    }
    catch(error){
        return res.status(500).json(error);
    }
}
