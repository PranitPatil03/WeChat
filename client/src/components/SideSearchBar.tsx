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
    userAuth: { accessToken, profile_img ,username},
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
                  <div>
                    <Button variant="outline" className="font-mono">
                      <i className="fi fi-rr-search mr-1 mt-1 font-mono"></i>{" "}
                      Search User
                    </Button>
                  </div>
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
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
                <Link to={`/user/${username}`}>
                  Profile
                </Link>
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
