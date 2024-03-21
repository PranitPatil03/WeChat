import jwt from "jsonwebtoken";
import { Document, Types } from "mongoose";

export const formatDataToSend = (
  user: Document<
    unknown,
    {},
    { createdAt: NativeDate; updatedAt: NativeDate } & {
      name: string;
      email: string;
      username: string;
      password: string;
      pic: string;
      isAdmin: boolean;
    }
  > & { createdAt: NativeDate; updatedAt: NativeDate } & {
    name: string;
    email: string;
    username: string;
    password: string;
    pic: string;
    isAdmin: boolean;
  } & { _id: Types.ObjectId }
) => {
  if (process.env.SECRET_ACCESS_KEY === undefined) {
    return;
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);

  return {
    id:user._id,
    accessToken,
    profile_img: user.pic,
    name: user.name,
    username: user.username,
  };
};
