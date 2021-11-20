import express from 'express'
export const userRoutes = express.Router()
import {
  createNewUser
} from '../controllers/signup.js'

userRoutes.post('/', createNewUser)