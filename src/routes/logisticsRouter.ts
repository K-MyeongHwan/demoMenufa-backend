import express, { Router } from "express";

import {
  contractedCompany,
  contractedLogistics,
  createLogistics,
  deleteLogistics,
  getLogistics,
  logisticsList,
  logisticsListByArea,
  updateLogistics,
} from "../controllers/logistics";

const router: Router = express.Router();

router.get("/", logisticsList);
router.get("/get", getLogistics);
router.get("/contracted/logistics", contractedLogistics);
router.get("/contracted/companies", contractedCompany);
router.post("/logisticsCenter", logisticsListByArea);
router.post("/", createLogistics);
router.patch("/", updateLogistics);
router.delete("/", deleteLogistics);

export default router;
