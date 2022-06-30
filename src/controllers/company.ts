/**
 * TABLE    : salesforce.company__c
 */

import { Request, Response } from "express";
import { db } from "../db";

export const companyList = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      "select id, name from salesforce.company__c order by id asc"
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};
