import express, { Router } from "express";
import {
  getChatRoomList,
  saveMessage,
  getChatmessageList,
  following,
} from "../controllers/chat";

const router: Router = express.Router();

router.get("/", getChatRoomList);
router.get("/following", following);
router.post("/", saveMessage);
router.get("/list", getChatmessageList);
export default router;
