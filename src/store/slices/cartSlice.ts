import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../../types';

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalEvents: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      
      if (!existingItem) {
        state.items.push(action.payload);
        state.totalEvents = new Set(state.items.map(item => item.event.id)).size;
        state.totalPrice = state.items.reduce((total, item) => total + item.outcome.price, 0);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalEvents = new Set(state.items.map(item => item.event.id)).size;
      state.totalPrice = state.items.reduce((total, item) => total + item.outcome.price, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalEvents = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
