import express, { Router } from "express";
import { modifyArea, area } from "../controllers/area";

const router: Router = express.Router();

router.get("/", area);
router.post("/", modifyArea);

export default router;
