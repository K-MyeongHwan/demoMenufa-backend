/**
 * TABLE    : salesforce.chatRoom__c
 */

import { Request, Response } from "express";
import { db } from "../db";
import axios from "axios";

export const getChatRoomList = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      "select id, name from salesforce.ChatRoom__c order by id asc"
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};

export const saveMessage = async (req: Request, res: Response) => {
  const { roomId, content } = req.body as unknown as Record<string, string>;
  const messageInfo = [roomId, content];
  const messageInfo_ = messageInfo.map((el) => `'${el}'`).join(", ");

  if (messageInfo.includes("")) {
    res.status(500).send("Missing parameter");
  }
  try {
    const client = await db.connect();
    const chat = await client.query(
      `insert into salesforce.ChatMessage__c (ChatRoom__c, Content__c) values (${messageInfo_})`
    );
    client.release();
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};

export const getChatmessageList = async (req: Request, res: Response) => {
  const { roomId } = req.body as unknown as Record<string, string>;
  try {
    const client = await db.connect();
    const result = await client.query(
      `select Id, Content__c, CreateDate__c from salesforce.ChatMessage__c where ChatRoom__c = '${roomId}'`
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};

export const following = async (req: Request, res: Response) => {
  const { id } = req.query;
  console.log(id);
  try {
    const client = await db.connect();
    const result = await axios.get(
      `https://cs114.force.com/services/data/v55.0/chatter/users/${id}/following`
    );
    console.log(result.data.following);
    res.status(200).json(result.data.following);
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};
