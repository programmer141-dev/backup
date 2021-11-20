import express from 'express'
import userModel from '../models/user.js'
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'
import bcrypt from 'bcrypt'


const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: "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"
  }
}))

export const NewPassword = async (req, res) => {
  const {
    password,
    recoveryToken
  } = req.body;

  await userModel.findOne({
    recoveryToken
  })
  .then((user) => {
    if (!user) {
      res.status(404).json({
        err: 'your link is expired'
      })

    } else {
      bcrypt.hash(password,
        10)
      .then((hash) => {
        user.password = hash
        user.recoveryToken = undefined
        user.tokenExpire = undefined
        user.save(() => res.status(201).json({
          msg: 'Password Updated'
        }))
      })
    }
  })

}