import express, {Router} from 'express'
import { addNewEvent, getEvents } from '../controllers/event.controller';

const eventRouter: Router = express.Router()

eventRouter.post('/', addNewEvent)
eventRouter.get('/', getEvents)

export default eventRouter;