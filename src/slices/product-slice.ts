import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { appAPI, fetchStatus, type Product } from '../app/index'

export interface ProductState extends fetchStatus {
  item?: Product
  order: {
    amount: number
    size: string
    availableSizes: string[]
  }
}

const initialState: ProductState = {
  order: {
    amount: 1,
    size: '',
    availableSizes: [],
  },
  status: "loading",
}

const fetchGetData = createAsyncThunk(
  "product",
  async (...args: Parameters<typeof appAPI.getProduct>) => {
    const response = await appAPI.getProduct(...args);
    return response;
  },
)

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setSize: (state, action: PayloadAction<string>) => {
      state.order.size = action.payload;
    },
    decrementAmount: (state) => {
      if (state.order.amount > 1) state.order.amount--;
    },
    incrementAmount: (state) => {
      if (state.order.amount < 10) state.order.amount++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetData.fulfilled, (state, action) => {
        state.status = "idle";
        state.item = action.payload.item;
        state.order.amount = 1;
        state.order.size = '';
        state.order.availableSizes = state.item.sizes
          .filter(size => size.available)
          .map(size => size.size);
      })
      .addCase(fetchGetData.rejected, (state) => {
        state.status = "failed";
      })
  },
})

export const productActions = productSlice.actions;

export const selectProduct = (state: RootState) => state.product;

export const getData = (id: number): AppThunk => (dispatch) => dispatch(fetchGetData({ id: id }));

export default productSlice.reducer;
