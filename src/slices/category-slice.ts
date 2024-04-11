import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { appAPI, type CategoryItem, fetchStatus } from '../app/index'

export interface CategoryState extends fetchStatus {
  items: CategoryItem[]
  active: number
}

const initialState: CategoryState = {
  items: [],
  status: "loading",
  active: -1,
}

const fetchGetData = createAsyncThunk(
  'category',
  async (...args: Parameters<typeof appAPI.getCategoryItems>) => {
    const response = await appAPI.getCategoryItems(...args);
    return response;
  },
)

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    setActive: (state, action: PayloadAction<number>) => {
      state.active = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetData.fulfilled, (state, action) => {
        state.status = "idle";
        state.active = -1;
        state.items = [...[{id: -1, title: 'Все'}], ...action.payload.items];
      })
      .addCase(fetchGetData.rejected, (state) => {
        state.status = "failed";
      })
  },
})

export const categoryActions = categorySlice.actions;

export const selectCategoryItems = (state: RootState) => state.category;

export const getData = (): AppThunk => (dispatch) => dispatch(fetchGetData());

export default categorySlice.reducer;
