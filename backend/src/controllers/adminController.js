import UnAnsweredQueries from "../models/unAnsweredQueries.js"


// fetch List of all un answered queries
export const getAllUnansweredQueries = async (req, res) => {
    try {

        const allUnansweredQueries = await UnAnsweredQueries.find()

        if (!allUnansweredQueries) {
            return res.status(404).json({ mesaage: "Queries Not Exists" })
        }
        return res.status(200).json(allUnansweredQueries)
    } catch (error) {
        return res.status(500).json({ message: `queries message error ${error.message}` })
    }
}

export const deleteQuery = async (req, res) => {
    try {
        const queryId = req.params.id

        // console.log(queryId)
        if (!queryId) {
            return res.status(400).json({ message: "Bad Request" })
        }
        const query = await UnAnsweredQueries.findByIdAndDelete(queryId)

        if (!query) {
            return res.status(404).json({ message: "Query Not Found" })
        }

        return res.status(200).json({ message: "Query Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Server Error ${error.message}` })
    }
}