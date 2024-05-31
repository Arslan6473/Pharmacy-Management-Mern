import { Router } from "express";
import {
  loginUser,
  registerUser,
  signoutUser,
} from "../controllers/user.controller.js";
import { varifyJWT } from "../middlewares/user.middleware.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
//secure routes
router.route("/signout").post( varifyJWT, signoutUser);

export default router;
