const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Book = require('../models/bookModel')
const Lending = require('../models/lendingModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Login function
login_function = asyncHandler(async(args) => {
    console.log('Login function called');
    var email = args.email;
    var password = args.password;
  
    const user = await User.findOne({ email })
  
    if (user.token == "") {
      await User.findByIdAndUpdate(user._id, { token: generateToken(user._id) }, { new: true })
    }
  
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        result: "Success! Your token is: " + user.token
      }
    } else {
      return {
        result: "Invalid credentials"
      }
    }
  })
  
  // Register function
  register_function = asyncHandler(async(args) => {
    var name = args.name;
    var email = args.email;
    var password = args.password
  
    if (!name || !email || !password) {
      return {
        result: "Your missing some parameters"
      }
    }
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      return {
        result: "User already exists"
      }
    }
  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
  
    const token = generateToken(user._id)
    await User.findByIdAndUpdate(user._id, { token: token }, { new: true })
  
    if (user && token) {
      return {
        result: "Success! Your token is: " + token
      }
    } else {
      return {
        result: "Invalid user data"
      }
    }
  })
  
  // Logout function
  logout_function = asyncHandler(async(args) => {
    try {
  
      var token = args.token;
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
      user = await User.findByIdAndUpdate(decoded.id, { token: "" }, { new: true })
  
      return {
        result: "Successfully logged out"
      }
    } catch (error) {
  
      return {
        result: "Cant't logout"
      }
    }
  })
  
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1d'})
  }

  module.exports = {
    login_function,
    register_function,
    logout_function
}