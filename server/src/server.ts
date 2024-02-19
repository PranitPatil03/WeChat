import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/db.ts";
import { authRouter } from "./routes/auth.ts";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectToMongoDB();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.get("/health", (req, res) => {
  res.json({ status: "Server is healthy" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
