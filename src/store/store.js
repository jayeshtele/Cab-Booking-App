import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice.js';
import themeReducer from './themeSlice.js';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    theme: themeReducer,
  },
});
