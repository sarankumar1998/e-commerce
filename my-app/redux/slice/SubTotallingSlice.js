import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subTotalById: [],
    isLoading: true,
    error: null,

};

const subTotallingSlice = createSlice({
    name: 'subTotalById',
    initialState,
    reducers: {

        // view cart by userId
        getsubTotalStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getsubTotalSuccess: (state, action) => {
            state.isLoading = false;
            state.subTotalById = action.payload;
            state.error = null;
        },
        getsubTotalFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    },
});

export const { getsubTotalStart, getsubTotalSuccess, getsubTotalFailure} = subTotallingSlice.actions;
export const selectSubTotalById = state => state.subTotalById;
export default subTotallingSlice.reducer;
