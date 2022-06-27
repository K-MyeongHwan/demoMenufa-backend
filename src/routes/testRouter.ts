import express, { Router } from "express";
import { test } from "../controllers/test";

const router: Router = express.Router()

router.use('/', test)

export default router