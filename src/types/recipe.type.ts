import { User } from "./user.type";

export type Recipe = {
  title: string;
  duration: number;
  description: string;
  user: User;
};
