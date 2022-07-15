import { Request, Response } from "express";
import { db } from "../db";

export const userList = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      "select id, sfid, lastname, firstname, name, email, username, alias, communityNickname, department from salesforce.user"
    );
    res.status(200).json(result.rows);
    client.release();
  } catch (error) {
    res.status(400).send({
      message: "Bad Request",
    });
  }
};

export const userSpecify = async (req: Request, res: Response) => {
  const { id } = req.query as unknown as Record<string, string>;
  try {
    const client = await db.connect();
    const result = await client.query(
      `select id, sfid, lastname, firstname, name, email, username, alias, communityNickname, department from salesforce.user where sfid = '${id}' limit 1`
    );
    res.status(200).json(result.rows);
    client.release();
  } catch (error) {
    res.status(400).send({
      message: "Bad Request",
    });
  }
};
