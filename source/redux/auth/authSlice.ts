import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxStatus, RoleData, User } from "./authTypes";
import { fetchRolesAsync, fetchTokenAsync, loginAsync, registrationAsync } from "./authAsyncServerFunctions";
import { clearUserAsync, getUserAsync, saveUserAsync } from "./authAsyncPhoneStorageFunctions";
import { getOrderAndTickets, getTickets, getWhoIsIn } from "../actions/actionsAsyncFunctions.ts";

export type AuthState = {
    user: User;
    serverUrl: string;
    csrfToken: string;
    status: ReduxStatus;
    statusDescription: string;
    roles: Array<RoleData>;
}

const initialState: AuthState = {
    user: null,
    serverUrl: "http://192.168.1.111:8080",
    csrfToken: "",
    status: "sleeping",
    statusDescription: "",
    roles: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setServerUrl: (state, action: PayloadAction<string>) => {
            state.serverUrl = action.payload;
        },
        setStatus: (state, action: PayloadAction<ReduxStatus>) => {
            state.status = action.payload;
        },
        setStatusDescription: (state, action: PayloadAction<string>) => {
            state.statusDescription = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.statusDescription = "Logging in...";
                state.status = "loading";
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.statusDescription = "Logged in successfully";
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(fetchRolesAsync.pending, (state) => {
                state.statusDescription = "Fetching roles...";
                state.status = "loading";
            })
            .addCase(fetchRolesAsync.fulfilled, (state, action: PayloadAction<Array<RoleData>>) => {
                state.statusDescription = "Roles fetched successfully";
                state.status = "succeeded";
                state.roles = action.payload;
            })
            .addCase(fetchRolesAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(fetchTokenAsync.pending, (state) => {
                state.statusDescription = "Fetching token...";
                state.status = "loading";
            })
            .addCase(fetchTokenAsync.fulfilled, (state, action: PayloadAction<string>) => {
                state.statusDescription = "Token fetched successfully";
                state.status = "succeeded";
                state.csrfToken = action.payload;
            })
            .addCase(fetchTokenAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(registrationAsync.pending, (state) => {
                state.statusDescription = "Registering...";
                state.status = "loading";
            })
            .addCase(registrationAsync.fulfilled, (state) => {
                state.statusDescription = "Registration succeeded";
                state.status = "succeeded";
            })
            .addCase(registrationAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(saveUserAsync.pending, (state) => {
                state.statusDescription = "Saving user...";
                state.status = "loading";
            })
            .addCase(saveUserAsync.fulfilled, (state) => {
                state.statusDescription = "User saved successfully";
                state.status = "succeeded";
            })
            .addCase(saveUserAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(getUserAsync.pending, (state) => {
                state.statusDescription = "Fetching user...";
                state.status = "loading";
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.statusDescription = "User loaded successfully";
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(getUserAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(clearUserAsync.pending, (state) => {
                state.statusDescription = "Clearing user...";
                state.status = "loading";
            })
            .addCase(clearUserAsync.fulfilled, (state) => {
                state.statusDescription = "User cleared successfully";
                state.status = "succeeded";
            })
            .addCase(clearUserAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(getOrderAndTickets.pending, (state) => {
                state.statusDescription = "Getting...";
                state.status = "loading";
            })
            .addCase(getOrderAndTickets.fulfilled, (state) => {
                state.statusDescription = "Getting successfully";
                state.status = "succeeded";
            })
            .addCase(getOrderAndTickets.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(getWhoIsIn.pending, (state) => {
                state.statusDescription = "Getting...";
                state.status = "loading";
            })
            .addCase(getWhoIsIn.fulfilled, (state) => {
                state.statusDescription = "Getting successfully";
                state.status = "succeeded";
            })
            .addCase(getWhoIsIn.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(getTickets.pending, (state) => {
                state.statusDescription = "Getting...";
                state.status = "loading";
            })
            .addCase(getTickets.fulfilled, (state) => {
                state.statusDescription = "Getting successfully";
                state.status = "succeeded";
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            });
    }
});

export const { setUser, setServerUrl, setStatus, setStatusDescription, logout } = authSlice.actions;

export default authSlice.reducer;
