import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Items {
  name: string;
  price: number;
}

export interface MenuState {
  items: Items[];
  menuWithPrice?: [];
}

const initialState: MenuState = {
  menuWithPrice: [],
  items: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  reducers: {
    addMenu: (state, action: PayloadAction<Items>) => {
      state.items.push(action.payload);
    },
    removeMenu: (state, action: PayloadAction<{ name: string }>) => {
      state.items = state.items.filter(
        item => item.name !== action.payload.name,
      );
    },
  },
});

export const { addMenu, removeMenu } = menuSlice.actions;
export default menuSlice.reducer;
