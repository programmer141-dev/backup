import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const createNewUser = async (req, res) => {

  //get the data from user
  const {
    name,
    email,
    password
  } = req.body;



  //salt for encryption
  const saltRounds = 10;

  //find the data with email
  await userModel.findOne({
    name
  })
  .then(user => {
    if (!user) {
      //hashing password with salt
      bcrypt.hash(password, saltRounds)
      .then(async (hash) => {
        try {
          const newUser = new userModel({
            name, email, password: hash
          })
          await newUser.save()
          res.status(201).json({
            msg: "created account successfully!!"
          })
        }
        catch {
          err => res.status(401).json({
            msg: err
          })
        }

      })
    } else {
      res.status(400).json({
        msg: "user already exists with this Username"
      })
    }
  })

}