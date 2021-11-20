import express from 'express'
export const RecoverRoutes = express.Router()
import {
  revoveryPass
} from '../controllers/passrecovery.js'

RecoverRoutes.post('/', revoveryPass)