import { LifeBuoy, Mail, MessageCircle, Phone, ShieldCheck, WalletCards } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const supportCards = [
  {
    title: 'Ride help',
    detail: 'Trip changes, pickup issues, and driver contact.',
    action: 'Start chat',
    icon: MessageCircle,
    tone: '#155eef',
  },
  {
    title: 'Safety desk',
    detail: 'Route sharing, SOS escalation, and verified rides.',
    action: 'Call safety',
    icon: ShieldCheck,
    tone: '#00a878',
  },
  {
    title: 'Payments',
    detail: 'Fare review, invoices, refunds, and wallet balance.',
    action: 'Open billing',
    icon: WalletCards,
    tone: '#7c3aed',
  },
];

const faqs = [
  ['Can I change my drop location?', 'Yes. Edit the drop location before confirming, then review the updated fare.'],
  ['Where do I see confirmed rides?', 'Confirmed rides appear at the top of My Trips during the current session.'],
  ['How are offers applied?', 'Select an offer on the Offers page and the fare estimate will use that code.'],
];

export default function Support() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Help center"
        title="Support"
        description="Trip, safety, payment, and booking assistance."
      />

      <section className="grid gap-4 md:grid-cols-3">
        {supportCards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.title} className="rounded-[8px] border border-[#dfe7f1] bg-white p-5 shadow-sm">
              <span
                className="grid h-12 w-12 place-items-center rounded-[8px] text-white"
                style={{ backgroundColor: card.tone }}
              >
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-black text-[#101828]">{card.title}</h2>
              <p className="mt-2 min-h-14 text-sm leading-6 text-[#526071]">{card.detail}</p>
              <button
                type="button"
                className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#101828] px-4 text-sm font-black text-white transition hover:bg-[#17243a]"
              >
                <LifeBuoy aria-hidden="true" className="h-4 w-4 text-[#ffb020]" />
                {card.action}
              </button>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
        <div className="rounded-[8px] border border-[#dfe7f1] bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-[#101828]">Common questions</h2>
          <div className="mt-4 divide-y divide-[#edf2f7]">
            {faqs.map(([question, answer]) => (
              <div key={question} className="py-4 first:pt-0 last:pb-0">
                <h3 className="font-black text-[#101828]">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-[#526071]">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[8px] border border-[#dfe7f1] bg-[#101828] p-5 text-white shadow-sm">
          <h2 className="text-xl font-black">Contact</h2>
          <div className="mt-5 grid gap-4 text-sm font-semibold text-[#d0d5dd]">
            <span className="flex items-center gap-3">
              <Phone aria-hidden="true" className="h-5 w-5 text-[#ffb020]" />
              +91 90000 80000
            </span>
            <span className="flex items-center gap-3">
              <Mail aria-hidden="true" className="h-5 w-5 text-[#ffb020]" />
              support@cabswift.app
            </span>
            <span className="flex items-center gap-3">
              <MessageCircle aria-hidden="true" className="h-5 w-5 text-[#ffb020]" />
              Live chat online
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
