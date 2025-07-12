import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../lib/api";

// Get initial state from localStorage
const getInitialState = () => {
  try {
    const storedUser = localStorage.getItem("foodcalluser");
    const storedToken = localStorage.getItem("foodcalltoken");

    if (storedUser && storedToken) {
      return {
        user: JSON.parse(storedUser),
        token: storedToken,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error("Error parsing stored user data:", error);
    localStorage.removeItem("foodcalluser");
    localStorage.removeItem("foodcalltoken");
  }

  return {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  };
};

const initialState = getInitialState();

// Async thunk for login
export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const userData = await loginUser(credentials);
      // Persist to localStorage
      localStorage.setItem(
        "foodcalluser",
        JSON.stringify(userData.user || userData)
      );
      localStorage.setItem("foodcalltoken", userData.token);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for register
export const registerUserThunk = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      // Persist to localStorage
      localStorage.setItem("foodcalluser", JSON.stringify(data.user || data));
      localStorage.setItem("foodcalltoken", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("foodcalluser");
      localStorage.removeItem("foodcalltoken");
    },
    clearError(state) {
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user || action.payload;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user || action.payload;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearUser, clearError, setLoading } = userSlice.actions;
export default userSlice.reducer;
