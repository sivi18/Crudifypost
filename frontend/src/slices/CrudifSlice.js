import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
const PostAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
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
      let min = 1;
      const loadpost = action.payload.map((item) => {
        item.date = sub(new Date(), { minutes: min++ }).toISOString();
        return item;
      });
      PostAdapter.upsertMany(state, loadpost);
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
      if (!action.payload?.id) {
        console.log("Updation error");
        return;
      }
      const updatedPost = { ...action.payload, date: new Date().toISOString() };
      PostAdapter.upsertOne(state, updatedPost);
    });
    builder.addCase(DeletePost.fulfilled, (state, action) => {
      const { id } = action.payload;
      PostAdapter.removeOne(state, id);
    });
  },
});
const baseUrl = "https://jsonplaceholder.typicode.com/posts";
export const FetchPost = createAsyncThunk("/getPost", async () => {
  const response = await axios.get(baseUrl);
  const result = await response.data;
  return result;
});
export const AddnewPost = createAsyncThunk("/newpost", async (newpost) => {
  const response = await axios.post(baseUrl, newpost);
  return response.data;
});
export const UpdatePost = createAsyncThunk("/updatepost", async (newpost) => {
  const { id } = newpost;
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newpost);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const DeletePost = createAsyncThunk("/deletepost", async (newpost) => {
  const { id } = newpost;
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
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
