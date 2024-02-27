import { User } from "../models/userModel";

export const getAllUsers = async (req: any, res: any) => {
  const userId = req.user;

  try {
    const allUser = await User.find({})
      .find({ _id: { $ne: userId } })
      .select("name email username pic");

    return res.status(201).json(allUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const searchUsers = async (req: any, res: any) => {
  const userId = req.user;
  const { query } = req.body;

  try {
    const allUser = await User.find({
      $or: [
        {name: new RegExp(query, "i")},
        {username: new RegExp(query, "i")}
      ]
    })
      .find({ _id: { $ne: userId } })
      .select("name email username pic");

    return res.status(201).json(allUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
