/**
 * TABLE    : salesforce.article__c
 */

import { Request, Response } from "express";
import { db } from "../db";

/**
 * GET
 * 게시글 리스트 출력
 */
export const articleList = async (req: Request, res: Response) => {
  const { boardId } = req.query as unknown as Record<string, string>;
  try {
    const client = await db.connect();
    const result = await client.query(
      `select id, sfid, name, category__c from salesforce.article__c ${searchBoard(
        boardId
      )} order by id asc`
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
 * GET
 * 게시글 가져오기
 */
export const article = async (req: Request, res: Response) => {
  const { id } = req.query as unknown as Record<string, string>;
  try {
    const client = await db.connect();
    const result = await client.query(
      `select id, sfid, name, contents__c, createddate, createdbyid from salesforce.article__c where id = '${id}' limit 1`
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
 * GET
 * 첨부파일 가져오기
 */
export const getFiles = async (req: Request, res: Response) => {
  const { sfid } = req.query as unknown as Record<string, string>;
  try {
    const client = await db.connect();
    const result = await client.query(
      `select id, sfid, name, url__c from salesforce.files__c where article__c = '${sfid}'`
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
  const { id, name, category, content, createdById } =
    req.body as unknown as Record<string, string>;
  try {
    const client = await db.connect();
    await client.query(
      id
        ? name
          ? update(id, name, category, content)
          : del(id)
        : add(name, category, content, createdById)
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
const update = (
  id: string,
  name: string,
  category__c: string,
  content__c: string
) => {
  return `update salesforce.article__c set name = '${name}', contents__c = '${content__c}' where id = '${id}'`;
};

/**
 * 게시글 추가
 * @param name 게시글 이름
 * @param category__c 게시판
 * @param content__c 내용
 * @param createdById 작성자
 * @returns query string
 */
const add = (
  name: string,
  category__c: string,
  content__c: string,
  createdById: string
) => {
  return `insert into salesforce.article__c
  (name, category__c, contents__c, createdById )
  values
  ('${name}', '${category__c}', '${content__c}', '${createdById}')`;
};

const del = (id: any) => {
  if (!id) throw new Error("No Id is specified");
  return `delete from salesforce.article__c where id = '${id}'`;
};

const searchBoard = (id: string): string => {
  return id ? `where category__c = '${id}'` : "";
};
