import { CalendarClock, Gauge, ShieldCheck, WalletCards } from 'lucide-react';
import BookingForm from '../components/BookingForm.jsx';
import CabPicker from '../components/CabPicker.jsx';
import PageHeader from '../components/PageHeader.jsx';
import RouteSummary from '../components/RouteSummary.jsx';

const stats = [
  { label: 'Average pickup', value: '5 min', icon: CalendarClock, tone: '#155eef' },
  { label: 'Active drivers', value: '128', icon: Gauge, tone: '#00a878' },
  { label: 'Safety score', value: '4.9', icon: ShieldCheck, tone: '#7c3aed' },
  { label: 'Wallet balance', value: 'Rs 860', icon: WalletCards, tone: '#d97706' },
];

export default function BookRide() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Cab booking"
        title="Book your next ride"
        description="Mumbai routes, airport transfers, and local commutes."
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="rounded-[8px] border border-[#dfe7f1] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-[#667085]">{stat.label}</span>
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] text-white"
                  style={{ backgroundColor: stat.tone }}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-3 text-2xl font-black text-[#101828]">{stat.value}</p>
            </article>
          );
        })}
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]">
        <div className="flex flex-col gap-6">
          <BookingForm />
          <CabPicker />
        </div>
        <RouteSummary />
      </div>
    </div>
  );
}
