import express, { Router } from "express"
import eventRouter from "./event.route";
import userRouter from "./user.routes";


const apiRouter: Router = express.Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/events', eventRouter)

export default apiRouter;