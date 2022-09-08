import { Router } from "express";
import {
  login,
  createUser,
  findAllRecipes,
} from "../controllers/user.controller";

const router = Router();

router.post("/login", login);
router.post("/", createUser);
router.get("/", findAllRecipes);

export { router };
