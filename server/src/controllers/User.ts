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
        { name: new RegExp(query, "i") },
        { username: new RegExp(query, "i") },
      ],
    })
      .find({ _id: { $ne: userId } })
      .select("name email username pic");

    return res.status(201).json(allUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req: any, res: any) => {
  try {
    const { username } = req.body;

    const profile = await User.findOne({ username }).select("-password");

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(profile);

    return res.status(200).json({ profile });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
