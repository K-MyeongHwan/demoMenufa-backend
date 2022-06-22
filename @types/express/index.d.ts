import { Client } from "pg";
import { Request } from 'express'

// export type RouterCallback = (client: Client, ...args?) => {}

declare global {
  namespace Express {
    export interface Request {
      client?: Client
    }
  }
}