import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register User
export const registerUser = createAsyncThunk("auth/registerUser", async (data) => {
    try {
        const response = await axios.post("http://localhost:5050/api/v1/auth/register", data,
        {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Login User
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
    try {
        const response = await axios.post("http://localhost:5050/api/v1/auth/login", data, 
        {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    try {
        const response = await axios.post("http://localhost:5050/api/v1/auth/logout", "",
        {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// get Loggedin User
export const getLoggedInUser = createAsyncThunk("auth/getLoggedInUser", async () => {
    try {
        const response = await axios.get("http://localhost:5050/api/v1/auth/me", 
        {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});