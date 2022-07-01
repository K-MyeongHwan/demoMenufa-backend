/**
 * TABLE    : salesforce.logistics__c
 */

import { Request, Response } from "express";
import { db } from "../db";

export const logisticsList = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      "select id, name, address__c, location__c from salesforce.logistics__c order by id asc"
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};

export const createLogistics = async (req: Request, res: Response) => {
  try {
    const { name, address, location } = req.query;
    const client = await db.connect();
    await client.query(
      `insert into salesforce.logistics__c
      (name, address__c, location__c)
      values
      ('${name}', '${address}', '${location}')`
    );
    client.release();
    res.status(200).send({ message: "OK" });
  } catch (err) {
    res.status(400).send(["Bad Request", err]);
  }
};
