import express, {Router} from 'express'
import { addNewEvent } from '../controllers/event.controller';

const eventRouter: Router = express.Router()

eventRouter.post('/', addNewEvent)

export default eventRouter;