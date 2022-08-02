import {Request, Response} from "express"
import Event from "../models/event.model"
import {omit} from "lodash"

// add new events to the database (only admin)
export const AddNewEvent = async (req: Request, res: Response) => {

    let eventData = req.body

    try{
        if(process.env.adminCred !== eventData.adminCred) return res.status(401).json({
            status: false,
            message: "Invalid Admin credentials"
        })

        if(typeof(eventData.date) === "string") eventData.date = new Date(eventData.date)
        
        eventData = omit(eventData, "adminCred")

        const event = await Event.create(eventData)

        return res.status(201).json({
            status: true,
            message: "Event created successfully",
            data: event
        }) 

    }catch(e){
        return res.status(400).json({
            status: false,
            message: "Invalid request",
            data: e
        })
    }

}

export const GetEvents = async (req: Request, res: Response) => {
    try{
        
        const events = await Event.find({})

        return res.status(200).json({
            status: true,
            message: "successfully got all the events",
            data: events
        })

    }catch(e){
        return res.status(400).json({
            status: false,
            message: "Could not get the events"
        })
    }
}