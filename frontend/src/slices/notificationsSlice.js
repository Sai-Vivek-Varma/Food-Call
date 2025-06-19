import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../lib/apiClient";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

export const fetchNotificationsThunk = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/users/notifications");
      await apiClient.post("/users/notifications/read", {});
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch notifications");
    }
  }
);

export const clearAllNotificationsThunk = createAsyncThunk(
  "notifications/clearAll",
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.delete("/users/notifications");
      return [];
    } catch (err) {
      return rejectWithValue("Failed to clear notifications");
    }
  }
);

export const deleteNotificationThunk = createAsyncThunk(
  "notifications/deleteOne",
  async (index, { getState, rejectWithValue }) => {
    try {
      await apiClient.delete(`/users/notifications/${index}`);
      const { notifications } = getState().notifications;
      return notifications.filter((_, idx) => idx !== index);
    } catch (err) {
      return rejectWithValue("Failed to delete notification");
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.read).length;
    },
    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    markAllRead(state) {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        read: true,
      }));
      state.unreadCount = 0;
    },
    removeNotification(state, action) {
      state.notifications.splice(action.payload, 1);
      state.unreadCount = state.notifications.filter((n) => !n.read).length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.read).length;
        state.loading = false;
      })
      .addCase(fetchNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearAllNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearAllNotificationsThunk.fulfilled, (state) => {
        state.notifications = [];
        state.unreadCount = 0;
        state.loading = false;
      })
      .addCase(clearAllNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteNotificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotificationThunk.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.read).length;
        state.loading = false;
      })
      .addCase(deleteNotificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setNotifications,
  clearNotifications,
  setLoading,
  markAllRead,
  removeNotification,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
