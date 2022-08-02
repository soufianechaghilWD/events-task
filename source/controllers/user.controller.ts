import { Request, Response } from "express";
import User from "../models/user.model"
import {omit} from "lodash"
import validateUser from "../validators/validateUser";
import jwt from "jsonwebtoken"

export const SignUp = async (req: Request, res: Response) => {
    
    const userData = req.body

    try{
        const user = await User.create(userData)
        return res.status(201).json({
            status: true,
            message: "User created successfully",
            data: omit(user.toJSON(), "password")
        })
    }catch(e){
        return res.status(400).json({
            status: false,
            message: "Invalid request",
            data: e
        })
    }

}

export const Login = async (req: Request, res: Response) => {

    const {email, password} = req.body

    try{  
        const user = await validateUser(email, password)

        if(!user) return res.status(401).json({
            status: false,
            message: "Invalid email or password"
        })

        const token = jwt.sign({email: user.email}, "JwtSecret", {expiresIn: "7d"})

        return res.status(200).json({token})


    }catch(e){
        return res.status(400).json({
            status: false,
            message: "Something went wrong"
        })

    }


} 
