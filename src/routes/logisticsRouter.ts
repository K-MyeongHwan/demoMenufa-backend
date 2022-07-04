import express, { Router } from "express";

import {
  createLogistics,
  logisticsList,
  logisticsListByArea,
} from "../controllers/logistics";

const router: Router = express.Router();

router.get("/", logisticsList);
router.get("/logisticsCenter", logisticsListByArea);
router.post("/", createLogistics);

export default router;
