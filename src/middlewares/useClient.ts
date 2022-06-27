import express, { NextFunction, Request, Response } from "express"
import { Client } from "pg"
import dotenv from "dotenv";

const port = process.env.PORT || 3000
dotenv.config();

// Node-Postgres client connection
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

export const useClient = (req: Request, res: Response, next: NextFunction) => {
  req.client = client
  next()
}