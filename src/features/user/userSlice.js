import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUserOrders,
  updateUser,
  fetchLoggedInUser,
} from "./userAPI";

const initialState = {
  // userOrders: [],
  status: "idle",
  userInfo: null, //this info will be used in case of detailed user info,while auth will be used for loggedInUser id etc checks.
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async ({ update, toast, message }) => {
    const response = await updateUser(update);
    if (message === "Add Address") {
      toast.success("Address added successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (message === "Address Deleted") {
      toast.error("Address deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (message === "Address Edited") {
      toast.success("Address edit successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be different or more from loggedIn User info
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be different or more from loggedIn User info
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be different or more from loggedIn User info
        state.userInfo = action.payload;
      });
  },
});

//TODO: change Orders and address to be independent of user.  //done
export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectedStatus = (state)=>state.user.status;

export default userSlice.reducer;
