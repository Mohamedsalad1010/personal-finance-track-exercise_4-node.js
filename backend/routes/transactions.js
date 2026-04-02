import express  from 'express'
const router = express.Router()
 import { createTransaction, deleteTransection, getCategory,  getTransections, updateTransection } from '../controllers/Transactions.js'
import { protectRoute } from '../middlewares/protectedRoute.js'


/**
 * @swagger
 * /transactions:
 *   get:
 *     summary:  Get all transactions for the logged-in user
 *     tags: [Transactions]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *        description: all transactions
 */
 router.get('/', protectRoute , getTransections)
/** 
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: Number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                  type: Date
 *     responses:
 *       201:
 *         description: Task created
 */

 router.post('/', protectRoute , createTransaction)

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a Transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: Number
 *               type:
 *                 type: string
 *               category:
 *                   type: string
 *               date: 
 *                   type: Date
 *     responses:
 *       200:
 *         description: transaction updated
 */
 router.put('/:id', protectRoute , updateTransection)

 /**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a Transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *        
 *     responses:
 *       200:
 *         description: transaction deleted
 */
 router.delete('/:id', protectRoute , deleteTransection)
 router.get('/categories', protectRoute , getCategory)


export default router