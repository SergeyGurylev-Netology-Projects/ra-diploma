import { Action, configureStore, createListenerMiddleware, isAnyOf, ThunkAction } from '@reduxjs/toolkit';
import topSalesReducer from '../slices/top-sales-slice';
import catalogReducer from '../slices/catalog-slice';
import categoryReducer from '../slices/category-slice';
import productReducer from '../slices/product-slice';
import cartReducer, { cartActions, LOCAL_STORAGE_KEY } from '../slices/cart-slice';

const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(cartActions.addItem, cartActions.removeItem, cartActions.setOrderComplete),
  effect: (_, listenerApi) => {
    // @ts-expect-error any explain
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listenerApi.getState().cart.items))
  },
});

export const store = configureStore({
  reducer: {
    top_sales: topSalesReducer,
    catalog: catalogReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
