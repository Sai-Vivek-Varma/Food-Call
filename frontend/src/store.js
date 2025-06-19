import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import notificationsReducer from "./slices/notificationsSlice";
import donationsReducer from "./slices/donationsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationsReducer,
    donations: donationsReducer,
  },
});

export default store;
