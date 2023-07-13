import {createSlice} from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState:{
        posts: null,
        loading: false,
        error: false,
        uploading: false
    },
    reducers:{
        uploadStart: (state) => {
            state.error = false;
            state.uploading = true;
        },
        uploadSuccess: (state,action) =>{
            state.posts = [action.payload, ...state.posts];
            state.uploading = false;
            state.error = false;
        }, 
        uploadFail: (state) => {
            state.uploading= false;
            state.error = true;
        },
        retrievingStart: (state) =>{
            state.loading = true;
            state.error= false;
        },
        retrievingSuccess: (state, action) =>{
            state.posts = action.payload;
            state.loading = false;
            state.error = false;
        },
        retrievingFail: (state) =>{
            state.loading = false;
            state.error = true;
        },

    },
});
export const{
    uploadStart,
    uploadSuccess,
    uploadFail,
    retrievingStart,
    retrievingSuccess,
    retrievingFail,
} = postSlice.actions

export default postSlice.reducer;