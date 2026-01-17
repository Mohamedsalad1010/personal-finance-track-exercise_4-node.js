import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
export const protectRoute = async (req , res , next) => {
    const token = req.headers.authorization?.split(" ")[1]
    console.log('token', token)
    if(!token) {
        return res.status(404).json({message: 'not token provided.'})
    }

    try {
        const decode = jwt.verify(token , process.env.JWT_SECRET) 
        const user = await User.findById(decode.id).select('-password')
        req.user = user
        console.log('user', req.user)
        next()
    } catch (error) {
        res.status(401).json({message: 'invalid  or expired token'})
    }
}