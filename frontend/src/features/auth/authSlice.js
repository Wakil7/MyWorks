import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

const getProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.get("/user/profile");
            return response.data.user;
        }
        catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Not authenticated"
            );
        }
    }
);

const loginUser = createAsyncThunk(
    "auth/login",
    async({email, password}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.post("/user/login", {email, password});
            return response.data;
        }
        catch (err){
            return rejectWithValue(
                err.response?.data?.message || "Login failed"
            );
        }
    }
);

const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async ({firstName, lastName, bestFriendName}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.post("/user/update-profile", {firstName, lastName, bestFriendName});
            return response.data;
        }
        catch (err){
            return rejectWithValue(
                err.response?.data?.message || "Update profile failed"
            );
        }
    }
);

const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.post("/user/logout");
            return response.data;
        }
        catch(err){
            return rejectWithValue(
                err.response?.data?.message || "Logout failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,
        isAuthenticated: false,
        loading: true,
        message: null,
        error: null,
    },

    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder

        .addCase(getProfile.pending, (state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(getProfile.fulfilled, (state, action)=>{
            state.user = {...state.user, ...action.payload};
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        })

        .addCase(getProfile.rejected, (state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.message = null;
            state.error = null;
        })

        .addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(loginUser.fulfilled, (state, action)=>{
            state.user = {...state.user, ...action.payload.user};
            state.isAuthenticated = true;
            state.loading = false;
            state.message = action.payload.message;
            state.error = null;
        })

        .addCase(loginUser.rejected, (state, action)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })

        .addCase(updateProfile.pending, (state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(updateProfile.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = {...state.user, ...action.payload.user};
            state.isAuthenticated = true;
            state.message = action.payload.message;
            state.error = null;
        })

        .addCase(updateProfile.rejected, (state, action)=>{
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })

        .addCase(logoutUser.pending, (state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        })

        .addCase(logoutUser.fulfilled, (state, action)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.message = action.payload.message;
            state.error = null;
        })

        .addCase(logoutUser.rejected, (state, action)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.message = null;
            state.error = action.payload;
        })
    }
});

export const { clearAuthError } = authSlice.actions;
export {
    getProfile,
    loginUser,
    logoutUser,
    updateProfile
};

export default authSlice.reducer;