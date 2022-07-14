import express, { Router } from "express";
import {
  boardCategoryList,
  boardList,
  createBoard,
  deleteBoard,
  getBoardById,
  updateBoard,
} from "../controllers/board";

const router: Router = express.Router();

router.get("/", boardList);
router.get("/category", boardCategoryList);
router.post("/", createBoard);
router.patch("/", updateBoard);
router.delete("/", deleteBoard);
router.post("/specify", getBoardById);

export default router;
