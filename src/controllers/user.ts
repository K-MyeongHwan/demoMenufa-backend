import { Request, Response } from "express";
import { db } from "../db";
import { checkPassword, serializePassword } from "../services/auth";

export const register = async (req: Request, res: Response) => {
  const { id, name, email, profile, password } = req.query as unknown as Record<
    string,
    string
  >;
  const serialized = await serializePassword(password);
  const _userInfo = [
    id,
    name,
    email,
    profile,
    serialized.hashedPassword,
    serialized.salt,
  ];
  const _userInfoFormatted = _userInfo.map((el) => `'${el}'`).join(", ");

  if (_userInfo.includes("")) {
    res.status(400).send("Missing parameter");
  }

  const client = await db.connect();
  await client.query(`
    insert into salesforce.user__c
    (id__c, name__c, email__c, profile__c, password__c, salt__c)
    values
    (${_userInfoFormatted}) `);
  client.release();
  res.status(200).send({ message: "OK" });
};

export const login = async (req: Request, res: Response) => {
  const { id, password } = req.query as unknown as Record<string, string>;
  try {
    const client = await db.connect();
    const user = await client.query(
      `select id__c, password__c, salt__c from salesforce.user__c where id__c = '${id}'`
    );
    const _user = user.rows[0];
    (await checkPassword(_user.password__c, _user.salt__c, password))
      ? res.status(200).send("Login Success")
      : res.status(400).send("Password incorrect");

    client.release();
  } catch (error) {}
};

export const myInfo = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const info = client.query(
      "select id, name, email, profile from salesforce.user__c"
    );
    res.status(200).json(info);
    client.release();
  } catch (error) {
    res.status(400).send({
      message: "Bad Request",
    });
  }
};
