import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice.js';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});
