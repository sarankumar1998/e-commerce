import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false, 
        error: null,
        modalVisible: false,
        selectedImg: null
    },
    reducers: {
        getUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        getUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setModalVisible: (state, action) => {
            state.modalVisible = action.payload;
        },
        setSelectedImg: (state, action) => {
            state.selectedImg = action.payload;
        },
    },
});

export const  getAllData = (state) => state.users;

export const { getUsersStart, getUsersSuccess, getUsersFailure, setModalVisible, setSelectedImg } = usersSlice.actions;

export default usersSlice.reducer;
