import { offers } from '../data/cabs.js';

export function getOffer(code) {
  return offers.find((offer) => offer.id === code) || null;
}

export function calculateFare(cab, distance, promoCode) {
  const subtotal = Math.round(cab.baseFare + cab.perKm * distance);
  const offer = getOffer(promoCode);
  let discount = 0;

  if (offer?.discountType === 'percent') {
    discount = Math.min(Math.round((subtotal * offer.discountValue) / 100), offer.maxDiscount);
  }

  if (offer?.discountType === 'flat') {
    discount = Math.min(offer.discountValue, subtotal);
  }

  const taxes = Math.round((subtotal - discount) * 0.05);
  const total = Math.max(0, subtotal - discount + taxes);

  return {
    subtotal,
    discount,
    taxes,
    total,
  };
}
