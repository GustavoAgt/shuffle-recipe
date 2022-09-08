import { User } from "./user.type";

export type Recipe = {
  title: string;
  cookingDuration: number;
  description: string;
  user: User;
};
