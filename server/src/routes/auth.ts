import express from "express";
import { createUser } from "../controllers/User.ts";

export const authRouter = express.Router();

authRouter.post("/signup", createUser);
