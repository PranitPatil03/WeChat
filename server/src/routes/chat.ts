import express from "express";
import { verifyJWT } from "../middleware/authVerify";
import {
  accessChats,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from "../controllers/Chat";

export const chatRouter = express.Router();

chatRouter
  .post("/", verifyJWT, accessChats)
  .get("/", verifyJWT, fetchChats)
  .post("/group", verifyJWT, createGroupChat)
  .put("/group/rename", verifyJWT, renameGroup)
  .put("/group/add", verifyJWT, addToGroup)
  .put("/group/remove", verifyJWT, removeFromGroup);
