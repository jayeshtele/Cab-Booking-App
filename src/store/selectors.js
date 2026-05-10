import { cabOptions } from '../data/cabs.js';
import { calculateFare } from '../utils/fare.js';

export const selectBooking = (state) => state.booking;

export const selectSelectedCab = (state) => {
  const booking = selectBooking(state);
  return cabOptions.find((cab) => cab.id === booking.selectedCabId) || cabOptions[0];
};

export const selectFareBreakup = (state) => {
  const booking = selectBooking(state);
  const selectedCab = selectSelectedCab(state);
  return calculateFare(selectedCab, booking.estimatedDistance, booking.promoCode);
};
