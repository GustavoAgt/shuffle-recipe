import { Schema, model } from "mongoose";
import { User } from "../types/user.type";

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model("users", UserSchema);
export default UserModel;
