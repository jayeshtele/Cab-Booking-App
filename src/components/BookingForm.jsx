import {
  CalendarDays,
  Clock3,
  CreditCard,
  LocateFixed,
  MapPin,
  Minus,
  Navigation,
  Plus,
  Route,
  Users,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { popularPlaces } from '../data/cabs.js';
import { resetRideStatus, setPassengers, updateBookingField } from '../store/bookingSlice.js';
import { selectBooking } from '../store/selectors.js';

const paymentMethods = ['UPI', 'Credit card', 'Debit card', 'Cash'];

function FieldLabel({ htmlFor, icon: Icon, children }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-center gap-2 text-sm font-bold text-[#344054]">
      <Icon aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
      {children}
    </label>
  );
}

export default function BookingForm() {
  const booking = useSelector(selectBooking);
  const dispatch = useDispatch();
  const today = new Date().toISOString().slice(0, 10);

  const updateField = (field, value) => {
    dispatch(updateBookingField({ field, value }));
    dispatch(resetRideStatus());
  };

  return (
    <section className="rounded-[8px] border border-[#dfe7f1] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3 border-b border-[#edf2f7] pb-4">
        <div>
          <h2 className="text-xl font-black text-[#101828]">Ride details</h2>
          <p className="mt-1 text-sm text-[#667085]">Pickup, drop, schedule, and payment.</p>
        </div>
        <span className="rounded-[8px] bg-[#fff7e6] px-3 py-1 text-sm font-bold text-[#9a5b00]">
          {booking.rideStatus}
        </span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div>
          <FieldLabel htmlFor="pickup" icon={LocateFixed}>
            Pickup
          </FieldLabel>
          <div className="field-shell">
            <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-[#00a878]" />
            <input
              id="pickup"
              list="popular-places"
              className="field-control"
              value={booking.pickup}
              onChange={(event) => updateField('pickup', event.target.value)}
              placeholder="Enter pickup location"
            />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="dropoff" icon={Navigation}>
            Drop
          </FieldLabel>
          <div className="field-shell">
            <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-[#ef4444]" />
            <input
              id="dropoff"
              list="popular-places"
              className="field-control"
              value={booking.dropoff}
              onChange={(event) => updateField('dropoff', event.target.value)}
              placeholder="Enter drop location"
            />
          </div>
        </div>

        <datalist id="popular-places">
          {popularPlaces.map((place) => (
            <option value={place} key={place} />
          ))}
        </datalist>

        <div>
          <FieldLabel htmlFor="date" icon={CalendarDays}>
            Date
          </FieldLabel>
          <div className="field-shell">
            <input
              id="date"
              type="date"
              min={today}
              className="field-control"
              value={booking.date}
              onChange={(event) => updateField('date', event.target.value)}
            />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="time" icon={Clock3}>
            Time
          </FieldLabel>
          <div className="field-shell">
            <input
              id="time"
              type="time"
              className="field-control"
              value={booking.time}
              onChange={(event) => updateField('time', event.target.value)}
            />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="payment" icon={CreditCard}>
            Payment
          </FieldLabel>
          <div className="field-shell">
            <select
              id="payment"
              className="field-control"
              value={booking.paymentMethod}
              onChange={(event) => updateField('paymentMethod', event.target.value)}
            >
              {paymentMethods.map((method) => (
                <option key={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="passengers" icon={Users}>
            Passengers
          </FieldLabel>
          <div className="flex min-h-12 items-center justify-between gap-3 rounded-[8px] border border-[#d8e0ea] bg-white px-3">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#eef4ff] text-[#155eef] transition hover:bg-[#dce8ff]"
              onClick={() => dispatch(setPassengers(booking.passengers - 1))}
              aria-label="Decrease passengers"
              title="Decrease passengers"
            >
              <Minus aria-hidden="true" className="h-4 w-4" />
            </button>
            <output id="passengers" className="min-w-20 text-center text-lg font-black text-[#101828]">
              {booking.passengers}
            </output>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#eef4ff] text-[#155eef] transition hover:bg-[#dce8ff]"
              onClick={() => dispatch(setPassengers(booking.passengers + 1))}
              aria-label="Increase passengers"
              title="Increase passengers"
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <FieldLabel htmlFor="distance" icon={Route}>
          Route distance
        </FieldLabel>
        <div className="rounded-[8px] border border-[#d8e0ea] bg-[#f8fafc] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-[#526071]">Estimate</span>
            <output className="text-base font-black text-[#101828]">{booking.estimatedDistance.toFixed(1)} km</output>
          </div>
          <input
            id="distance"
            type="range"
            min="2"
            max="42"
            step="0.2"
            value={booking.estimatedDistance}
            onChange={(event) => updateField('estimatedDistance', Number(event.target.value))}
            className="mt-3 h-2 w-full accent-[#155eef]"
          />
        </div>
      </div>
    </section>
  );
}
