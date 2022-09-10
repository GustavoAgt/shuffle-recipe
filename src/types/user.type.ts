import { Recipe } from "./recipe.type";

export type User = {
  _id?: string;
  username: string;
  password: string;
  recipes?: Recipe[];
};
