import express from 'express'
import cors from 'cors'

import routes from './routes'

const port = process.env.PORT || 3333;
const api = express()

api.use(cors())
api.use(express.json())
api.use(routes)

api.listen(port, () => {
    console.log(`HTTP Server Running is up on http://localhost:${port}`)
})
