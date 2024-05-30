import { Router } from "express";
import {
  createBill,
  fetchFilteredBills,
} from "../controllers/bill.controller.js";

const router = Router();

router.route("/create").post(createBill);
router.route("/").get(fetchFilteredBills);
export default router;