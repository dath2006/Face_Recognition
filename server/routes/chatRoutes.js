import express from "express";
import { chatController } from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware); // Protect all chat routes

router.get("/messages/:receiverId", chatController.getMessages);
router.post("/messages", chatController.sendMessage);

export default router;
