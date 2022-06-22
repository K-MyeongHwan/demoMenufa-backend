import express, { NextFunction, Request, Response } from "express"
import { Client } from "pg"
import dotenv from "dotenv";
import testRouter from "./router/testRouter";

// Environment variable setup
const port = process.env.PORT || 3000
dotenv.config();

// Node-Postgres client connection
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const useClient = (req: Request, res: Response, next: NextFunction) => {
  req.client = client
  next()
}

// Express setup
const app = express();

// Routers

app.use('/', useClient)
app.get('/', (req: Request, res: Response) => res.send('Go to /test for salesforce query test'))
app.get('/test', testRouter)

// Listener
app.listen(port, () => {
  console.log(`Server is now running on port ${port}`)
})