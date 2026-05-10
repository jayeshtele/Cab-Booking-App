import { BadgePercent, CheckCircle2, Copy, Sparkles, TicketPercent } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader.jsx';
import { offers } from '../data/cabs.js';
import { applyOffer, resetRideStatus } from '../store/bookingSlice.js';
import { selectBooking } from '../store/selectors.js';

export default function Offers() {
  const booking = useSelector(selectBooking);
  const dispatch = useDispatch();

  const activateOffer = (offerId) => {
    dispatch(applyOffer(offerId));
    dispatch(resetRideStatus());
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Rewards"
        title="Offers"
        description="Ride codes for city, airport, and electric trips."
        action={
          <div className="flex items-center gap-2 rounded-[8px] bg-[#101828] px-4 py-3 text-sm font-bold text-white">
            <TicketPercent aria-hidden="true" className="h-5 w-5 text-[#ffb020]" />
            Active: {booking.promoCode}
          </div>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => {
          const active = offer.id === booking.promoCode;

          return (
            <article
              key={offer.id}
              className={[
                'rounded-[8px] border bg-white p-5 shadow-sm transition',
                active ? 'border-[#155eef] ring-4 ring-[#155eef]/10' : 'border-[#dfe7f1]',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] text-white"
                  style={{ backgroundColor: offer.color }}
                >
                  <BadgePercent aria-hidden="true" className="h-6 w-6" />
                </span>
                {active ? (
                  <span className="flex items-center gap-1.5 rounded-[8px] bg-[#e8f7ef] px-2.5 py-1 text-xs font-black text-[#057647]">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                    Applied
                  </span>
                ) : null}
              </div>

              <h2 className="mt-5 text-xl font-black text-[#101828]">{offer.title}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[#526071]">{offer.description}</p>

              <div className="mt-5 flex items-center justify-between gap-3 rounded-[8px] bg-[#f8fafc] px-3 py-2">
                <span className="flex min-w-0 items-center gap-2 font-black text-[#101828]">
                  <Copy aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
                  {offer.id}
                </span>
                <span className="text-xs font-bold text-[#667085]">{offer.expires}</span>
              </div>

              <button
                type="button"
                onClick={() => activateOffer(offer.id)}
                className={[
                  'mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] px-4 text-sm font-black transition',
                  active
                    ? 'bg-[#e8f7ef] text-[#057647]'
                    : 'bg-[#155eef] text-white hover:bg-[#0f49bd]',
                ].join(' ')}
              >
                <Sparkles aria-hidden="true" className="h-4 w-4" />
                {active ? 'Offer active' : 'Apply offer'}
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}
