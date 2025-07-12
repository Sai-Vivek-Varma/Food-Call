import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDonation,
  updateDonation,
  deleteDonation,
  uploadDonationImage,
} from "../lib/api";
import apiClient from "../lib/apiClient";

export const fetchDonations = createAsyncThunk(
  "donations/fetchDonations",
  async (role, { rejectWithValue }) => {
    try {
      let endpoint = "/donations";
      if (role === "donor") endpoint = "/donations/user/donor";
      if (role === "orphanage") endpoint = "/donations/user/reserved";
      const res = await apiClient.get(endpoint);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch donations"
      );
    }
  }
);

export const createDonationThunk = createAsyncThunk(
  "donations/createDonation",
  async (donationData, { rejectWithValue }) => {
    try {
      const data = await createDonation(donationData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create donation");
    }
  }
);

export const updateDonationThunk = createAsyncThunk(
  "donations/updateDonation",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const data = await updateDonation(id, updateData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update donation");
    }
  }
);

export const deleteDonationThunk = createAsyncThunk(
  "donations/deleteDonation",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDonation(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete donation");
    }
  }
);

export const reserveDonationThunk = createAsyncThunk(
  "donations/reserveDonation",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/donations/${id}/reserve`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to reserve donation");
    }
  }
);

export const completeDonationThunk = createAsyncThunk(
  "donations/completeDonation",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/donations/${id}/complete`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to complete donation");
    }
  }
);

export const unreserveDonationThunk = createAsyncThunk(
  "donations/unreserveDonation",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/donations/${id}/unreserve`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to unreserve donation"
      );
    }
  }
);

const donationsSlice = createSlice({
  name: "donations",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDonationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDonationThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createDonationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDonationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDonationThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (d) => d.id === action.payload.id || d._id === action.payload._id
        );
        if (idx !== -1) state.items[idx] = action.payload;
        state.loading = false;
      })
      .addCase(updateDonationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDonationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDonationThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (d) => d.id !== action.payload && d._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteDonationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(reserveDonationThunk.fulfilled, (state, action) => {
        // Update the reserved donation in the list
        const idx = state.items.findIndex(
          (d) => d.id === action.payload.id || d._id === action.payload._id
        );
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(completeDonationThunk.fulfilled, (state, action) => {
        // Update the completed donation in the list
        const idx = state.items.findIndex(
          (d) => d.id === action.payload.id || d._id === action.payload._id
        );
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(unreserveDonationThunk.fulfilled, (state, action) => {
        // Remove the unreserved donation from the list if it's no longer reserved by the current orphanage
        const userStr = localStorage.getItem("foodShareUser");
        let userId, role;
        try {
          const user = userStr ? JSON.parse(userStr) : null;
          userId = user?._id;
          role = user?.role;
        } catch {
          userId = undefined;
          role = undefined;
        }
        // If orphanage and the donation is now available, remove from list
        if (
          role === "orphanage" &&
          (action.payload.status === "available" ||
            !action.payload.reservedBy ||
            action.payload.reservedBy !== userId)
        ) {
          state.items = state.items.filter(
            (d) => d.id !== action.payload.id && d._id !== action.payload._id
          );
        } else {
          // Otherwise, just update the donation in the list
          const idx = state.items.findIndex(
            (d) => d.id === action.payload.id || d._id === action.payload._id
          );
          if (idx !== -1) state.items[idx] = action.payload;
        }
      });
  },
});

export default donationsSlice.reducer;
