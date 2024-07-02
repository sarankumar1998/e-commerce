import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartById: [],
    isLoading: true,
    error: null,
    addMoreQuantity: [],
    removeMoreQuantity: []
};

const cartSlice = createSlice({
    name: 'cartById',
    initialState,
    reducers: {

        // view cart by userId
        getCartStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getCartSuccess: (state, action) => {
            state.isLoading = false;
            state.cartById = action.payload;
            state.error = null;
        },
        getCartFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // add quantity from cart 
        setaddMoreQuantityStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setaddMoreQuantitySuccess: (state, action) => {
            state.isLoading = false;
            state.addMoreQuantity.push(action.payload);
            state.error = null;
        },
        setaddMoreQuantityFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        // remove quantity from cart 
        setRemoveQuantityStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setRemoveQuantitySuccess: (state, action) => {
            state.isLoading = false;
            state.removeMoreQuantity.push(action.payload);
            state.error = null;
        },
        setRemoveQuantityFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { getCartStart, getCartSuccess, getCartFailure, setaddMoreQuantityStart, setaddMoreQuantitySuccess, setaddMoreQuantityFailure, setRemoveQuantityStart, setRemoveQuantitySuccess, setRemoveQuantityFailure } = cartSlice.actions;
export const selectCartById = state => state.cartById;
export default cartSlice.reducer;
