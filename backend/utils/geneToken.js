import jwt from 'jsonwebtoken'


export const  geneWebToken  = (userId) => {
    return jwt.sign({id: userId }, process.env.JWT_SECRET , {expiresIn: '3d'})
}