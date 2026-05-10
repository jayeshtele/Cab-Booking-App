import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Bell,
  CalendarCheck,
  CarTaxiFront,
  LifeBuoy,
  MapPinned,
  Menu,
  TicketPercent,
  UserRound,
  X,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';

const navigation = [
  { to: '/book', label: 'Book', icon: MapPinned },
  { to: '/trips', label: 'Trips', icon: CalendarCheck },
  { to: '/offers', label: 'Offers', icon: TicketPercent },
  { to: '/support', label: 'Support', icon: LifeBuoy },
];

function NavItem({ item, onClick, compact = false }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'group flex items-center gap-2 rounded-[8px] text-sm font-semibold transition',
          compact ? 'flex-col justify-center px-3 py-2 text-xs' : 'px-3 py-2',
          isActive
            ? 'bg-[#155eef] text-white shadow-sm'
            : 'text-[#526071] hover:bg-[#eef4ff] hover:text-[#155eef]',
        ].join(' ')
      }
    >
      <Icon aria-hidden="true" className={compact ? 'h-5 w-5' : 'h-4 w-4'} />
      <span>{item.label}</span>
    </NavLink>
  );
}

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[#dfe7f1] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <NavLink to="/book" className="flex min-w-0 items-center gap-3" aria-label="CabSwift home">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-[#101828] text-[#ffb020]">
              <CarTaxiFront aria-hidden="true" className="h-6 w-6" />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-extrabold text-[#101828]">CabSwift</span>
              <span className="block truncate text-xs font-medium text-[#667085]">Urban cab booking</span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-[8px] border border-[#d8e0ea] bg-white text-[#526071] transition hover:border-[#155eef] hover:text-[#155eef]"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-[8px] bg-[#101828] px-3 text-sm font-semibold text-white transition hover:bg-[#17243a]"
            >
              <UserRound aria-hidden="true" className="h-4 w-4" />
              Profile
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-[8px] border border-[#d8e0ea] bg-white text-[#17202a]"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            >
              {mobileOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav className="border-t border-[#dfe7f1] bg-white px-4 py-3 md:hidden" aria-label="Mobile navigation">
            <div className="grid grid-cols-2 gap-2">
              {navigation.map((item) => (
                <NavItem key={item.to} item={item} onClick={() => setMobileOpen(false)} />
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main className="pb-24 md:pb-0">
        <Outlet />
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#dfe7f1] bg-white/95 px-3 py-2 backdrop-blur md:hidden"
        aria-label="Bottom navigation"
      >
        <div className="grid grid-cols-4 gap-1">
          {navigation.map((item) => (
            <NavItem key={item.to} item={item} compact />
          ))}
        </div>
      </nav>
    </div>
  );
}
