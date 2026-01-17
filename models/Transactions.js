import mongoose from "mongoose";
import { date } from "zod";


export const transactionsSchema = new mongoose.Schema({
    title: {type: String , trim: true, required: true},
    amount: {type: Number , required: true},
    type: {
        type: String ,
        enum: ['income', 'expense'],
        required: true},
    category: {type: String , required: true},
    createdBy: { type: mongoose.Schema.Types.ObjectId , ref: 'user' , required: true},
    date: Date
}, {timestamps: true})



export default   mongoose.model('Transactions', transactionsSchema)