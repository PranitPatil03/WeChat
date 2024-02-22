import { Request, Response } from "express";
import { emailRegex, passwordRegex } from "../constants/constants";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import { formatDataToSend } from "../services/services";

type User = {
  name: string;
  username: string;
  email: string;
  password: string;
  pic: string;
  isAdmin: boolean;
};

export const createUser = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  try {
    if (name.length < 3) {
      return res
        .status(403)
        .json({ error: "FullName must be at least 3 Letters long " });
    }

    if (username.length < 5) {
      return res
        .status(403)
        .json({ error: "Username must be at least 5 Letters long " });
    }

    if (!email.length) {
      return res.status(403).json({ error: "Enter Mail" });
    }

    if (!emailRegex.test(email)) {
      return res.status(403).json({ error: "Mail is Invalid" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(403).json({ error: "Password is Invalid" });
    }

    bcrypt.hash(password, 10, async (err, hashed_password: string) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password" });
      }

      const user = new User({
        name,
        email,
        password: hashed_password,
        username,
      });

      const newUser = await user.save();
      console.log(newUser);

      return res.status(200).json({ User: formatDataToSend(newUser) });
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(500).json({ error: "This email already exists" });
    }

    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Email Not Found" });
    }

    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if (err) {
        return res.status(500).json({ error: "Error occurred. Try Again" });
      }
      if (!passwordMatch) {
        return res.status(404).json({ error: "Incorrect Password" });
      } else {
        return res.status(200).json({ User: formatDataToSend(user) });
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
