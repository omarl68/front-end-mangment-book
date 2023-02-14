import {
    createAsyncThunk,
    createSelector,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  const postsUrl = "http://localhost:3000/book";
  const initialState = {
    posts: [],
    status: "idle",
    error: null,
    count: 0,
  };
  
  export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try {
      const response = await axios.get(postsUrl);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return err.message;
    }
  });
  
  export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async (initialState) => {
      try {
        const response = await axios.post(postsUrl, initialState);
        return response.data;
      } catch (err) {
        return err.message;
      }
    }
  );
  export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (initialPost) => {
      const { id } = initialPost;
      try {
        const response = await axios.delete(`${postsUrl}/${id}`);
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
      } catch (err) {
        return err.message;
      }
    }
  );
  export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (initialState) => {
      const { id } = initialState;
      try {
        const response = await axios.put(`${postsUrl}/${id}`, initialState);
        return response.data;
      } catch (err) {
        return initialState;
      }
    }
  );
  
  const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      increaseCount(state, action) {
        state.count = state.count +1 ;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = "succeeded";
          console.log(action.payload.data);
          state.posts = action.payload.data;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
/*           const sortedPosts = state.posts.sort((a, b) => {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
          });
          action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
          action.payload.userId = Number(action.payload.userId);
          action.payload.date = new Date().toISOString();
          action.payload.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          }; */
          console.log(action.payload);
          state.posts.push(action.payload);
        })
        .addCase(updatePost.fulfilled, (state, action) => {
          if (!action.payload?.id) {
            return;
          }
          const { id } = action.payload;
  
          //action.payload.date = new Date().toISOString();
          const posts = state.posts.filter((post) => post.id !== id);
  
          state.posts = [...posts, action.payload];
        })
        .addCase(deletePost.fulfilled, (state, action) => {
          if (!action.payload?.id) {
            console.log("Delete could not complete");
            console.log(action.payload);
            return;
          }
          const { id } = action.payload;
          const posts = state.posts.filter((post) => post.id !== id);
          state.posts = posts;
        });
    },
  });
  
  export const selectAllPosts = (state) => state.posts.posts;
  export const getPostsStatus = (state) => state.posts.status;
  export const getPostsError = (state) => state.posts.error;
  export const getCount = (state) => state.posts.count;
  export const selectPostById = (state, postId) =>
    state.posts.posts.find((post) => post.id === postId);
  export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter((post) => post.userId === userId)
  );
  export const {   postAdded,  reactionAdded, increaseCount } =
    postsSlice.actions;
  export default postsSlice.reducer;
  
