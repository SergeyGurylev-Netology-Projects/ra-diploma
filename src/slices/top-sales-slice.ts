import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { appAPI, fetchStatus, type TopSalesItem } from '../app/index'

export interface TopSalesState extends fetchStatus {
  items: TopSalesItem[]
}

const initialState: TopSalesState = {
  items: [],
  status: "loading",
}

const fetchGetData = createAsyncThunk(
  "top_sales",
  async () => {
    const response = await appAPI.getTopSalesItems();
    return response;
  },
)

const topSalesSlice = createSlice({
  name: 'top-sales',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetData.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload.items;
      })
      .addCase(fetchGetData.rejected, (state) => {
        state.status = "failed";
      })
  },
})

export const selectTopSalesItems = (state: RootState) => state.top_sales;

export const getData = (): AppThunk => (dispatch) => dispatch(fetchGetData());

export default topSalesSlice.reducer;
