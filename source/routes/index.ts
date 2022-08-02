import express, { Router } from "express"
import eventRouter from "./event.route";
import searchRouter from "./search.route";
import userRouter from "./user.routes";


const apiRouter: Router = express.Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/events', eventRouter)
apiRouter.use('/search', searchRouter)

export default apiRouter;