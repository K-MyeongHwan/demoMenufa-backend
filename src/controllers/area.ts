/**
 * TABLE    : salesforce.area__c
 */

import { Request, Response } from "express";
import { db } from "../db";

/**
 * GET
 * 모든 지역 리스트 출력
 */
export const area = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      "select sfid, id, name from salesforce.area__c order by id asc"
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.status(400).send({
      message: "Bad Request",
    });
  }
};

/**
 * POST
 * 지역 추가 및 수정
 * 요청 쿼리에 id가 존재할 시 update, 존재하지 않으면 add
 */
export const areaManipulator = async (req: Request, res: Response) => {
  const { id, name } = req.body;
  try {
    const client = await db.connect();
    const result = await client.query(
      id ? (name ? update(id, name) : del(id)) : add(name)
    );
    client.release();
    return res.status(200).send({ message: "OK" });
  } catch (error) {
    return res.status(400).send({
      message: "Bad Request",
    });
  }
};

/**
 * 지역 수정
 * @param id 지역 id
 * @param name 새 지역 이름
 * @returns query string
 */
const update = (id: any, name: any) => {
  if ([null, undefined].includes(id))
    throw new Error("Area Id is not specified");

  return `update salesforce.area__c set name = '${name}' where id = '${id}'`;
};

/**
 * 새 지역 추가
 * @param name 지역 이름
 * @returns query string
 */
const add = (name: any) => {
  return `insert into salesforce.area__c (name) values ('${name}')`;
};

const del = (id: any) => {
  if (!id) throw new Error("No Id is specified");
  return `delete from salesforce.area__c where id = '${id}'`;
};
