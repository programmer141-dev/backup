import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
import {
  userRoutes
} from './routes/user.js'
import {
  signinRoutes
} from './routes/signin.js'
import {
  RecoverRoutes
} from './routes/recoverpass.js'
import {
  newPassRoutes
} from './routes/newpassword.js'
import authMiddleware from './middleware/userAuthMiddleware.js'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use('/signup', userRoutes)
app.use('/signin', signinRoutes)
app.use('/emailRecovery', RecoverRoutes)
app.use('/newpass', newPassRoutes)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
})
.then(() => {
  app.listen(PORT, () => console.log(`server started on port ${PORT}`))
})
.catch(err => console.log(err))