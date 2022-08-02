import {Request, Response} from "express"
import Event from "../models/event.model"
import {omit} from "lodash"

export const addNewEvent = async (req: Request, res: Response) => {

    let eventData = req.body

    try{
        if(process.env.adminCred !== eventData.adminCred) return res.status(401).json({
            status: false,
            message: "Invalid Admin credentials"
        })

        eventData.date = new Date(eventData.date)
        eventData = omit(eventData, "adminCred")

        const event = await Event.create(eventData)

        return res.status(201).json({
            status: true,
            message: "Event created successfully",
            data: event
        }) 

    }catch(e){
        console.log("yooo", e)
        return res.status(400).json({
            status: false,
            message: "Invalid request",
            data: e
        })
    }

}