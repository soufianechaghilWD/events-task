import { Request, Response } from "express";
import User from "../models/user.model";
import { omit } from "lodash";
import ValidateUser from "../validators/validateUser";
import IsEventSaved from "../validators/validateIfEventSaved";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'

export const SignUp = async (req: Request, res: Response) => {
  
    const userData = req.body;

  try {

    const user = await User.create(userData);

    return res.status(201).json({
      status: true,
      message: "User created successfully",
      data: omit(user.toJSON(), "password"),
    });

  } catch (e) {

    return res.status(400).json({
      status: false,
      message: "Invalid request",
      data: e,
    });

  }
};

export const Login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {

    const user = await ValidateUser(email, password);

    if (!user)
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });

    const token = jwt.sign({ email: user.email }, "JwtSecret", {
      expiresIn: "7d",
    });

    return res.status(202).json({ token });

  } catch (e) {

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
    });

  }
};

export const AddEvent = async (req: Request, res: Response) => {

  const { eventId } = req.params;
  const { email } = req.cookies;

  try {

    const isEventInUser = await IsEventSaved(email, eventId);

    // check if the user does not exist 
    if (isEventInUser === null)
      return res.status(401).json({
        status: false,
        message: "User does not exist",
      });

    // check if the event is already saved
    if (isEventInUser)
      return res.status(409).json({
        status: false,
        message: "Event already saved",
      });

    // add the event to the events list
    const updated = await User.updateOne(
      { email },
      {$addToSet: {events: new mongoose.Types.ObjectId(eventId)}}
    );

    if (updated.modifiedCount === 0)
      return res.status(304).json({
        status: false,
        message: "Could not add the event",
      });

    return res.status(201).json({ status: true, message: "Event saved" });

  } catch (e) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const RemoveEvent = async (req: Request, res: Response) => {

  const { eventId } = req.params;
  const { email } = req.cookies;

  try {
    const isEventInUser = await IsEventSaved(email, eventId);

    // check if the user does not exist 
    if (isEventInUser === null)
      return res.status(401).json({
        status: false,
        message: "User does not exist",
      });

    // check if the user has the event saved
    if (isEventInUser === false)
      return res.status(409).json({
        status: false,
        message: "Event is not saved",
      });

    // remove the event from the events list
    const updated = await User.updateOne(
      { email },
      { $pull: { events: eventId } }
    );

    if (updated.modifiedCount === 0)
      return res.status(304).json({
        status: false,
        message: "Could not remove the event",
      });

    return res.status(201).json({ status: true, message: "Event removed" });

  } catch (e) {

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const GetEvents = async (req: Request, res: Response) => {
    const { email } = req.cookies;

    try{
        const user = await User.findOne({email}).populate("events")
        if(!user) return res.status(400).json({
            status: false,
            message: "User does not exist",
          });
        
        return res.status(200).json({ status: true, message: "Event retrieved", data: user.events });

    }
    catch(e){
        res.status(400).json({
            status: false,
            message: "Something went wrong",
          });
    }

}