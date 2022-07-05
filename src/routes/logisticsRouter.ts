import express, { Router } from "express";

import {
  createLogistics,
  deleteLogistics,
  logisticsList,
  logisticsListByArea,
  updateLogistics,
} from "../controllers/logistics";

const router: Router = express.Router();

router.get("/", logisticsList);
router.get("/logisticsCenter", logisticsListByArea);
router.post("/", createLogistics);
router.patch("/", updateLogistics);
router.delete("/", deleteLogistics);

export default router;
