import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export interface CounterState {
  cartItems: any[];
}

const initialState: CounterState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id,
      );

      const newCart = [...state.cartItems];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id} as it's mot in the basket)`,
        );
      }

      state.cartItems = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotal = (state: RootState) =>
  state.cart.cartItems.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;
