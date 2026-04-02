import Transactions from "../models/Transactions.js";
import mongoose from "mongoose";
// create transection
export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transactions.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ message: "successFully created", transaction });
  } catch (error) {
    next(error);
  }
};

export const getTransections = async (req, res, next) => {
  try {
    const transactions = await Transactions.find({ createdBy: req.user?._id });
    if(transactions.length === 0) return res.status(404).json({message: 'not found transactions make it please'})
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// update transection

export const updateTransection = async (req, res, next) => {
  try {
    const updateTran = await Transactions.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!updateTran)
      return res.status(404).json({ message: "not found transection" });
    res.json(updateTran);
  } catch (error) {
    next(error);
  }
};

// delete transections
export const deleteTransection = async (req, res, next) => {
  try {
    const deleteTran = await Transactions.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!deleteTran)
      return res.status(404).json({ message: "not found transection" });
    res.json(` transection id: ${req.params.id} was deleted`);
  } catch (error) {
    next(error);
  }
};

// get Month summary



// get category

export const getCategory = async (req , res , next) => {
  try {
    const category = await Transactions.distinct( 'category',  {createdBy: req.user._id})
    
    if(!category) return res.status(404).json('Not Found category.')
      res.status(200).json({
    count: category.length, category})
  } catch (error) {
    next(error)
  }
}

