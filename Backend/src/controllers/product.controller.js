import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";

const createProduct = asyncHandler(async (req, res) => {
  //get product data from frontend
  const { name, description, price, discountPercentage, stock, company, thumbnail } = req.body;

  //validate any field is empty
  if ([name, description, price, discountPercentage, company, stock, thumbnail].some((field) => field == null)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //create product
  const createdProduct = await Product.create({
    name,
    description,
    price,
    discountPercentage,
    stock,
    company,
    thumbnail,
  });

  if (!createdProduct) {
    return res.status(500).json({ message: "Something went wrong while creating the product" });
  }

  //send response
  return res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  //get product data from frontend
  const { name, description, price, discountPercentage, stock, company, thumbnail, deleted } = req.body;

  //validate if all fields are empty
  if ([name, description, price, discountPercentage, stock, company, thumbnail, deleted].every((field) => field == null)) {
    return res.status(400).json({ message: "At least one field is required" });
  }

  //update product in db
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name, description, price, discountPercentage, stock, company, thumbnail, deleted },
    },
    { new: true }
  );

  //check if product not found
  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json(updatedProduct);
});

const fetchSingleProduct = asyncHandler(async (req, res) => {
  //fetch product from db
  const singleProduct = await Product.findById(req.params.id);

  //check if product not found
  if (!singleProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json(singleProduct);
});

const fetchFilteredProducts = asyncHandler(async (req, res) => {
  let query = Product.find({});

  if (req.query._search) {
    const search = req.query._search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    query = query.find({ name: { $regex: `.*${search}.*`, $options: "i" } });
  }

  if (req.query._page && req.query._per_page) {
    const pageSize = +req.query._per_page;
    const page = +req.query._page;
    const skip = pageSize * (page - 1);
    query = query.skip(skip).limit(pageSize);
  }

  const Products = await query.exec();


  if (!Product.length) {
    return res.status(500).json({ message: "Something went wrong while fetching products" });
  }

  return res.status(200).json(Products);
});

export {
  createProduct,
  updateProduct,
  fetchFilteredProducts,
  fetchSingleProduct,
};
