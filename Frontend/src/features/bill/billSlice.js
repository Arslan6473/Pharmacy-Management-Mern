import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createBill, fetchAllBills } from "./billApi";

const initialState = {
  bills: [],
  status: "idle",
};

export const createBillAsync = createAsyncThunk(
  "bill/createBill",
  async (bill) => {
    const response = await createBill(bill);
    return response.data;
  }
);

export const fetchAllBillsAsync = createAsyncThunk(
  "bill/fetchAllBills",
  async ({pagination,searchQuery}) => {
    const response = await fetchAllBills(pagination,searchQuery);
    return response.data;
  }
);


const billSlice = createSlice({
  name: "bill",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createBillAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createBillAsync.fulfilled, (state, action) => {
        state.currentBill = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAllBillsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllBillsAsync.fulfilled, (state, action) => {
        state.bills = action.payload;
        state.status = "idle";
      })
    },
  });

export const selectAllBills = (state) => state.bill.bills;
export const selectBillsStatus = (state) => state.bill.status;


export const billReducer = billSlice.reducer;
