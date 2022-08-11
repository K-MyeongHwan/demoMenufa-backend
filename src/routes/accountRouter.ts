import express, { Router } from "express";
import { getAccounts, createAccount, updateAccount, deleteAccount } from "../controllers/account";

const router: Router = express.Router();

router.get("/", getAccounts);
router.post("/", createAccount);
router.patch("/", updateAccount);
router.delete("/", deleteAccount);

export default router;
