import { Request, Response } from "express";
import User from "../models/user.model"
import {omit} from "lodash"

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