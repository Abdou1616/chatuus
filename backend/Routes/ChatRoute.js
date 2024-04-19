import express from "express";
import { createChat } from "../Controllers/ChatController.js";

const router = express.Router();

router.route("/").post(createChat);

export default router;
