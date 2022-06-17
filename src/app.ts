import express, { Request, Response, NextFunction } from "express"
import { Client } from "pg";

const app = express();

const client = new Client()

app.get('/', (request, response) => {
  client.connect()
  client.query('SELECT firstname from contact', (err, res) => {
    console.log(err ? err.stack : response.send(res.rows[0]))
    client.end()
  })
})

app.listen(3000, () => {
  console.log('server started')
})