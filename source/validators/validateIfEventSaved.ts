import User from "../models/user.model"


const IsEventSaved = async (email: string, eventId: string) => {

    const user = await User.findOne({email})

    if(!user) return null

    if(user.events.find(event => event.toString() === eventId)) return true

    return false

}

export default IsEventSaved