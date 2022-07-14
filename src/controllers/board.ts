/**
 * TABLE    : salesforce.board__c, salesforce.boardcategory__c
 */

import { Request, Response } from "express";
import { db } from "../db";

export const boardCategoryList = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      `select id, sfid, name from salesforce.boardcategory__c order by id asc`
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};

export const boardList = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      `select id, sfid, name from salesforce.board__c order by id asc`
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};

export const createBoard = async (req: Request, res: Response) => {
  const { name } = req.body as unknown as Record<string, string>;
  try {
    const client = await db.connect();
    const result = await client.query(
      `insert into salesforce.board__c
            (name)
            values
            ('${name}')`
    );
    res.status(200).send({ message: "success" });
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  const { id, name } = req.query;

  try {
    const client = await db.connect();
    const result = await client.query(
      `update salesforce.board__c
             set name = '${name}'
             where id = '${id}'`
    );
    res.status(200).send({ message: "success" });
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
    console.log(error);
  }
};

export const getBoardById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const client = await db.connect();
    const result = await client.query(
      `select id, sfid, name from salesforce.board__c where sfid = '${id}' limit 1`
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
    console.log(error);
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const client = await db.connect();
    const result = await client.query(
      `delete from salesforce.board__c where id = ${id}`
    );
    res.status(200).send({ message: "success" });
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
    console.log(error);
  }
};
