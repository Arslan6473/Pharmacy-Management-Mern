import { Router } from "express";
import {
  createBill,
  fetchAllBills,
  fetchFilteredBills,
} from "../controllers/bill.controller.js";

const router = Router();

router.route("/create").post(createBill);
router.route("/").get(fetchFilteredBills);
router.route("/all-bills").get(fetchAllBills);


export default router;