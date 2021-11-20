import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();




export const signInUser = (req, res) => {

  //collect the req data
  const {
    name,
    password
  } = req.body;

  //fetch the data with the given username
  const user = userModel.findOne({
    name
  },
    function(err, user) {
      //compare the password with the hash in the DB
      bcrypt.compare(
        password,
        user.password,
        function(err, result) {
          if (result) {
            const accessToken = jwt.sign({
              name
            },
              process.env.ACCESS_TOKEN_SECRETKEY)
            res.status(200).json({
              accessToken: accessToken
            })
          } else {
            res.status(400).json({
              msg: 'Invalid Credintials'
            })
          }
        });
    })

}