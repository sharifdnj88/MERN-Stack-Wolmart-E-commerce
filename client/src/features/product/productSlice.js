import { createSlice } from "@reduxjs/toolkit";
import { createBrand, createProductCategory, createProductTag, deleteBrand, deleteProductCategory, deleteProductTag, getAllBrand, getAllProductCategories, getAllProductTag, getAllProducts } from "./productApiSlice";


// create slice 
const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null,
        brand: null,
        category: null,
        tag: null,
        error: null,
        message: null,
        loader: false
    },
    reducers: {
        setMessageEmpty: (state, action) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBrand.pending, (state, action) => {
            state.loader = true;
        }).addCase(getAllBrand.rejected, (state, action) => {
            state.error = action.error.message;
            state.loader = false;
        }).addCase(getAllBrand.fulfilled, (state, action) => {
            state.brand = action.payload.brands;
            state.loader = false;
        })
        .addCase(createBrand.pending, (state, action) => {
            state.loader = true;
        }).addCase(createBrand.rejected, (state, action) => {
            state.error = action.error.message;
            state.loader = false;
        }).addCase(createBrand.fulfilled, (state, action) => {
            state.brand = state.brand ?? [];
            state.brand.push(action.payload.brand);
            state.message = action.payload.message;
            state.loader = false;
        })
        .addCase(deleteBrand.pending, (state, action) => {
            state.loader = true;
        }).addCase(deleteBrand.rejected, (state, action) => {
            state.error = action.error.message;
            state.loader = false;
        }).addCase(deleteBrand.fulfilled, (state, action) => {
            state.brand = state.brand.filter((data) => (data._id !== action.payload.brand._id) );
            state.message = action.payload.message;
            state.loader = false;
        })
        .addCase(getAllProductTag.pending, (state, action) => {
            state.loader = true;
        }).addCase(getAllProductTag.rejected, (state, action) => {
            state.error = action.error.message;
            state.loader = false;
        }).addCase(getAllProductTag.fulfilled, (state, action) => {
            state.tag = action.payload.tags;
            state.loader = false;
        })
        .addCase(createProductTag.pending, (state, action) => {
            state.loader = true;
        }).addCase(createProductTag.rejected, (state, action) => {
            state.error = action.error.message;
            state.loader = false;
        }).addCase(createProductTag.fulfilled, (state, action) => {
            state.tag = state.tag ?? [];
            state.tag.push(action.payload.tag);
            state.message = action.payload.message;
            state.loader = false;
        })
        .addCase(deleteProductTag.pending, (state, action) => {
            state.loader = true;
        }).addCase(deleteProductTag.rejected, (state, action) => {
            state.error = action.error.message;
            state.loader = false;
        }).addCase(deleteProductTag.fulfilled, (state, action) => {
            state.tag = state.tag.filter((data) => (data._id !== action.payload.tag._id) );
            state.message = action.payload.message;
            state.loader = false;
        })
        .addCase(getAllProductCategories.pending, (state, action) => {
            state.loader = true;
        }).addCase(getAllProductCategories.rejected, (state, action) => {
            state.error = action.error.message;
            state.loader = false;
        }).addCase(getAllProductCategories.fulfilled, (state, action) => {
            state.category = action.payload.categories;
            state.loader = false;
        })
        .addCase(createProductCategory.pending, (state, action) => {
            state.loader = true;
        }).addCase(createProductCategory.rejected, (state, action) => {
            state.error = action.error.message;
            state.loader = false;
        }).addCase(createProductCategory.fulfilled, (state, action) => {
            state.category = state.category ?? [];
            state.category.push(action.payload.category);
            state.message = action.payload.message;
            state.loader = false;
        })
        .addCase(deleteProductCategory.pending, (state, action) => {
            state.loader = true;
        }).addCase(deleteProductCategory.rejected, (state, action) => {
            state.error = action.error.message;
            state.loader = false;
        }).addCase(deleteProductCategory.fulfilled, (state, action) => {
            state.category = state.category.filter((data) => (data._id !== action.payload.category._id) );
            state.message = action.payload.message;
            state.loader = false;
        })
        .addCase(getAllProducts.pending, (state, action) => {
            state.loader = true;
        }).addCase(getAllProducts.rejected, (state, action) => {
            state.error = action.error.message;
            state.loader = false;
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.product = action.payload.products;
            state.loader = false;
        });
    }

});

// selector

// actions
export const { setMessageEmpty } = productSlice.actions;

// export
export default productSlice.reducer;