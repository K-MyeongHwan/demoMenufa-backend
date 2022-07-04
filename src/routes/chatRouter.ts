import express, { Router } from "express";
import { getChatRoomList, saveMessage, getChatmessageList } from "../controllers/chat";

const router: Router = express.Router();

router.get("/", getChatRoomList);
router.post("/", saveMessage);
router.get("/list",getChatmessageList);
export default router;
