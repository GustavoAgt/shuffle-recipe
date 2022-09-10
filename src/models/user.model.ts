import { Schema, model } from "mongoose";
import { User } from "../types/user.type";

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipes",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = model("Users", UserSchema);
export default UserModel;
