import  mongoose  from "mongoose";
import  bcrypt from 'bcryptjs'
const userSchama = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type : String , required: true , unique : true},
    password: {type: String , required: true},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profile: String
})

// making hassh password
   
userSchama.pre('save', async function (next) {
    //  password is not change,
    if(!this.isModified('password')) {
        return next()
    }

    // create passwod hash
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
})

// compare password with hassh 

userSchama.methods.comparePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword ,this.password )
}


const User = mongoose.model('User', userSchama)

export default User