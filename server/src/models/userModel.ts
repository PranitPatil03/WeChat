import mongoose from "mongoose";
import {
  profile_imgs_collections_list,
  profile_imgs_name_list,
} from "../constants/constants";

const userSchema = new mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    username: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: String,
      default: () => {
        return `https://api.dicebear.com/6.x/${
          profile_imgs_collections_list[
            Math.floor(Math.random() * profile_imgs_collections_list.length)
          ]
        }/svg?seed=${
          profile_imgs_name_list[
            Math.floor(Math.random() * profile_imgs_name_list.length)
          ]
        }`;
      },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
