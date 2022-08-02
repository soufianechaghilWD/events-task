import { Request, Response } from "express";
import Event from "../models/event.model"

const Search = async (req: Request, res: Response) => {

    const {keyword} = req.params

    const data = await Event.find({
        "$or": [
            {name: {$regex: keyword}},
            {description: {$regex: keyword}},
            {artist: {$regex: keyword}},
            {location: {$regex: keyword}},
            {type: {$regex: keyword}},
        ]
    })

    res.status(200).json({
        status: true,
        message: "Extracted the data",
        data
    })

}

export default Search