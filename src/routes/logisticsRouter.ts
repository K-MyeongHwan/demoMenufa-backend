import express, { Router } from "express";
import { createLogistics, logisticsList } from "../controllers/logistics";

const router: Router = express.Router();

router.get("/", logisticsList);
router.post("/", createLogistics);

export default router;
