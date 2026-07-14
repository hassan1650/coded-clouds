import express from 'express'
import adminRouter from '../router/admin.js'
const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))



app.use('/api/v1/admin', adminRouter)










export default app

