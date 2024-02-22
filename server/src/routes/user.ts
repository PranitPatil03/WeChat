import express from "express"
import { getAllUsers, searchUsers } from "../controllers/User";
import { verifyJWT } from "../middleware/authVerify";

export const UserRouter = express.Router();

UserRouter.get("/get-all-users", verifyJWT , getAllUsers);
UserRouter.get("/search-users", verifyJWT , searchUsers);