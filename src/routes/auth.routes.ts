import { Router } from "express";
import {
  findUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
import { checkSession } from "../middlewares/session";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/user", checkSession, findUser);

export { router };
