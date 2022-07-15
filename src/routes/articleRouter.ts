import express, { Router } from "express";
import {
  article,
  articleList,
  articleManipulator,
} from "../controllers/article";

const router: Router = express.Router();

router.get("/", articleList);
router.get("/get", article);
router.post("/", articleManipulator);

export default router;
