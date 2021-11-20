import express from 'express'
export const newPassRoutes = express.Router()
import {
  NewPassword
} from '../controllers/newpassword.js'

newPassRoutes.post('/', NewPassword)