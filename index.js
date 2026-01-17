import  express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'

import { errorHandller } from './middlewares/errorHandling.js'
import { notFound } from './middlewares/notFound.js'

import userRoutes from './routes/user.js'
import TransactionsRoute from './routes/transactions.js'
import uploadRoute from './routes/upload.js'

import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './utils/swagger.js'
import { limiter } from './middlewares/rateLimitter.js'
dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())

app.use(helmet())
app.use(limiter)
// uses swagger

app.use('/docs', swaggerUi.serve , swaggerUi.setup(swaggerSpec))
// uses routes 
app.use('/users' , userRoutes)
app.use('/transactions' , TransactionsRoute)
app.use('/uploads', uploadRoute)

// use errors handles
// not found error handle
app.use(notFound)

// global error handle
app.use(errorHandller)
mongoose.connect( process.env.NODE_DEV == 'development' ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI_PRO)
.then(() => console.log('✅connected mongodb locally!'))
.catch((err) => console.log('❌No connected mongodb locally!'))

app.listen(PORT , () => {
    console.log(`server is running on ${PORT}`)
})
