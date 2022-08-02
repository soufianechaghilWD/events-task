import express, { Router } from "express"
import userRouter from "./user.routes";


const apiRouter: Router = express.Router()

apiRouter.use('/users', userRouter)

export default apiRouter;