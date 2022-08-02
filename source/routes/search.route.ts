import express, { Router } from "express"
import Search from "../controllers/search.controller"


const searchRouter: Router = express.Router()

searchRouter.get('/:keyword', Search)

export default searchRouter