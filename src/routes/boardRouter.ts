import express, { Router } from "express";
import { boardList, createBoard, deleteBoard, getBoardById, updateBoard } from "../controllers/board";

const router: Router = express.Router();

router.get("/", boardList);
router.post("/", createBoard);
router.patch("/", updateBoard);
router.delete("/", deleteBoard);
router.post("/view", getBoardById);


export default router;
