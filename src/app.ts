import express, { Request, Response, NextFunction } from "express"
import { Client } from "pg";

const port = process.env.PORT || 3000

const app = express();

const client = new Client()

app.get('/test', (request: Request, response: Response, next: NextFunction) => {
  // client.connect().then(() => {
  //   client.query('SELECT firstname from salesforce.contact', (err, res) => {
  //     err ? console.log(err.stack) : response.send(res.rows[0])
  //     client.end()
  //   })
  // })

  response.send('test')
})

app.listen(port, () => {
  console.log('server started')
})