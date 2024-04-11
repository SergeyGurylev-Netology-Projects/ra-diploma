import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { appAPI, type CatalogItem, fetchStatus } from '../app/index'

export interface CatalogState extends fetchStatus {
  items: CatalogItem[]
  search: string
  offset: number
  category: number
  isEmpty: boolean
}

const initialState: CatalogState = {
  items: [],
  status: "loading",
  search: '',
  offset: 0,
  category: -1,
  isEmpty: true,
}

const fetchGetData = createAsyncThunk(
  'main-catalog',
  async (...args: Parameters<typeof appAPI.getCatalogItems>) => {
    const response = await appAPI.getCatalogItems(...args);
    return response;
  },
)

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
      state.offset = 0;
      state.isEmpty = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetData.fulfilled, (state, action) => {
        state.status = "idle";
        state.offset = action.payload.offset;
        if (state.offset === 0) {
          state.items = action.payload.items;
        } else {
          state.items = [...state.items, ...action.payload.items];
        }
        state.isEmpty = state.items.length === 0;
      })
      .addCase(fetchGetData.rejected, (state) => {
        state.status = "failed";
      })
  },
})

export const catalogActions = catalogSlice.actions;

export const selectCatalogItems = (state: RootState) => state.catalog;

export const getData =
  (search: string, offset: number, category: number): AppThunk =>
    (dispatch) => {
      dispatch(fetchGetData({ search: search, offset: offset, category: category }));
    }

export default catalogSlice.reducer;
