import { asyncHandler } from "../utils/asyncHandler.js";
import { Cart } from "../models/cart.model.js";

const createCartItem = asyncHandler(async (req, res) => {
  //get product data from frontend
  const { item, user } = req.body;

  //validate any field is empty
  if ([item, user].some((field) => field === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //create product
  const createdCartItem = await Cart.create({
    item,
    user,
  });

  await Cart.populate(createdCartItem, { path: "item" });

  if (!createdCartItem) {
    return res
      .status(500)
      .json({ message: "Something went wrong while creating cart item" });
  }



  //send response
  return res.status(201).json(createdCartItem);
});

const updateCartItem = asyncHandler(async (req, res) => {
  //get product data from frontend
  const { item, quantity } = req.body;

  //validate if all fields are empty
  if (item === "" && quantity === "") {
    return res.status(400).json({ message: "At least one field is required" });
  }

  //update product in db
  const updatedCartItem = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: { quantity },
    },
    { new: true }
  );

  //check if product not found
  if (!updatedCartItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  await Cart.populate(updatedCartItem, { path: "item" });

  return res.status(200).json(updatedCartItem);
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const deletedItem = await Cart.findById(req.params.id)
  if (!deletedItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  await Cart.populate(deletedItem, { path: "item" });

  await Cart.findByIdAndDelete(req.params.id);

  return res.status(200).json(deletedItem);
});

const fetchAllCartItems = asyncHandler(async (req, res) => {
  const cartItems = await Cart.find({ user: req.query.user }).populate(
    "item"
  );

  if (!cartItems) {
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching cart items" });
  }

  return res.status(200).json(cartItems);
});

export { createCartItem, updateCartItem, deleteCartItem, fetchAllCartItems };
