import { createSlice } from '@reduxjs/toolkit';

export const ADD_TO_CART_START = 'cart/addToCartStart';
export const ADD_TO_CART_SUCCESS = 'cart/addToCartSuccess';
export const ADD_TO_CART_FAILURE = 'cart/addToCartFailure';

// Action creators
export const addToCartStart = (payload) => {
    console.log("addToCartStart payload:", payload)
    return{
        type: ADD_TO_CART_START,
        payload,
    }
};

export const addToCartSuccess = (data) => {
    console.log("addToCartSucces payload:", data)
   return{
    type: ADD_TO_CART_SUCCESS,
    payload: data,
   }
};

export const addToCartFailure = (error) => ({
  type: ADD_TO_CART_FAILURE,
  payload: error,
});

// Initial state
const initialState = {
  cart: [],
  loading: false,
  error: null,
};

// Reducer
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
        
      state.cart.push(action.payload);
      state.loading = false;
    },
    addToCartFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});



export default cartSlice.reducer;
