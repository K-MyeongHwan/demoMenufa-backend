import express, { Router } from "express";
import { articleList, articleManipulator } from "../controllers/article";

const router: Router = express.Router();

router.get("/", articleList);
router.post("/", articleManipulator);

export default router;
