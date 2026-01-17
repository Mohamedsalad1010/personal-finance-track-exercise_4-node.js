import express from 'express'
import {protectRoute} from '../middlewares/protectedRoute.js'
import { fileUploads } from '../controllers/uploads.js'
import { updload } from '../middlewares/updloads.js'
const router = express.Router()

 router.post('/profile', protectRoute , updload.single('file') , fileUploads )
export default router