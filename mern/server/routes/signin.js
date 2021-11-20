import express from 'express'
export const signinRoutes = express.Router()
import Signin from '../controllers/signin.js'

signinRoutes.post('/', Signin)