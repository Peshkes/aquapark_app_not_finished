import { createAsyncThunk } from "@reduxjs/toolkit";
import { Server } from "../../api/Server.ts";
import { LoginData, RegistrationData } from "./authTypes.ts";
import { RootState } from "../store.ts";

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { serverUrl, csrfToken } = state.auth;
      return await Server.login(loginData, serverUrl, csrfToken);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRolesAsync = createAsyncThunk(
  'auth/fetchRoles',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { serverUrl, csrfToken, user } = state.auth;
      return await Server.fetchRoles(serverUrl, csrfToken, user);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTokenAsync = createAsyncThunk(
  'auth/getToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { serverUrl } = state.auth;
      return await Server.getToken(serverUrl);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registrationAsync = createAsyncThunk(
  'auth/registration',
  async (regData: RegistrationData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { serverUrl, csrfToken, user } = state.auth;
      return await Server.registration(regData, serverUrl, csrfToken, user);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
