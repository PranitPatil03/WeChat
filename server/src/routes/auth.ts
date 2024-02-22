import express from "express";
import { createUser, loginUser } from "../controllers/User.ts";

export const authRouter = express.Router();

authRouter.post("/signup", createUser).post("/login",loginUser)
