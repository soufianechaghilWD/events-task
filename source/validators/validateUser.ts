import User from '../models/user.model'
import {omit} from "lodash"

const validateUser = async (email: string, password: string) => {
    
    const user = await User.findOne({email}) 
    
    if(!user) return false

    const isValid = await user.comparePassword(password)

    if(!isValid) return false

    return omit(user.toJSON(), "password")

}

export default validateUser