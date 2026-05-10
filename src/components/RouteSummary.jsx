import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowRight,
  BadgePercent,
  CalendarClock,
  CarTaxiFront,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Navigation,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { confirmRide } from '../store/bookingSlice.js';
import { selectBooking, selectFareBreakup, selectSelectedCab } from '../store/selectors.js';

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-[#667085]">{label}</span>
      <span className="font-bold text-[#101828]">{value}</span>
    </div>
  );
}

export default function RouteSummary() {
  const booking = useSelector(selectBooking);
  const selectedCab = useSelector(selectSelectedCab);
  const fare = useSelector(selectFareBreakup);
  const dispatch = useDispatch();

  return (
    <aside className="flex flex-col gap-5">
      <section className="map-grid relative min-h-[292px] overflow-hidden rounded-[8px] border border-[#dfe7f1] p-5 shadow-sm">
        <div className="absolute left-12 top-16 h-36 w-1 rounded-full route-line" aria-hidden="true" />
        <div className="relative z-10 flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] bg-[#e8f7ef] text-[#00a878]">
            <MapPin aria-hidden="true" className="h-6 w-6" />
          </span>
          <div className="min-w-0 rounded-[8px] bg-white/90 p-3 shadow-sm">
            <p className="text-xs font-bold uppercase text-[#00a878]">Pickup</p>
            <p className="truncate text-base font-black text-[#101828]">{booking.pickup}</p>
          </div>
        </div>

        <div className="relative z-10 mt-16 flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] bg-[#feecec] text-[#ef4444]">
            <Navigation aria-hidden="true" className="h-6 w-6" />
          </span>
          <div className="min-w-0 rounded-[8px] bg-white/90 p-3 shadow-sm">
            <p className="text-xs font-bold uppercase text-[#ef4444]">Drop</p>
            <p className="truncate text-base font-black text-[#101828]">{booking.dropoff}</p>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 z-10 rounded-[8px] bg-[#101828] px-4 py-3 text-white shadow-lg">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#d0d5dd]">
            <Route aria-hidden="true" className="h-4 w-4 text-[#ffb020]" />
            {booking.estimatedDistance.toFixed(1)} km
          </div>
          <div className="mt-1 text-2xl font-black">Rs {fare.total}</div>
        </div>
      </section>

      <section className="rounded-[8px] border border-[#dfe7f1] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-[#edf2f7] pb-4">
          <div>
            <h2 className="text-xl font-black text-[#101828]">Ride summary</h2>
            <p className="mt-1 text-sm text-[#667085]">{selectedCab.name} arrives in {selectedCab.eta}</p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#101828] text-[#ffb020]">
            <CarTaxiFront aria-hidden="true" className="h-6 w-6" />
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          <SummaryRow label="Schedule" value={`${booking.date} at ${booking.time}`} />
          <SummaryRow label="Passengers" value={booking.passengers} />
          <SummaryRow label="Payment" value={booking.paymentMethod} />
          <SummaryRow label="Subtotal" value={`Rs ${fare.subtotal}`} />
          <SummaryRow label={`Offer ${booking.promoCode}`} value={`- Rs ${fare.discount}`} />
          <SummaryRow label="Taxes" value={`Rs ${fare.taxes}`} />
        </div>

        <div className="mt-5 rounded-[8px] bg-[#f8fafc] p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-bold text-[#526071]">Total payable</span>
            <span className="text-3xl font-black text-[#101828]">Rs {fare.total}</span>
          </div>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-[#526071] sm:grid-cols-2">
            <span className="flex items-center gap-2">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#00a878]" />
              Verified drivers
            </span>
            <span className="flex items-center gap-2">
              <BadgePercent aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
              Offer applied
            </span>
            <span className="flex items-center gap-2">
              <Clock3 aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
              Live ETA
            </span>
            <span className="flex items-center gap-2">
              <CreditCard aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
              Secure payment
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => dispatch(confirmRide(fare))}
          className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#155eef] px-5 text-base font-black text-white shadow-sm transition hover:bg-[#0f49bd]"
        >
          Confirm ride
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </button>

        {booking.rideStatus === 'Driver assigned' ? (
          <div className="mt-4 flex items-center gap-2 rounded-[8px] bg-[#e8f7ef] px-4 py-3 text-sm font-bold text-[#057647]">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
            Driver assigned. Your trip is added to My Trips.
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2 rounded-[8px] bg-[#fff7e6] px-4 py-3 text-sm font-bold text-[#9a5b00]">
            <Sparkles aria-hidden="true" className="h-5 w-5" />
            {booking.promoCode} is active for this estimate.
          </div>
        )}
      </section>
    </aside>
  );
}
