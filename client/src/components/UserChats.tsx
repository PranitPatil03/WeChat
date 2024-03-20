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

const UserChats = () => {
  const {
    userAuth: { accessToken },
    setUserAuth,
  } = useContext(userContext);

  const {
    selectChat,
    setSelectChat,
    notification,
    setNotification,
    chats,
    setChats,
  } = useContext(chatContext);

  const [loggedUser, setLoggedUser] = useState();

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

      console.log(data);

      setChats(data);
    } catch (error) {
      console.log(error);
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
      <main className="flex flex-col w-full h-full ">
        <div className="w-full flex items-center justify-around">
          <h1 className="text-2xl text-black my-2 font-mono font-semibold">
            My Chats
          </h1>
          <div className="">
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
        </div>
        <hr className="border-1 border-lightGrey/40 mt-2"></hr>
      </main>
    </>
  );
};

export default UserChats;
