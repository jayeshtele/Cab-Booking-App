import { CalendarCheck, Clock3, MapPin, Navigation, ReceiptText } from 'lucide-react';
import { useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader.jsx';
import { selectBooking } from '../store/selectors.js';

const statusStyles = {
  Upcoming: 'bg-[#eef4ff] text-[#155eef]',
  Completed: 'bg-[#e8f7ef] text-[#057647]',
  Cancelled: 'bg-[#feecec] text-[#b42318]',
};

export default function MyTrips() {
  const { recentTrips } = useSelector(selectBooking);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Trips"
        title="My Trips"
        description="Route, schedule, fare, and booking status."
      />

      <section className="grid gap-4 lg:grid-cols-2">
        {recentTrips.map((trip) => (
          <article key={trip.id} className="rounded-[8px] border border-[#dfe7f1] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#667085]">{trip.id}</p>
                <h2 className="mt-1 text-xl font-black text-[#101828]">{trip.cabName}</h2>
              </div>
              <span
                className={[
                  'rounded-[8px] px-3 py-1 text-sm font-black',
                  statusStyles[trip.status] || 'bg-[#f2f4f7] text-[#526071]',
                ].join(' ')}
              >
                {trip.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-[#e8f7ef] text-[#00a878]">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase text-[#667085]">Pickup</p>
                  <p className="truncate font-bold text-[#101828]">{trip.pickup}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-[#feecec] text-[#ef4444]">
                  <Navigation aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase text-[#667085]">Drop</p>
                  <p className="truncate font-bold text-[#101828]">{trip.dropoff}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 border-t border-[#edf2f7] pt-4 text-sm font-semibold text-[#526071] sm:grid-cols-3">
              <span className="flex items-center gap-2">
                <CalendarCheck aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
                {trip.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
                {trip.time}
              </span>
              <span className="flex items-center gap-2">
                <ReceiptText aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
                Rs {trip.fare}
              </span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
