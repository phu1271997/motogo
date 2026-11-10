'use client';

import { useState } from 'react';

const ITEMS = [
  {
    q: 'How fast do claims actually pay out?',
    a: 'Most claims settle in under two minutes. You photograph the damage, four AI agents verify and price it, and a signed verdict releases USDC straight to your wallet — no adjuster visit, no call centre, no waiting on a cheque.',
  },
  {
    q: 'Who holds my money?',
    a: 'Nobody. The platform is non-custodial. Premiums sit in an on-chain vault governed by a smart contract, and payouts are released by that contract against a signed verdict. There is no company bank account standing between you and your claim.',
  },
  {
    q: 'What stops a fake or inflated claim?',
    a: 'Every claim is cross-checked against the vehicle registry, the photo EXIF metadata and the weather at the reported time and place. The repair estimate is bounded by a parts-cost table and sanity-checked by an independent model. Payouts can never exceed the policy’s remaining coverage.',
  },
  {
    q: 'What is covered?',
    a: 'Collision, theft, third-party liability, fire and explosion, vandalism, and weather damage — up to the coverage limit of your plan. Wear-and-tear, racing and intentional damage are excluded, as with any motor policy.',
  },
  {
    q: 'Which countries can use it?',
    a: 'The platform is currency- and country-neutral: premiums and payouts are denominated in USDC, so any rider with a wallet can hold a policy regardless of local banking rails.',
  },
  {
    q: 'Is this a real, regulated insurer?',
    a: 'This build is a working testnet demo on Ethereum Sepolia, not a licensed insurance product. It shows the full claims pipeline end-to-end and is designed to migrate to Rialo once mainnet is public.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.03]"
            >
              <span className="font-medium text-slate-200">{item.q}</span>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition ${
                  isOpen ? 'rotate-45 border-accent/40 text-accent' : ''
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
