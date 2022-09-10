import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

const generateToken = async (id: string) => {
  const JWT = sign({ id }, JWT_SECRET, {
    expiresIn: "12h",
  });
  return JWT;
};

const verifyToken = (jwt: string) => {
  const isTokenValid = verify(jwt, JWT_SECRET);

  return isTokenValid;
};

export { generateToken, verifyToken };
