import express, { Request, Response } from "express";
// import dotenv from "dotenv";
import cors from "cors";
// dotenv.config();

// Routes
import userRouter from "./routes/userRouter";
import areaRouter from "./routes/areaRouter";
import articleRouter from "./routes/articleRouter";
import chatRouter from "./routes/chatRouter";
import logisticsRouter from "./routes/logisticsRouter";
import companyRouter from "./routes/companyRouter";
import boardRouter from "./routes/boardRouter";

import { errorHandler } from "./middlewares/errorHandler";

// Environment variable setup
const port: number = Number(process.env.PORT) || 3030;

// Express setup
const app = express();

// Routers

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req: Request, res: Response) =>
  res.send("Go to /test for salesforce query test")
);
app.use("/user", userRouter);
app.use("/area", areaRouter);
app.use("/article", articleRouter);
app.use("/chat", chatRouter);
app.use("/logistics", logisticsRouter);
app.use("/company", companyRouter);
app.use("/board", boardRouter);

// Global Error handler
// ! THIS MUST BE AT THE END OF ROUTE SETTINGS
app.use(errorHandler);

// Listener
app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
