/**
 * TABLE    : salesforce.logistics__c
 */

import { Request, response, Response } from "express";
import { db } from "../db";

/**
 * GET
 * 모든 물류센터 표시
 */
export const logisticsList = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const result = await client.query(
      "select id, sfid, name, address__c, location__c, locationName__c from salesforce.logistics__c order by id asc"
    );
    res.json(result.rows);
    client.release();
  } catch (error) {
    res.send(["Something went wrong", error]);
  }
};

/**
 * GET
 * 물류센터 표시
 */
export const getLogistics = async (req: Request, res: Response) => {
  const { id } = req.query as unknown as Record<string, string>;
  const client = await db.connect();
  try {
    const result = await client.query(
      `select id, sfid, name, address__c, location__c, locationName__c from salesforce.logistics__c where id = '${id}'`
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.send(["Something went wrong", error]);
  } finally {
    client.release();
  }
};

/**
 * POST
 * 새 물류센터 생성
 */
export const createLogistics = async (req: Request, res: Response) => {
  try {
    const { name, address, location } = req.body;
    const client = await db.connect();
    await client.query(
      `insert into salesforce.logistics__c
      (name, address__c, location__c)
      values
      ('${name}', '${address}', '${location}')`
    );
    client.release();
    res.status(200).send({ message: "OK" });
  } catch (err) {
    res.status(400).send(["Bad Request", err]);
  }
};

/**
 * PATCH
 * 물류센터 수정
 */
export const updateLogistics = async (req: Request, res: Response) => {
  const { id, name, address, location } = req.query as unknown as Record<
    string,
    string
  >;

  try {
    const client = await db.connect();

    await client.query(
      `update salesforce.logistics__c set name = '${name}', address__c = '${address}', location__c = '${location}'  where id = '${id}'`
    );
    client.release();
    res.status(200).send({ message: "OK" });
  } catch (err) {
    res.status(400).send(["Bad Request", err]);
  }
};

/**
 * DELETE
 * 물류센터 삭제
 */
export const deleteLogistics = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const client = await db.connect();
    await client.query(
      `delete from salesforce.logistics__c where id = '${id}'`
    );
    client.release();
    res.status(200).send({ message: "OK" });
  } catch (err) {
    res.status(400).send(["Bad Request", err]);
  }
};

/**
 * GET
 * 선택한 지역의 물류센터 표시
 */
export const logisticsListByArea = async (req: Request, res: Response) => {
  try {
    const areaName = req.body.areaName;
    if (areaName == undefined) throw new Error("Area is not specified");

    const client = await db.connect();

    const designatedAreaSFID = await client.query(
      `select id, sfid, name from salesforce.area__c where name = '${areaName}'`
    );
    if (designatedAreaSFID.rows.length < 1) throw new Error("No such area");

    const areas = await client.query(`
    select
      locationName__c,
      id,
      name,
      address__c,
      location__c
    from
      salesforce.logistics__c
    where
      location__c = '${designatedAreaSFID.rows[0].sfid}'
    `);
    res.status(200).send(areas.rows);
    client.release();
  } catch (error) {
    res.status(400).send(["Bad Request", error]);
  }
};

/**
 * GET
 * Get contracted logistics of a company
 */
export const contractedLogistics = async (req: Request, res: Response) => {
  const { sfid } = req.query as unknown as Record<string, string>;
  const client = await db.connect();

  try {
    const _contracts = await client.query(
      `select center__c from salesforce.assignedcenter__c where company__c = '${sfid}'`
    );
    const centerIdArray = _contracts.rows.map((el) => el.center__c);
    const idQueryString = `('${centerIdArray.join("', '")}')`;
    const centers = await client.query(
      `select id, sfid, name from salesforce.logistics__c where sfid in ${idQueryString}`
    );
    res.status(200).send(centers.rows);
  } catch (error) {
    res.status(400).send(["Bad Request", error]);
  } finally {
    client.release();
  }
};

/**
 * GET
 * Get contracted companies of a logistics
 */
export const contractedCompany = async (req: Request, res: Response) => {
  const { sfid } = req.query as unknown as Record<string, string>;
  const client = await db.connect();

  try {
    const _contracts = await client.query(
      `select company__c from salesforce.assignedcenter__c where center__c = '${sfid}'`
    );
    const companyIdArray = _contracts.rows.map((el) => el.company__c);
    const idQueryString = `('${companyIdArray.join("', '")}')`;
    const companies = await client.query(
      `select id, sfid, name from salesforce.company__c where sfid in ${idQueryString}`
    );
    res.status(200).send(companies.rows);
  } catch (error) {
    res.status(400).send(["Bad Request", error]);
  } finally {
    client.release();
  }
};
