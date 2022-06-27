import { Request, Response } from "express";
import { db } from "../db";

export const register = (req: Request, res: Response) => {
  res.send("Register page");
};

export const login = (req: Request, res: Response) => {
  res.send("Login page");
};

export const myInfo = async (req: Request, res: Response) => {
  const client = await db.connect();
  const info = client.query(
    "select id, firstname, lastname from salesforce.contact"
  );
  client.release();
};
