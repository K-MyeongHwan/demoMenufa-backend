import express, { Router } from "express";
import {
  article,
  articleList,
  articleManipulator,
  getFiles,
} from "../controllers/article";

const router: Router = express.Router();

router.get("/", articleList);
router.get("/get", article);
router.get("/files", getFiles);
router.post("/", articleManipulator);

export default router;
