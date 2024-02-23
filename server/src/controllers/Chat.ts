import { Chat } from "../models/chatModel";
import { User } from "../models/userModel";

export const accessChats = async (req: any, res: any) => {
  const SenderUser = req.user;
  const { ReceiverUser } = req.body;
  
  console.log(ReceiverUser)

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

export const fetchChats = async (req: any, res: any) => {};

export const createGroupChat = async (req: any, res: any) => {};

export const renameGroup = async (req: any, res: any) => {};

export const addToGroup = async (req: any, res: any) => {};

export const removeFromGroup = async (req: any, res: any) => {};
