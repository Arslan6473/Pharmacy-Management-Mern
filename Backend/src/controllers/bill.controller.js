import { asyncHandler } from "../utils/asyncHandler.js";
import { Bill } from "../models/bill.model.js";

const createBill = asyncHandler(async (req, res) => {
  //get Bill data from frontend
  const { items, customer, totalAmount, totalItems, totalDiscount} = req.body;

  //validate any field is empty
  if ([items, customer, totalAmount, totalItems, totalDiscount].some((field) => field == null)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //create Bill
  const createdBill = await Bill.create({
    items,
    customer,
    totalAmount,
    totalItems,
    totalDiscount
  });

  if (!createdBill) {
    return res.status(500).json({ message: "Something went wrong while creating Bill item" });
  }


  //send response
  return res.status(201).json(createdBill);
});

const fetchFilteredBills = asyncHandler(async (req, res) => {
  let query = Bill.find({});

  if (req.query._search) {
    const search = req.query._search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    query = query.find({ customer: { $regex: `.*${search}.*`, $options: "i" } });
  }

  if (req.query._page && req.query._per_page) {
    const pageSize = +req.query._per_page;
    const page = +req.query._page;
    const skip = pageSize * (page - 1);
    query = query.skip(skip).limit(pageSize);
  }

  const bills = await query.exec();


  if (!bills.length) {
    return res.status(500).json({ message: "Something went wrong while fetching bills" });
  }

  return res.status(200).json(bills);
});

const fetchAllBills = asyncHandler(async (req, res) => {


  const bills = await Bill.find({});


  if (!bills.length) {
    return res.status(500).json({ message: "Something went wrong while fetching bills" });
  }

  return res.status(200).json(bills);
});

export { createBill, fetchFilteredBills,fetchAllBills };
