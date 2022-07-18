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
    // const result = await client.query(
    //   `select id, sfid, name, category__c from salesforce.article__c ${searchBoard(
    //     boardId
    //   )} order by id asc`
    // );
    // res.status(200).json(result.rows);
    client.release();
  } catch (error) {
    res.status(400).send({
      message: "Bad Request",
    });
  }
};

/**
 * POST
 * 이미지 업로드
 */
export const uploadFiles = async (req: Request, res: Response) => {
  const { boardId } = req.query as unknown as Record<string, string>;
  try {
    const client = await db.connect();
    const result = await client.query(``);
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
 * 이미지 업로드
 */
