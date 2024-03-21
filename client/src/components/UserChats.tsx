/* eslint-disable @typescript-eslint/no-unused-vars */
import { LookInSession } from "@/common/session";
import { chatContext } from "@/context/chatContext";
import { userContext } from "@/context/userContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { ChatLoading } from "@/common/ChatLoading";
import { Link } from "react-router-dom";
import { log } from "console";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type chat = {
  _id: string | number;
  chatName: string;
  isGroupChat: boolean;
  users: chat[];
  pic: string;
  username: string;
};

const UserChats = () => {
  const {
    userAuth: { accessToken },
    setUserAuth,
  } = useContext(userContext);

  const { user, selectChat, setSelectChat, chats, setChats } =
    useContext(chatContext);

  const [loggedUser, setLoggedUser] = useState();
  console.log(loggedUser);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(
        import.meta.env.VITE_SERVER_DOMAIN + "/chat",
        config
      );

      const { chat } = data.data;

      console.log(data.data.chat);

      setChats(chat);
    } catch (error) {
      console.log(error);
    }
  };

  const getSenderName = (loggedUser, users) => {
    if (loggedUser && users) {
      return users[0]?._id === loggedUser?.id ? users[1].name : users[0].name;
    }
  };

  const getSenderProfile = (loggedUser, users) => {
    if (loggedUser && users) {
      return users[0]?._id === loggedUser?.id ? users[1].pic : users[0].pic;
    }
  };

  useEffect(() => {
    const userString = LookInSession("user");
    if (userString) {
      setLoggedUser(JSON.parse(userString));
      fetchChats();
    }
  }, []);

  return (
    <>
      <main className="flex flex-col w-full h-screen">
        <div className="w-full flex items-center justify-around">
          <h1 className="text-2xl text-black my-2 font-mono font-semibold">
            My Chats
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create Group Chat</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Group Chat</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4 items-center justify-center w-full">
                <div className="grid items-center gap-4 w-[300px]">
                  {/* <Label htmlFor="name" className="text-right text-sm">
                      Group Name
                    </Label> */}
                  <Input
                    id="name"
                    className="w-full"
                    placeholder="Group Name"
                  />
                </div>
                <div className="grid items-center gap-4">
                  {/* <Label htmlFor="username" className="text-right text-sm">
                      Add Users
                    </Label> */}
                  <Input
                    id="username"
                    className=""
                    placeholder="Add users by username..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <hr className="border-1 border-lightGrey/40 my-2"></hr>
        <div className="w-full flex items-center overflow-y-scroll">
          {chats ? (
            <div className="w-full">
              {chats.map((chat, i) => (
                <div
                  className={`cursor-pointer flex items-center gap-4 border p-2 m-2 mt-4 rounded-xl shadow-sm ${
                    selectChat === chat ? "bg-[#e3e5e9]" : "bg-[#f5f5f5]"
                  }`}
                  key={i}
                  onClick={() => setSelectChat(chat)}
                >
                  <div className="flex gap-3 items-center justify-center">
                    <Avatar>
                      <AvatarImage
                        src={
                          !chat.isGroupChat
                            ? getSenderProfile(loggedUser, chat.users)
                            : chat.profile_img
                        }
                        className="w-10 h-10 rounded-full "
                      />
                    </Avatar>
                    <div>
                      <h1 className="font-mono text-lg">
                        {!chat.isGroupChat
                          ? getSenderName(loggedUser, chat.users)
                          : chat.chatName}
                      </h1>
                      <div>
                        <div>
                            <b>Pranit : </b>
                            <p>Lorem ipsum, dolor sit amet ...</p>
                          </div>{/*  */}
                        {/* {chat.latestMessage && (
                          <div>
                            <b>{chat.latestMessage.sender.name} : </b>
                            {chat.latestMessage.content.length > 50
                              ? chat.latestMessage.content.substring(0, 51) +
                                "..."
                              : chat.latestMessage.content}
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ChatLoading />
          )}
        </div>
      </main>
    </>
  );
};

export default UserChats;
