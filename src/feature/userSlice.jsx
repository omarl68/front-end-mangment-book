import {
  createAsyncThunk,
  createSelector,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import axios from "axios";
const UserUrl = "http://localhost:3000/user/";
const initialState = {
  users: [],
  status: "idle",
  error: null,
  count: 0,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(UserUrl);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialState) => {
    try {
      const response = await axios.post(UserUrl, initialState);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const login = createAsyncThunk("users/login", async (initialState) => {
  try {
    const response = await axios.post(`${UserUrl}/login`, initialState);
    return response.data;
  } catch (err) {
    return err.message;
  }
});
export const deletePost = createAsyncThunk(
  "users/deleteUser",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${UserUrl}/${id}`);
      if (response?.status === 204) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);
export const updatePost = createAsyncThunk(
  "users/updateUser",
  async (initialState) => {
    const { id } = initialState;
    try {
      const response = await axios.patch(`${UserUrl}/${id}`, initialState);
      return response.data;
    } catch (err) {
      return initialState;
    }
  }
);

const postsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log(action.payload.data.user, "action payload data");
        state.users.push(action.payload.data.user);
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload.data);
        localStorage.setItem("token", action.payload.data);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log(action.payload.data.user);
        // if (!action.payload?.id) {
        //   return;
        // }
        state.users = state.users.map((el) =>
          el?._id === action.payload?.data?.user?._id
            ? { ...action.payload.data.user }
            : el
        );
        console.log(current(state));
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log(action.payload, "testestest");

        // if (!action.payload?.id) {
        //   console.log("Delete could not complete");
        //   console.log(action.payload);
        //   return;
        // }

        state.users = state.users.filter(
          (post) => post._id !== action.payload.id
        );
      });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
export const selectPostsByUser = createSelector(
  [selectAllUsers, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
export const { postAdded, reactionAdded, increaseCount } = postsSlice.actions;
export default postsSlice.reducer;
