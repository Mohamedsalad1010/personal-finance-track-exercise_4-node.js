import User from '../models/user.js'
import { geneWebToken } from '../utils/geneToken.js'
import bcrypt from 'bcryptjs'

import Transactions from '../models/Transactions.js'

// register user
export const registerUser = async (req , res , next) => {
    let  {name , email , password , role , profile } = req.body
     try {
        email = email.toLowerCase()
        const existUser = await User.findOne({email})
        if(existUser) {
            return res.status(400).json({ message: 'user alread exist.'})
        }

        const   user = await User.create({name , email , password , role , profile })
        req.user
        const token = geneWebToken(user._id)
        res.json(token)
     } catch (error) {
        next(error)
     }
}


// login 

export const logInUser = async (req , res , next) => {
   let {email , password} = req.body

   try {
      email = email?.toLowerCase()
       const user = await User.findOne({email})
       console.log('user', user)
       if(!user || !( await user.comparePassword(password))){
          return res.status(401).json("invalid email or password")
       }

       const token = geneWebToken(user._id)
       res.json(token)
   } catch (error) {
      next(error)
   }
}

// get users 
export const getUsers = async (req , res , next) => {
   try {
      const users = await User.find()
      if(!users) res.status(404).json({message: 'Not found user'})

         res.json(users)
   } catch (error) {
      next(error)
   }
}
// update user 

export const updateUser = async (req , res , next) => {

   if (req.body.password) {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
}
    try {
      const update = await User.findByIdAndUpdate(req.params.id, req.body, {new: true } )
      if(!update) return res.status(404).json({message: 'Not found user'})
         res.status(200).json(update)
    } catch (error) {
      next(error)
    }
}

// delete User

export const deleteUser = async (req , res , next) => {
   const id = req.params.id
   try {

      await Transactions.deleteMany({createdBy: id})
      const deleteUser = await User.findByIdAndDelete(id)
       if(!deleteUser) return res.status(404).json({message: 'Not found user'})
         res.status(200).json(`user ID: ${req.params.id} was deleted`)
   } catch (error) {
      next(error)
   }
}