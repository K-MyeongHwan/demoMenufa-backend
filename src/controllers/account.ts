/**
 * TABLE    : salesforce.account3__c
 */

import { Request, Response } from "express";
import { db } from "../db";

/**
 * GET
 * 모든 계정 출력
 */
export const getAccounts = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      "select sfid, id, name, type__c, phone__c, address__c from salesforce.account3__c order by id asc"
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.status(400).send({
      message: 'Bad Request',
    });
  }
};

/**
 * POST
 * 계정 추가
 * name, type__c, phone__c, address__c
 */
export const createAccount = async (req: Request, res: Response) => {
  const { name, type__c, phone__c, address__c } = req.body;
  console.log(name, type__c, phone__c, address__c);
  try {
    if(!name || !type__c || !phone__c || !address__c) {
      throw new Error("no specified");
    } 

    const client = await db.connect();
    const result = await client.query(
      `insert into salesforce.account3__c ( name, type__c, phone__c, address__c ) values ('${name}', '${type__c}', '${phone__c}', '${address__c}')`
    );
    client.release();
    return res.status(200).send({ message: "OK" });
  } catch (error) {
    return res.status(400).send({
      message: 'Bad Request',
    });
  }
};

/**
 * PATCH
 * 계정 수정
 */
 export const updateAccount = async (req: Request, res: Response) => {
  const { id, name, type__c, phone__c, address__c } = req.body;
  console.log(id, name, type__c, phone__c, address__c);
  try {
    if(!id || !name || !type__c || !phone__c || !address__c) {
      throw new Error("no specified");
    } 

    const client = await db.connect();
    const result = await client.query(
      `update salesforce.account3__c set name = '${name}', type__c = '${type__c}', phone__c = '${phone__c}', address__c = '${address__c}' where id = ${id}`
    );
    client.release();
    console.log(result);
    return res.status(200).send({ message: "OK" });
  } catch (error) {
    return res.status(400).send({
      message: 'Bad Request',
    });
  }
};

/**
 * DELETE
 * 게정 삭제
 */
 export const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log(id);
  try {
    if(!id) {
      throw new Error("no specified");
    } 

    const client = await db.connect();
    const result = await client.query(
      `delete from salesforce.account3__c where id = '${id}'`
    );
    client.release();
    console.log(result);
    return res.status(200).send({ message: "OK" });
  } catch (error) {
    return res.status(400).send({
      message: 'Bad Request',
    });
  }
};
