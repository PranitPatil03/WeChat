import { Chat } from "../models/chatModel";
import { Message } from "../models/messageModel";
import { User } from "../models/userModel";

export const sendMessage = async (req: any, res: any) => {
  try {
    const user = req.user;
    const { content, chatId } = req.body;

    console.log(chatId);

    if (!content || !chatId) {
      return res.status(400).json({ error: "The Given Data is not valid!" });
    }

    const newMessage = {
      sender: user,
      content: content,
      chat: chatId,
    };

    var message = await (await Message.create(newMessage)).populate(["sender", "chat"]);

    console.log("Line 22", message);

    message = await Message.populate(message, {
      path: "sender",
      select: "name pic username",
    });

    console.log("Line 23", message);

    const userMessage = await Message.populate(message, {
      path: "chat",
      select: "",
    });

    console.log("Line 24", message);

    const finalMessage = await User.populate(userMessage, {
      path: "chat.users",
      select: "name pic username email",
    });

    console.log("Line 3", message);

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: finalMessage._id,
    });

    return res.status(201).json({ finalMessage });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const allMessages = async (req: any, res: any) => {};
