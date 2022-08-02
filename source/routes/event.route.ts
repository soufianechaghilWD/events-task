import express, {Router} from 'express'
import { AddNewEvent, GetEvents } from '../controllers/event.controller';

const eventRouter: Router = express.Router()

eventRouter.post('/', AddNewEvent)
eventRouter.get('/', GetEvents)

export default eventRouter;