import express, { Request, Response, NextFunction } from "express"
import { Client } from "pg"
import dotenv from "dotenv";

const port = process.env.PORT || 3000
dotenv.config();

const app = express();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

app.get('/test', (request: Request, response: Response, next: NextFunction) => {
  let result
  client.connect()
  client.query('select firstname from salesforce.contact', (err, res) => {
    if (err) {
      response.json({
        message: err.message,
        cause: err.cause
      })
    } else {
      result = res
      response.json(result)
    }
  })
  client.end()

})

app.get('/', (request: Request, response: Response, next: NextFunction) => {
  response.send('Go to /test for salesforce query test')
})

app.listen(port, () => {
  console.log('server started')
})