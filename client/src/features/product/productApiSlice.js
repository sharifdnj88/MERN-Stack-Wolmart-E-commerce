import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// get all Brand
export const getAllBrand = createAsyncThunk("product/getAllBrand", async () => {
    try {
        const response = await axios.get("http://localhost:5050/api/v1/brand", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Create Brand
export const createBrand = createAsyncThunk("product/createBrand", async (data) => {
    try {
        const response = await axios.post("http://localhost:5050/api/v1/brand", data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Delete Brand
export const deleteBrand = createAsyncThunk("product/deleteBrand", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5050/api/v1/brand/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// get all Product Tag
export const getAllProductTag = createAsyncThunk("product/getAllProductTag", async () => {
    try {
        const response = await axios.get("http://localhost:5050/api/v1/tag", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Create Product Tag
export const createProductTag = createAsyncThunk("product/createProductTag", async (data) => {
    try {
        const response = await axios.post("http://localhost:5050/api/v1/tag", data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Delete Product Tag
export const deleteProductTag = createAsyncThunk("product/deleteProductTag", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5050/api/v1/tag/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// get all Product Categories
export const getAllProductCategories = createAsyncThunk("product/getAllProductCategories", async () => {
    try {
        const response = await axios.get("http://localhost:5050/api/v1/category", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Create Product Category
export const createProductCategory = createAsyncThunk("product/createProductCategory", async (data) => {
    try {
        const response = await axios.post("http://localhost:5050/api/v1/category", data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


// Delete Product Tag
export const deleteProductCategory = createAsyncThunk("product/deleteProductCategory", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5050/api/v1/category/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


// get all Products
export const getAllProducts = createAsyncThunk("product/getAllProducts", async () => {
    try {
        const response = await axios.get("http://localhost:5050/api/v1/product", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


// Create Product Category
export const createProduct = createAsyncThunk("product/createProduct", async (data) => {
    try {
        const response = await axios.post("http://localhost:5050/api/v1/product", data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});