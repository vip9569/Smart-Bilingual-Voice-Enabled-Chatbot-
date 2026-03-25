import express from 'express'
import { deleteQuery, getAllUnansweredQueries, getChatHistory } from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.get("/unanswered-queries", getAllUnansweredQueries)
adminRouter.delete("/delete-query/:id", deleteQuery)
adminRouter.get("/history", getChatHistory)


export default adminRouter