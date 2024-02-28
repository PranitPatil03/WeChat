import { Chat } from "../models/chatModel";
import { User } from "../models/userModel";

export const accessChats = async (req: any, res: any) => {
  const SenderUser = req.user;
  const { ReceiverUser } = req.body;

  console.log(ReceiverUser);

  if (!ReceiverUser) {
    return res.status(404).json({ error: "User Not Found" });
  }

  var chat = await Chat.find({
    isGroup: false,
    $and: [
      {
        users: { $elemMatch: { $eq: SenderUser } },
      },
      {
        users: { $elemMatch: { $eq: ReceiverUser } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  // @ts-ignore
  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (chat.length > 0) {
    return res.status(201).json({ chat: chat[0] });
  } else {
    var chatData = {
      chatName: "test",
      isGroupChat: "false",
      users: [SenderUser, ReceiverUser],
    };
  }

  try {
    const chatCreated = await Chat.create(chatData);

    const fullChat = await Chat.findOne({ _id: chatCreated._id }).populate(
      "users",
      "-password"
    );

    return res.status(201).json({ chat: fullChat });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const fetchChats = async (req: any, res: any) => {
  const user = req.user;

  try {
    const userChat = await Chat.find({
      users: { $elemMatch: { $eq: user } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updated: -1 });

    const result = await User.populate(userChat, {
      path: "latestMessage.sender",
      select: "name pic username email",
    });

    return res.status(201).json({ chat: result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createGroupChat = async (req: any, res: any) => {
  try {
    const user = req.user;

    const { chatName, users } = req.body;

    if (!chatName) {
      return res.status(401).json({ error: "Enter the Chat Group Name" });
    }

    if (users.length < 2) {
      return res
        .status(401)
        .json({ error: "Select More than 2 users to create group chat" });
    }

    users.push(user);

    const newChatGroup = {
      isGroupChat: true,
      chatName,
      users,
      groupAdmin: user,
    };

    const newChatGrp = await Chat.create(newChatGroup);

    const fullGroupChat = await Chat.findOne({ _id: newChatGrp._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(201).json({ chatGroup: fullGroupChat });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const renameGroup = async (req: any, res: any) => {
  console.log("Request Body:", req.body);

  try {
    const { chatName, groupId } = req.body;

    const updatedChatGroupName = await Chat.findByIdAndUpdate(
      groupId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .exec();

    if (!updatedChatGroupName) {
      return res
        .status(500)
        .json({ error: "Failed to update the Group Name." });
    }

    return res.status(201).json({ chatGroup: updatedChatGroupName });
  } catch (error) {
    console.error("Error updating chat group:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addToGroup = async (req: any, res: any) => {
  console.log(req.body);
  const { chatId, userId } = req.body;

  const userAdded = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!userAdded) {
    res.status(404).json({ error: "The give Chat Grp does not exist!" });
  } else {
    res.status(201).json({ newChatGrp: userAdded });
  }
};

export const removeFromGroup = async (req: any, res: any) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    return res.status(404).json({ error: "The give Chat Grp does not exist!" });
  } else {
    res.status(201).json({ newChatGrp: removed });
  }
};
