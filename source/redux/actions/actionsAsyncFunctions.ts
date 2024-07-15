import { createAsyncThunk } from "@reduxjs/toolkit";
import { Server } from "../../api/Server.ts";
import { RootState } from "../store.ts";



export const getOrderAndTickets = createAsyncThunk(
    "actions/getOrderAndTickets",
    async (id: string, { rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const { serverUrl, csrfToken, user } = state.auth;
        try {
            return await Server.getOrder(serverUrl, id, csrfToken, user);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getWhoIsIn = createAsyncThunk(
    "actions/getWhoIsIn",
    async (_,{ rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const { serverUrl, csrfToken, user } = state.auth;
        try {
            return await Server.getWhoIsIn(serverUrl, csrfToken, user);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getTickets = createAsyncThunk(
    "actions/getTickets",
    async (_,{ rejectWithValue, getState }) => {
        const state = getState() as RootState;
        const { serverUrl, csrfToken, user } = state.auth;
        try {
            return await Server.getTickets(serverUrl, csrfToken, user);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
