/**
 * TABLE    : salesforce.area__c
 */

import { Request, Response } from "express";
import { db } from "../db";

export const area = async (req: Request, res: Response) => {
  const client = await db.connect();
  client.on("error", (err) => {
    console.log(err);
  });
  const result = await client.query(
    "select id, name from salesforce.area__c order by id asc"
  );
  res.json(result.rows);
  client.release();
};

export const addArea = async (req: Request, res: Response) => {
  const { id, name } = req.query;
  const client = await db.connect();

  try {
    const result = await client.query(
      `update salesforce.area__c set name = '${name}' where id = '${id}'`
    );
    client.release();
    res.json(result);
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};
