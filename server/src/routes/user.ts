import express from "express";
import { getAllUsers, getProfile, searchUsers } from "../controllers/User";
import { verifyJWT } from "../middleware/authVerify";

export const userRouter = express.Router();

userRouter
  .get("/get-all-users", verifyJWT, getAllUsers)
  .get("/search-users", verifyJWT, searchUsers)
  .post("/get-profile", getProfile);
