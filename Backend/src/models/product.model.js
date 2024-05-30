import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    index:true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [1, "wrong minimum price "],
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: [0, "wrong minimum discountPercentage"],
    max: [99, "wrong maximum discountPercentage"],
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "wrong minimum stock"],
    default: 0,
  },
  company: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  deleted: {
    type: String,
    required: true,
    default: false,
  },
});

export const Product = mongoose.model("Product", productSchema);
