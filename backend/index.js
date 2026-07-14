import dotenv from 'dotenv'

import app from './server/server.js'
import databaseConnection from './config/database.js'

dotenv.config(
    {
        path: './.env'
    }
)

databaseConnection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server is running on port ", process.env.PORT)
        })
    })
    .catch(err => {
        console.log(err)
    })
