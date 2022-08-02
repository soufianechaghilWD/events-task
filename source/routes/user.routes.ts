import express, {Router} from 'express'
import { SignUp } from '../controllers/user.controller';

const userRouter: Router = express.Router()

userRouter.post('/', SignUp)

export default userRouter;