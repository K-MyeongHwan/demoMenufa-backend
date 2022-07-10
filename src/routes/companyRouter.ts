import express, { Router } from "express";
import {
  addCompany,
  companyList,
  deleteCompany,
  updateCompany,
} from "../controllers/company";

const router: Router = express.Router();

// router.use('/', test)

router.get("/", companyList);
router.post("/", addCompany);
router.patch("/", updateCompany);
router.delete("/", deleteCompany);

export default router;
