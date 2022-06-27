/**
 * TABLE    : salesforce.area__c
 */

import { Request, Response } from "express";
import { db } from "../db";

export const area = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      "select id, name from salesforce.area__c order by id asc"
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};

export const areaManipulator = async (req: Request, res: Response) => {
  const { id, name } = req.query;

  try {
    const client = await db.connect();
    const result = await client.query(id ? update(id, name) : add(name));
    client.release();
    res.status(200);
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};

const update = (id: any, name: any) => {
  return `update salesforce.area__c set name = '${name}' where id = '${id}'`;
};

const add = (name: any) => {
  return `insert into salesforce.area__c (name) values ('${name}')`;
};
