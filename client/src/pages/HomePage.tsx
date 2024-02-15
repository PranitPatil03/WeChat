import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "react-hot-toast";

import { emailRegex, passwordRegex } from "../../constants/constants.ts";
import { useState } from "react";

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  console.log(formData)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (name && name.length < 3) {
      return toast.error("FullName must be at least 3 Letters long");
    }

    if (email) {
      if (!emailRegex.test(email)) {
        return toast.error("Mail is Invalid");
      }
    } else {
      return toast.error("Enter Mail");
    }

    if (password && !passwordRegex.test(password)) {
      return toast.error("Password is Invalid");
    }

    // userAuthFromServer(serverRoute, formData);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="mx-4 flex justify-center items-center h-screen">
        <Toaster />
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-up">Sign-up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-up">
            <Card>
              <CardHeader>
                <CardTitle>Register at WeChat</CardTitle>
              </CardHeader>
              <CardContent id="FormElement" className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    onChange={handleChange}
                    defaultValue="Pedro Duarte"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    onChange={handleChange}
                    defaultValue="@peduarte"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    onChange={handleChange}
                    defaultValue="peduarte@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    onChange={handleChange}
                    defaultValue="peduarte123*"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit}>Sign-up</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    onChange={handleChange}
                    defaultValue="peduarte@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    onChange={handleChange}
                    defaultValue="peduarte123*"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default HomePage;
