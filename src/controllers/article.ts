/**
 * TABLE    : salesforce.article__c
 */

import { Request, Response } from "express";
import { db } from "../db";

/**
 * GET
 * 모든 게시글 리스트 출력
 */
export const articleList = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      "select id, name, category__c, contents__c from salesforce.article__c order by id asc"
    );
    res.status(200).json(result.rows);
    client.release();
  } catch (error) {
    res.status(400).send({
      message: "Bad Request",
    });
  }
};

/**
 * POST
 * 게시글 추가 및 수정
 * 요청 쿼리에 id가 존재할 시 update, 존재하지 않으면 add
 */
export const articleManipulator = async (req: Request, res: Response) => {
  const { id, name, category, content } = req.body;
  try {
    const client = await db.connect();
    const result = await client.query(
      id
        ? name
          ? update(id, name, category, content)
          : del(id)
        : add(name, category, content)
    );
    client.release();
    return res.status(200).send({ message: "OK" });
  } catch (error) {
    return res.status(400).send({
      message: "Bad Request",
      error: error,
    });
  }
};

/**
 * 게시글 수정
 * @param id 게시글 id
 * @param name 게시글 이름
 * @param category__c 게시판
 * @param content__c 내용
 * @returns query string
 */
const update = (id: any, name: any, category__c: any, content__c: any) => {
  if ([null, undefined].includes(id))
    throw new Error("Article Id is not specified");

  return `update salesforce.article__c set name = '${name}', category__c = '${category__c}', contents__c = '${content__c}' where id = '${id}'`;
};

/**
 * 게시글 추가
 * @param name 게시글 이름
 * @param category__c 게시판
 * @param content__c 내용
 * @returns query string
 */
const add = (name: any, category__c: any, content__c: any) => {
  return `insert into salesforce.article__c (name, category__c, contents__c ) values ('${name}', '${category__c}', '${content__c}')`;
};

const del = (id: any) => {
  if (!id) throw new Error("No Id is specified");
  return `delete from salesforce.article__c where id = '${id}'`;
};
