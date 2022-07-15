import express, { Router } from "express";
import { userList, userSpecify } from "../controllers/user";

const router: Router = express.Router();

// router.use('/', test)

router.get("/", userList);
router.get("/specify", userSpecify);

export default router;
