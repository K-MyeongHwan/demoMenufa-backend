import express, { Request, Response } from "express";
import cors from "cors";

// Routes
import accountRouter from "./routes/accountRouter";

//middlewares
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
  res.send("demomenufa-backend")
);
app.use("/account", accountRouter);

// Global Error handler
// ! THIS MUST BE AT THE END OF ROUTE SETTINGS
app.use(errorHandler);

// Listener
app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
