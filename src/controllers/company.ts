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

// Add company
export const addCompany = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const client = await db.connect();
    await client.query(
      `insert into salesforce.company__c (name) values ('${name}')`
    );
    client.release();
    res.status(200).send({ message: "OK" });
  } catch (error) {
    res.status(400).send(["Something went wrong", error]);
  }
};

// Update company
export const updateCompany = async (req: Request, res: Response) => {
  const { id, name } = req.query;
  try {
    const client = await db.connect();
    await client.query(
      `update salesforce.company__c set name = '${name}' where id = '${id}'`
    );
    client.release();
    res.status(200).send({ message: "OK" });
  } catch (error) {
    res.status(400).send(["Something went wrong", error]);
  }
};

// Delete company
export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const client = await db.connect();
    await client.query(`delete from salesforce.company__c where id = '${id}'`);
    client.release();
    res.status(200).send({ message: "OK" });
  } catch (error) {
    res.status(400).send(["Something went wrong", error]);
  }
};
