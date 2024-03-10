/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const SideSearchBar = () => {
  const navigate = useNavigate();

  const {
    userAuth: { accessToken, profile_img, username },
    setUserAuth,
  } = useContext(userContext);

  console.log(profile_img);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const SHEET_SIDES = ["left"] as const;

  type SheetSide = (typeof SHEET_SIDES)[number];

  const handleLogout = () => {
    RemoveSession("user");
    navigate("/");
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
                      />
                      <SheetHeader>
                        <SheetHeader>
                          <Button type="submit">Search</Button>
                        </SheetHeader>
                      </SheetHeader>
                    </div>
                  </div>
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
              <DropdownMenuItem onClick={handleLogout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <hr className="border-1 border-lightGrey/40 mt-3"></hr>
    </>
  );
};

export default SideSearchBar;
