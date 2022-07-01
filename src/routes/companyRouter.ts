import express, { Router } from "express";
import { companyList } from "../controllers/company";

const router: Router = express.Router();

// router.use('/', test)

router.post("/login", companyList);

export default router;
