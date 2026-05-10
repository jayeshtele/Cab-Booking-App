import { useDispatch, useSelector } from 'react-redux';
import CabCard from './CabCard.jsx';
import { cabOptions } from '../data/cabs.js';
import { selectCab } from '../store/bookingSlice.js';
import { selectBooking } from '../store/selectors.js';
import { calculateFare } from '../utils/fare.js';

export default function CabPicker() {
  const booking = useSelector(selectBooking);
  const dispatch = useDispatch();

  return (
    <section className="rounded-[8px] border border-[#dfe7f1] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-[#101828]">Available cabs</h2>
          <p className="text-sm text-[#667085]">Nearby ride classes for this route.</p>
        </div>
        <span className="text-sm font-bold text-[#155eef]">{cabOptions.length} nearby rides</span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {cabOptions.map((cab) => (
          <CabCard
            key={cab.id}
            cab={cab}
            selected={cab.id === booking.selectedCabId}
            fare={calculateFare(cab, booking.estimatedDistance, booking.promoCode)}
            onSelect={() => dispatch(selectCab(cab.id))}
          />
        ))}
      </div>
    </section>
  );
}
