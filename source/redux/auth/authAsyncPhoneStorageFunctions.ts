import { createAsyncThunk } from "@reduxjs/toolkit";
import { PhoneStorage } from "../../api/PhoneStorage.ts";
import { User } from "./authTypes.ts";

export const saveUserAsync = createAsyncThunk(
  'phoneStorage/saveUser',
  async (user: User, { rejectWithValue }) => {
    try {
      await PhoneStorage.saveUser(user);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserAsync = createAsyncThunk(
  'phoneStorage/getUser',
  async (_, { rejectWithValue }) => {
    try {
      return  await PhoneStorage.getUser();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearUserAsync = createAsyncThunk(
  'phoneStorage/clearUser',
  async (_, { rejectWithValue }) => {
    try {
      await PhoneStorage.clearUser();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
