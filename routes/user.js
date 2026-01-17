import express  from 'express'
import { deleteUser, getUsers, logInUser, registerUser, updateUser } from '../controllers/user.js'
import { valitorUserSchemas } from '../middlewares/validator.js'
import { createuserSchemas } from '../schemas/user.js'
import { protectRoute } from '../middlewares/protectedRoute.js'
const router = express.Router()

// user routes
/**
 * @swagger
 * /users:
 *   get:
 *     summary:  Get all users for the logged-in user
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *        description: all users
 */
router.get('/', protectRoute , getUsers)
/** 
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string              
 *               profile:
 *                  type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/', valitorUserSchemas(createuserSchemas), registerUser)

/** 
 * @swagger
 * /users/login:
 *   post:
 *     summary: create login user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string              
 
 *     responses:
 *       201:
 *         description: logged user created
 */
router.post('/login' , protectRoute ,  logInUser)


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: user ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                   type: string
 *               profile: 
 *                   type: string
 *     responses:
 *       200:
 *         description: user updated
 */
router.put('/:id' , protectRoute ,  updateUser)


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
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
 *         description: user was  deleted
 */
router.delete('/:id' , protectRoute ,  deleteUser)

// profile sample

router.get("/profile", protectRoute  , (req , res) => {
    const user = req.user
    res.json({
        userInfo: {
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
})


export default router