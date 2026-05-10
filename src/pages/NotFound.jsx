import { Link } from 'react-router-dom';
import { Home, MapPinned } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-3xl place-items-center px-4 py-10 text-center">
      <section className="rounded-[8px] border border-[#dfe7f1] bg-white p-8 shadow-sm">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-[8px] bg-[#eef4ff] text-[#155eef]">
          <MapPinned aria-hidden="true" className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-3xl font-black text-[#101828]">Route not found</h1>
        <p className="mt-3 text-[#526071]">This page is not part of the CabSwift booking route.</p>
        <Link
          to="/book"
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-[#155eef] px-5 font-black text-white transition hover:bg-[#0f49bd]"
        >
          <Home aria-hidden="true" className="h-4 w-4" />
          Back to booking
        </Link>
      </section>
    </div>
  );
}
