import express from 'express'
import { deleteQuery, getAllUnansweredQueries } from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.get("/unanswered-queries", getAllUnansweredQueries)
adminRouter.delete("/delete-query/:id", deleteQuery)


export default adminRouter