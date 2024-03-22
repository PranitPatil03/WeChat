import express from "express";
import { allMessages, sendMessage } from "../controllers/Messages.ts";
import { verifyJWT } from "../middleware/authVerify.ts";

export const messageRouter = express.Router();

messageRouter.post("/",verifyJWT, sendMessage).get("/:chatId",verifyJWT, allMessages)

