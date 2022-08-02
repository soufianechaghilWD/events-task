import express, {Router} from 'express'
import { SignUp, Login } from '../controllers/user.controller';

const userRouter: Router = express.Router()

userRouter.post('/', SignUp)
userRouter.post('/session', Login)

export default userRouter;