import { hash, compare } from "bcrypt";

export const hashPassword = async (password: string) => {
  const passwordHashed = await hash(password, 8);
  return passwordHashed;
};

export const verifyPwd = async (pwd: string, hashedPwd: string) => {
  return await compare(pwd, hashedPwd);
};
