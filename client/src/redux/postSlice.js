import {createSlice} from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState:{
        posts: null,
        isFetching: false,
        error: false,
    },
    reducers:{
        uploadStart: (state) => {
            state.isFetching = true;
        },
        uploadSuccess: (state,action) =>{
            state.posts = action.payload;
            state.isFetching = false;
            state.error = false;
        }, 
        uploadFail: (state) => {
            state.isFetching= false;
            state.error = true;
        },
        uploadPostSuccess: (state, action) => {
            state.isFetching = false;
            state.posts.push(action.payload);
            state.error = false;
          },

    },
});
export const{
    uploadStart,
    uploadSuccess,
    uploadFail,
    uploadPostSuccess
} = postSlice.actions

export default postSlice.reducer;