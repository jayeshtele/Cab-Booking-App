import { CarFront, Leaf, ShieldCheck, Users, Luggage, Clock3 } from 'lucide-react';

const iconMap = {
  car: CarFront,
  leaf: Leaf,
  shield: ShieldCheck,
  users: Users,
};

export default function CabCard({ cab, selected, fare, onSelect }) {
  const Icon = iconMap[cab.icon] || CarFront;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'min-h-[172px] rounded-[8px] border bg-white p-4 text-left shadow-sm transition',
        selected
          ? 'border-[#155eef] ring-4 ring-[#155eef]/10'
          : 'border-[#dfe7f1] hover:border-[#155eef] hover:shadow-md',
      ].join(' ')}
      aria-pressed={selected}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] text-white"
          style={{ backgroundColor: cab.accent }}
        >
          <Icon aria-hidden="true" className="h-6 w-6" />
        </span>
        <span className="rounded-[8px] bg-[#f2f4f7] px-2.5 py-1 text-xs font-bold text-[#475467]">
          {cab.tag}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-black text-[#101828]">{cab.name}</h3>
        <p className="text-sm font-semibold text-[#667085]">{cab.type}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#526071]">
        <span className="flex items-center gap-1.5">
          <Users aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
          {cab.seats}
        </span>
        <span className="flex items-center gap-1.5">
          <Luggage aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
          {cab.luggage}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock3 aria-hidden="true" className="h-4 w-4 text-[#155eef]" />
          {cab.eta}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <span className="text-xs font-bold uppercase text-[#7d8a9a]">Estimated fare</span>
        <span className="text-2xl font-black text-[#101828]">Rs {fare.total}</span>
      </div>
    </button>
  );
}
