import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "productItems",
    initialState: {
        productItems: [],
        isloading: false,
        error: null,
        searchProduct:""
    },
    reducers: {
        getProductStart: (state) => {
            state.isloading = true
            state.error = null
        },
        getProductSuccess: (state, action) => {
            state.isloading = false
            state.productItems = action.payload
        },
        getProductFailure: (state, action) => {
            state.isloading = false;
            state.error = action.payload;
        },
        getProductSearch:(state, action) => {
            state.isloading= false
            state.searchProduct = action.payload
        }
    }
})

export const getAllProducts = (state) => state.productItems
export const { getProductStart, getProductSuccess, getProductFailure,getProductSearch } = productSlice.actions;
export default productSlice.reducer