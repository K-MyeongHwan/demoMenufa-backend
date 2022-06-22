import express, { Router } from "express";
import { test } from "../api/test";

const router: Router = express.Router()

router.use('/', test)

export default router