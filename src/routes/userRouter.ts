import express, { Router } from "express";
import { login, register } from "../controllers/user";

const router: Router = express.Router();

// router.use('/', test)

router.get("/login", login);
router.post("/register", register);

export default router;
