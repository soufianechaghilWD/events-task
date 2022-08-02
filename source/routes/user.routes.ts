import express, {Router} from 'express'
import { SignUp, Login, AddEvent, RemoveEvent, GetEvents } from '../controllers/user.controller';
import VerifyJWT from '../validators/validateToken';

const userRouter: Router = express.Router()

userRouter.post('/', SignUp)
userRouter.post('/session', Login)
userRouter.put('/event/:eventId', VerifyJWT, AddEvent)
userRouter.delete('/event/:eventId', VerifyJWT, RemoveEvent)
userRouter.get('/events', VerifyJWT, GetEvents)

export default userRouter;