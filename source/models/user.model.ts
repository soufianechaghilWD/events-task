import {Schema, model, Types} from "mongoose"
import bcrypt from "bcrypt"


interface IUser {
    name: string;
    email: string;
    password: string;
    events: [Types.ObjectId] | []
}

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    events: [{type: Types.ObjectId, ref: "Event"}] || []
})

userSchema.pre('save', async function (next) {

    let user = this as IUser

    if(!user.isModified("password")) return next()

    const hash = await bcrypt.hashSync(user.password, 10)

    user.password = hash

    return next()

})

export default model<IUser>('User', userSchema);