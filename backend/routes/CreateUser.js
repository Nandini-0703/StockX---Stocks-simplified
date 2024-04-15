import express from "express";
import {User} from "../models/User.js";
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {Trackers} from "../models/Trackers.js";
import dotenv from 'dotenv';


dotenv.config();





const jwtsecret = process.env.JWT_SECRET;


const router = express.Router();

router.post("/createuser" , [
    body('email', 'incorrect email').isEmail(),
     body('name', 'incorrect name'),
     body('password', 'incorrect password').isLength({ min: 5 })] , async(request,response)=>{
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        } 

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(request.body.password , salt);
    try {
        await User.create({
            name: request.body.name,
            password: secPassword,
            email: request.body.email,
            location: request.body.location,
            
        })

        response.json({success:true});
    } catch (error) {
        console.log(error);
        response.json({success:false});
    }
})


router.post("/loginuser" , [
    body('email', 'incorrect email').isEmail(),
     body('password', 'incorrect password').isLength({ min: 5 })] ,async (request,response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        } 
    let email = request.body.email;
   
    try {
       let userData =  await User.findOne({email});
       if(!userData){
        return response.status(400).json({errors:"try logging with correct email"});
       }
      
       const pwdCompare = await bcrypt.compare(request.body.password , userData.password);
       if(!pwdCompare){
        return response.status(400).json({message:"try logging with correct password"});
       }
       const data = {
        id:userData.id
            
        
     }

     const authToken = jwt.sign(data , jwtsecret)
     return response.status(201).send({success:true , authToken:authToken});
     
      
    } catch (error) {
        console.log(error); 
        response.json({success:false});  
    }
})

router.post("/track" , async (request , response) => {
    let userData =  await User.findOne({email});
    try {
        await Trackers.create({
           
            username: userData.name,
           
          
        })
        
        response.json({success:true});
    } catch (error) {
        console.log(error);
        response.json({success:false});
    }
})

export default router;


