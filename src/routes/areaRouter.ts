import express, { Router } from "express";
import { addArea, area } from "../controllers/area";

const router: Router = express.Router()

router.get('/', area)
router.post('/', addArea)

export default router