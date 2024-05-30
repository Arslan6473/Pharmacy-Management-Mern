import { Router } from "express";
import {
  createCartItem,
  updateCartItem,
  fetchAllCartItems,
  deleteCartItem,
} from "../controllers/cart.contoller.js";

const router = Router();

router.route("/add-item").post(createCartItem);
router.route("/items").get(fetchAllCartItems);
router.route("/update/:id").patch(updateCartItem);
router.route("/delete/:id").delete(deleteCartItem);

export default router;