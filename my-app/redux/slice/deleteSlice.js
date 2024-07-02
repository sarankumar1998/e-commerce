import { createSlice } from "@reduxjs/toolkit";

export const deleteSlice = createSlice({
    name:"deletedItems",
    initialState:{
        deletedItems:[],
        isLoading:false,
        error:null
    },
    reducers:{
        
        deleteStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteSuccess: (state, action) => {
            state.isLoading = false;
            state.deletedItems.push(action.payload);
            state.error = null;
        },
        deleteFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { deleteStart, deleteSuccess, deleteFailure } = deleteSlice.actions;
export default deleteSlice.reducer;