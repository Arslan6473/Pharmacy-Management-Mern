import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchFilterProducts,
  createProduct,
  updateProduct,
  updatedProductsOfCart,
  fetchSingleProduct
  
} from "./productApi";

const initialState = {
  products: [],
  status: "idle",
  selectedProduct: null,
};

export const fetchSingleProductAsync = createAsyncThunk(
  "product/fetchSingleProduct",
  async (productId) => {
    const response = await fetchSingleProduct(productId);
    return response.data;
  }
);

export const fetchFilterProductsAsync = createAsyncThunk(
  "product/fetchFilterProducts",
  async ({ pagination, searchQuery }) => {
    const response = await fetchFilterProducts(pagination, searchQuery);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (productData) => {
    const response = await createProduct(productData);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (updatedProduct) => {
    const response = await updateProduct(updatedProduct);
    return response.data;
  }
);

export const updatedProductsOfCartAsync = createAsyncThunk(
  "product/updatedProductsOfCart",
  async (items) => {
    const response = await updatedProductsOfCart(items);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.status = "idle";
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        state.products[index] = action.payload;
        state.status = "idle";
      })
      .addCase(fetchFilterProductsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchFilterProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "idle";
      })
      .addCase(fetchSingleProductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.status = "idle";
      })
      .addCase(updatedProductsOfCartAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updatedProductsOfCartAsync.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const selectAllproducts = (state) => state.product.products;
export const selectProductsStatus = (state) => state.product.status;
export const selectSingleproduct = (state) => state.product.selectedProduct;



export const productReducer = productSlice.reducer;
