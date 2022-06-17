import express, { Request, Response, NextFunction } from "express"
import { Client } from "pg";

const port = process.env.PORT || 3000

const app = express();

const client = new Client()

app.get('/test', (request: Request, response: Response, next: NextFunction) => {
  client.connect()
  client.query('SELECT firstname from contact', (err, res) => {
    err ? console.log(err.stack) : response.send(res.rows[0])
    client.end()
  })
})

app.listen(port, () => {
  console.log('server started')
})