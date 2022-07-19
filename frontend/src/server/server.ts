import cookieParser from 'cookie-parser'
import session from 'cookie-session'
import cors from 'cors'
import express, { Application } from 'express'
import { resolve } from 'path'

// Express application
const app: Application = express()
const distDir = resolve('dist')
const staticDir = resolve('src', 'static')

// Middlewares
app.set('trust proxy', 1)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(cookieParser())
app.use(
  session({
    maxAge: 24 * 60 * 60 * 1000,
    secret: 'xxx'
  })
)
app.use(cookieParser('xxx'))
app.use(cors({ credentials: true, origin: true }))

// Static directories
app.use(express.static(distDir))
app.use(express.static(staticDir))

export default app
