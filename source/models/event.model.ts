import {Schema, model} from "mongoose"

interface Ievent {
    name: string;
    description: string;
    date: Date;
    artist: string;
    location: string;
    type: "EDM" | "Techno" | "Hip-Hop";
}

const eventSchema = new Schema<Ievent>({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    artist: {type: String, required: true},
    location: {type: String, required: true},
    type: {type: String, required: true, enum: ["EDM", "Techno", "Hip-Hop"] }
})

export default model<Ievent>('Event', eventSchema);