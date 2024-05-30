import mongoose, { Schema } from "mongoose";

const billSchema = new Schema({
  items: [
    {
      type: Schema.Types.Mixed,
      required: true,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  customer:{
    type: String,
    required: true,
    index:true
  },
  totalItems: {
    type: Number,
    required: true,
  },
  totalDiscount:{
    type: Number,
    required: true,
  },
});

export const Bill = mongoose.model("Bill", billSchema);
