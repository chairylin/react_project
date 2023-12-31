import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { selectUserIds } from "./selectors";
import { LoadingStatuses } from "../constants/statuses";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    if (selectUserIds(thunkAPI.getState()).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response = await fetch("http://localhost:3001/api/users/");
    return await response.json();
  }
);

const userEntityAdapter = createEntityAdapter();

export const userSlice = createSlice({
  name: "user",
  initialState: userEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        userEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
