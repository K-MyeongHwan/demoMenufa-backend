import express, { Router } from "express";
import { areaManipulator, area } from "../controllers/area";

const router: Router = express.Router();

router.get("/", area);
router.post("/", areaManipulator);

export default router;
