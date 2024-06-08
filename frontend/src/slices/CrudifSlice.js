import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
const PostAdapter = createEntityAdapter({
  selectId: (post) => post._id,
});

export const PostSlice = createSlice({
  name: "post",
  initialState: PostAdapter.getInitialState({
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(FetchPost.fulfilled, (state, action) => {
      PostAdapter.upsertMany(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(FetchPost.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(AddnewPost.fulfilled, (state, action) => {
      action.payload.date = new Date().toISOString();
      PostAdapter.addOne(state, action.payload);
    });
    builder.addCase(UpdatePost.fulfilled, (state, action) => {
      if (!action.payload?._id) {
        console.log("Updation error");
        return;
      }
      PostAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(DeletePost.fulfilled, (state, action) => {
      const { id } = action.payload;
      PostAdapter.removeOne(state, id);
    });
  },
});
const baseUrl = "http://127.0.0.1:5000";
export const FetchPost = createAsyncThunk("/getPost", async () => {
  const response = await axios.get(`${baseUrl}/post`);
  const result = await response.data;
  return result;
});
export const AddnewPost = createAsyncThunk("/newpost", async (newpost) => {
  const response = await axios.post(`${baseUrl}/newpost`, newpost);
  return response.data;
});
export const UpdatePost = createAsyncThunk("/updatepost", async (newpost) => {
  const { id } = newpost;
  try {
    const response = await axios.put(`${baseUrl}/updatepost/${id}`, newpost);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const DeletePost = createAsyncThunk("/deletepost", async (newpost) => {
  const { id } = newpost;
  try {
    const response = await axios.delete(`${baseUrl}/deletepost/${id}`);
    if (response.status == 200) {
      return newpost;
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.error(error);
  }
});

export const { selectAll, selectById, selectIds } = PostAdapter.getSelectors(
  (state) => state.post
);

export const PostStatus = (state) => state.post.status;
