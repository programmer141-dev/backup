import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader.split(' ')[1]
  if (token == null) {
    res.sendStatus(401).json({
      err: 'Your login has expired please login again'
    })
  }
  jwt.verify(process.env.ACCESS_TOKEN_SECRETKEY, (err, user) => {
    if (err) return res.sendStatus(403)

    req.user = user
    next()
  })

}