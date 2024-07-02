import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "getAllCategory",
    initialState: {
        getAllCategory: [],
        isloading: false,
        error: null

    },
    reducers: {
        categoryStart: (state) => {
            state.isloading = true
            state.error = null
        },
        categorySuccess:(state,action)=>{
            state.isloading = false
            state.getAllCategory = action.payload
        
        },
        categoryFailure:(state,action)=>{
            state.error = action.payload;
            state.isloading = false;
        
        }

    }
})


export const {categoryStart,categorySuccess,categoryFailure} = categorySlice.actions
export const  categoriesAllType = (state) => state.getAllCategory;

export default categorySlice.reducer 