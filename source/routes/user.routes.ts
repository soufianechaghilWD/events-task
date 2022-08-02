import express, {Router} from 'express'
import { SignUp, Login, AddEvent, RemoveEvent } from '../controllers/user.controller';
import VerifyJWT from '../validators/validateToken';

const userRouter: Router = express.Router()

userRouter.post('/', SignUp)
userRouter.post('/session', Login)
userRouter.put('/event/:eventId', VerifyJWT, AddEvent)
userRouter.delete('/event/:eventId', VerifyJWT, RemoveEvent)

export default userRouter;