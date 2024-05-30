import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, logInUser, logoutUser } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logInUserAsync = createAsyncThunk(
  "user/logInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await logInUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  "user/logoutUser",
  async () => {
  
      const response = await logoutUser();
      return response.data;
   
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = "idle";
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
      })
      .addCase(logInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logInUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logInUserAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loggedInUser = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
      });
  }
});

export const {} = authSlice.actions;
export const getCurrentUser = (state) => state.auth.loggedInUser;
export const getError = (state) => state.auth.error;

export const authReducer = authSlice.reducer;
