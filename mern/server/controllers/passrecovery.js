import express from 'express'
import crypto from 'crypto'
import userModel from '../models/user.js'
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: "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"
  }
}))

export const revoveryPass = (req, res) => {
  const {
    email
  } = req.body;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) console.log(err)
    const token = buffer.toString("hex")
    userModel.findOne({
      email
    })
    .then((user) => {
      if (!user) res.status(404).json({
        msg: 'User with this email not found'
      })
      user.recoveryToken = token;
      user.tokenExpire = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: 'sidhardhchandra141@gmail.com',
          subject: 'Password reset',
          html: `
          <p>Hi this is blabla.com here is your recovery link</p>
          <h5>click on this link to reset your password <a href=http://localhost:3000/reset/${token}>localhost:3000/reset/${token}</a></h5>
          `
        })
      })
    })
  })
}