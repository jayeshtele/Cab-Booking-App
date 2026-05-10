import { createSlice, nanoid } from '@reduxjs/toolkit';
import { cabOptions, tripHistory } from '../data/cabs.js';

const today = new Date().toISOString().slice(0, 10);

const initialState = {
  pickup: 'Chhatrapati Shivaji Terminus',
  dropoff: 'Bandra Kurla Complex',
  date: today,
  time: '18:30',
  passengers: 2,
  paymentMethod: 'UPI',
  selectedCabId: 'city-sedan',
  promoCode: 'CITY20',
  estimatedDistance: 13.6,
  estimatedDuration: 28,
  rideStatus: 'Planning',
  recentTrips: tripHistory,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    updateBookingField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setPassengers(state, action) {
      state.passengers = Math.min(6, Math.max(1, action.payload));
    },
    selectCab(state, action) {
      state.selectedCabId = action.payload;
    },
    applyOffer(state, action) {
      state.promoCode = action.payload;
    },
    confirmRide(state, action) {
      const selectedCab = cabOptions.find((cab) => cab.id === state.selectedCabId);
      state.rideStatus = 'Driver assigned';
      state.recentTrips.unshift({
        id: `TRP-${nanoid(5).toUpperCase()}`,
        pickup: state.pickup,
        dropoff: state.dropoff,
        cabName: selectedCab?.name || 'CabSwift Ride',
        date: state.date,
        time: state.time,
        fare: action.payload.total,
        status: 'Upcoming',
      });
    },
    resetRideStatus(state) {
      state.rideStatus = 'Planning';
    },
  },
});

export const {
  updateBookingField,
  setPassengers,
  selectCab,
  applyOffer,
  confirmRide,
  resetRideStatus,
} = bookingSlice.actions;

export default bookingSlice.reducer;
