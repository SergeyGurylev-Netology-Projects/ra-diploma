import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { appAPI, fetchStatus, type CartItem, type Order } from '../app/index'
export const LOCAL_STORAGE_KEY = 'BosaNoga.cartItems';

export interface CartState extends fetchStatus {
  items: CartItem[]
}

const initialState: CartState = {
  // @ts-expect-error any explain
  items: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [],
  status: "none",
}

const fetchPutOrder = createAsyncThunk(
  "cart",
  async (...args: Parameters<typeof appAPI.putOrder>) => {
    const response = await appAPI.putOrder(...args);
    return response;
  },
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(
        el => el.id === action.payload.id && el.size === action.payload.size);

      if (index === -1) {
        state.items = [...state.items, action.payload];
      } else {
        state.items[index].amount += action.payload.amount;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.status = "none";
    },
    setOrderComplete: (state) => {
      state.items = [];
      state.status = "complete";
    },
    setOrderNone: (state) => {
      state.status = "none";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPutOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPutOrder.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(fetchPutOrder.rejected, (state) => {
        state.status = "failed";
      })
  },
})

export const cartActions = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart;

export const putOrder = (order: Order): AppThunk => (dispatch) => dispatch(fetchPutOrder(order));

export default cartSlice.reducer;
