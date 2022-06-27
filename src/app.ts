import express, { Request, Response } from "express"

// Routes
import testRouter from "./routes/testRouter";
import userRouter from "./routes/userRouter"

// Middlewares
import {useClient} from './middlewares/useClient'

// Environment variable setup
const port = process.env.PORT || 3000

// Express setup
const app = express();

// Routers

app.use('/', useClient)
app.get('/', (req: Request, res: Response) => res.send('Go to /test for salesforce query test'))
app.get('/test', testRouter)
app.get('/user', userRouter)

// app.get('/area', areaRouter)
// app.get('', areaRouter)

// Listener
app.listen(port, () => {
  console.log(`Server is now running on port ${port}`)
})