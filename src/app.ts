import express, { Request, Response } from "express";

// Routes
import userRouter from "./routes/userRouter";
import areaRouter from "./routes/areaRouter";
import { errorHandler } from "./middlewares/errorHandler";

// Environment variable setup
const port = process.env.PORT || 3000;

// Express setup
const app = express();

// Routers

app.get("/", (req: Request, res: Response) =>
  res.send("Go to /test for salesforce query test")
);
app.use("/user", userRouter);
app.use("/area", areaRouter);

app.use(errorHandler);

// app.get('/area', areaRouter)
// app.get('', areaRouter)

// Listener
app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
