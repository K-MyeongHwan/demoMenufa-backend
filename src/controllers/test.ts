import express, { Request, Response } from "express";

export const test = async (req: Request, res: Response) => {
  req.client!.connect()

  const result = await req.client!.query('select id, firstname, lastname from salesforce.contact')
  res.json(result.rows)

  req.client!.end()
}