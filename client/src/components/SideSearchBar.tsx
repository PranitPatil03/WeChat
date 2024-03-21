/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { userContext } from "@/context/userContext";
import { RemoveSession } from "@/common/session";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { ChatLoading } from "@/common/ChatLoading";
import { chatContext } from "@/context/chatContext";

type ResultType = {
  _id: string | number;
  name: string;
  username: string;
  email: string;
  pic: string;
};

const SideSearchBar = () => {
  const navigate = useNavigate();

  const {
    userAuth: { accessToken, profile_img, username },
    setUserAuth,
  } = useContext(userContext);

  const { selectChat, setSelectChat, chats, setChats } =
    useContext(chatContext);

  console.log(chats);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const SHEET_SIDES = ["left"] as const;

  type SheetSide = (typeof SHEET_SIDES)[number];

  const handleLogout = () => {
    RemoveSession("user");
    navigate("/");
  };

  const handleUserSearch = async () => {
    console.log(search);

    if (!search) {
      toast.error("Enter the username");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/user/search-users",
        {
          query: search,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(data);

      setLoading(false);
      setSearchChat(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const accessUserChat = async (id: string | number) => {
    try {
      setLoadingChat(true);

      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/chat",
        {
          ReceiverUser: id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Line 121",data.chat);

      if (!chats.find((c: { _id: string | number }) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectChat(data.chat);
      setLoadingChat(false);
    } catch (error) {
      setLoadingChat(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between mx-10 mt-5 items-center">
        <div className="">
          <div className="grid gap-2">
            {SHEET_SIDES.map((side) => (
              <Sheet key={side}>
                <SheetTrigger asChild>
                  <div className="w-[300px] ">
                    <Button
                      variant="ghost"
                      className="font-mono w-full p-3 py-5 flex justify-start text-xl"
                    >
                      <i className="fi fi-rr-search mr-3 mt-1 font-mono text-base"></i>{" "}
                      Search User
                    </Button>
                  </div>
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Search User</SheetTitle>
                  </SheetHeader>
                  <hr className="border-1 border-lightGrey/40 mt-3"></hr>

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Input
                        id="name"
                        placeholder="Enter Username or Name"
                        className="col-span-3 "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        // onChange={(e) => delay(e)}
                      />
                      <SheetHeader>
                        <SheetHeader>
                          <Button type="submit" onClick={handleUserSearch}>
                            Search
                          </Button>
                        </SheetHeader>
                      </SheetHeader>
                    </div>
                    <hr className="border-1 border-lightGrey/40 mt-3"></hr>
                  </div>

                  {loading ? (
                    <ChatLoading></ChatLoading>
                  ) : (
                    <>
                      {searchResult.map((result: ResultType, i) => {
                        return (
                          <div
                            className="flex gap-4 border p-2 m-2 mt-4 rounded-xl shadow-sm"
                            key={i}
                            onClick={() => accessUserChat(result._id)}
                          >
                            <Avatar>
                              <AvatarImage src={result.pic} />
                            </Avatar>
                            <Link to="/" className="font-mono text-lg">
                              {result.username}
                            </Link>
                          </div>
                        );
                      })}
                    </>
                  )}
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </div>
        {/* <div className="hidden md:block font-mono text-2xl ">WeChat</div> */}
        <div className="flex gap-2 items-center">
          <i className="fi fi-rr-bell font-mono text-2xl mt-2 cursor-pointer"></i>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src={profile_img}
                className="w-8 h-8 rounded-full cursor-pointer outline-none"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={`/user/${username}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link to="/">
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <hr className="border-1 border-lightGrey/40 mt-3"></hr>
    </>
  );
};

export default SideSearchBar;
