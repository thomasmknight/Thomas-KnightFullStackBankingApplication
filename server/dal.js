//Data Abstraction
import mongoose from "mongoose";
const { Schema } = mongoose;

// const userSchema = Mongoose.Schema({
  const userSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
   },
   balance: {
    type: String,
    required: true
   }
  // savingsBalance: {
  //   type: Number,
  //   required: true 
  // },
  // checkingBalance: {
  //   type: Number,
  //   required: true
  // },
  // savingsID: {
  //   type: String,
  //   required: true
  // },
  // checkingID: {
  //   type: String,
  //   required: true
  // }
 }, {timestamps: true});

 export const User = mongoose.model('User', userSchema);
//  module.exports = mongoose.model('User', userSchema);
 async function create(uid, name, email, password){
  try {
    const newUser = await User.create({
      _id: uid,
      name: name,
      email:  email,
      password: password,
      balance: 0
      // savingsBalance: 0,
      // checkingBalance: 0,
      // savingsID: Math.floor(Math.random()*10000),
      // checkingID: Math.floor(Math.random()*10000)
      //prefix with uid?
    });
    return newUser;
  } catch (error) {
  throw error;
}
};

async function deposit(balance, amount, uid) {
  try {
    let sum = Number(balance) + Number(amount);
    let newUser = User.findByIdAndUpdate( uid, { balance: sum } );
    return newUser;
  } 
  catch (error) {
    throw error;
  }
};

async function withdraw(balance, amount, uid) {
  try {
    let sum = Number(balance) - Number(amount);
    let newUser = User.findByIdAndUpdate( uid, { savingsBalance: sum } );
    return newUser;
  } 
  catch (error) {
    throw error;
  }
};

async function transfer(senderBalance, senderID, receiverBalance, receiverID, amount) {
  try{
    await withdraw(senderBalance, amount, senderID);
    await deposit(receiverBalance, amount, receiverID);

  }
  catch(error) {
    throw error;
  }
};

async function all() {
    try {
      const allUsers = await User.find({});
      return allUsers;
    } 
    catch (error) {
      throw error;
    }
  };

  async function find(uid){
    try {
      const foundUser = await User.findById({_id: uid});
      return foundUser;
    } 
    catch (error) {
      throw error;
    }
  };

export { create, deposit, withdraw, transfer, find, all };
