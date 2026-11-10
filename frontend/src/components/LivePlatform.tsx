'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Simulated platform telemetry for the marketing homepage. None of this touches
 * the chain — it is a believable "live" surface (counting metrics + an activity
 * feed) so the demo reads like a running insurance product. Everything animates
 * from 0 on the client, so server and first client render agree (no hydration
 * mismatch), then drifts upward on a timer to feel alive.
 */

const CLAIM_TYPES = [
  { label: 'Collision', weight: 0.34, avg: 41 },
  { label: 'Theft', weight: 0.18, avg: 68 },
  { label: 'Third-party', weight: 0.16, avg: 55 },
  { label: 'Fire & explosion', weight: 0.08, avg: 72 },
  { label: 'Vandalism', weight: 0.14, avg: 29 },
  { label: 'Weather damage', weight: 0.10, avg: 37 },
] as const;

const CITIES = [
  'Jakarta', 'Bangkok', 'Manila', 'Lagos', 'São Paulo', 'Mumbai', 'Nairobi',
  'Mexico City', 'Istanbul', 'Cairo', 'Bogotá', 'Karachi', 'Delhi', 'Accra',
  'Lima', 'Dhaka', 'Casablanca', 'Medellín',
];

const VERDICTS = ['approved', 'approved', 'approved', 'approved', 'under review'] as const;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickType() {
  const r = Math.random();
  let acc = 0;
  for (const t of CLAIM_TYPES) {
    acc += t.weight;
    if (r <= acc) return t;
  }
  return CLAIM_TYPES[0];
}

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

function useCountUp(target: number, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      setValue(target * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

interface Activity {
  id: number;
  city: string;
  type: string;
  amount: number;
  verdict: string;
  at: number;
}

function newActivity(id: number): Activity {
  const t = pickType();
  const verdict = pick(VERDICTS);
  const amount = verdict === 'under review' ? 0 : Math.round((t.avg + (Math.random() - 0.5) * 24) * 100) / 100;
  return { id, city: pick(CITIES), type: t.label, amount, verdict, at: Date.now() };
}

function ago(ms: number, now: number): string {
  const s = Math.max(1, Math.round((now - ms) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  return `${m}m ago`;
}

export function LivePlatform() {
  // Base targets for the headline metrics.
  const paid = useCountUp(4_218_450);
  const claims = useCountUp(18_742);
  const policies = useCountUp(9_310);
  const riders = useCountUp(12_480);

  // Live drift + activity feed.
  const [delta, setDelta] = useState({ paid: 0, claims: 0, policies: 0, riders: 0 });
  const [feed, setFeed] = useState<Activity[]>([]);
  const [now, setNow] = useState(0);
  const idRef = useRef(1);

  useEffect(() => {
    // Seed the feed.
    setNow(Date.now());
    setFeed(Array.from({ length: 5 }, () => newActivity(idRef.current++)));

    const feedTimer = setInterval(() => {
      const a = newActivity(idRef.current++);
      setFeed((prev) => [a, ...prev].slice(0, 6));
      setDelta((d) => ({
        paid: d.paid + (a.amount || 0),
        claims: d.claims + (a.verdict === 'under review' ? 0 : 1),
        policies: d.policies + (Math.random() < 0.4 ? 1 : 0),
        riders: d.riders + (Math.random() < 0.3 ? 1 : 0),
      }));
    }, 3800);

    const clock = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(feedTimer);
      clearInterval(clock);
    };
  }, []);

  const metrics = [
    { label: 'Total claims paid out', value: `${Math.round(paid + delta.paid).toLocaleString('en-US')}`, unit: 'USDC' },
    { label: 'Claims settled', value: Math.round(claims + delta.claims).toLocaleString('en-US'), unit: 'all-time' },
    { label: 'Active policies', value: Math.round(policies + delta.policies).toLocaleString('en-US'), unit: 'in force' },
    { label: 'Riders protected', value: Math.round(riders + delta.riders).toLocaleString('en-US'), unit: 'worldwide' },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      {/* Metrics */}
      <div className="card glass-edge relative overflow-hidden p-6 md:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        <div className="flex items-center gap-2 text-sm font-medium text-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Live network activity
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7">
          {metrics.map((m) => (
            <div key={m.label}>
              <dd className="num text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
                {m.value}
                <span className="ml-1.5 text-xs font-medium text-slate-500">{m.unit}</span>
              </dd>
              <dt className="mt-1 text-sm text-slate-500">{m.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Activity feed */}
      <div className="card flex flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-semibold">Recent settlements</span>
          <span className="chip text-[0.65rem]">auto-updating</span>
        </div>
        <ul className="mt-4 flex-1 space-y-2.5">
          {feed.length === 0 ? (
            <li className="text-sm text-slate-600">Connecting to network…</li>
          ) : (
            feed.map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-ink-900/50 px-3 py-2 text-sm"
              >
                <span
                  className={
                    a.verdict === 'approved'
                      ? 'grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 text-xs text-accent'
                      : 'grid h-7 w-7 shrink-0 place-items-center rounded-full bg-signal-warn/15 text-xs text-signal-warn'
                  }
                >
                  {a.verdict === 'approved' ? '✓' : '⋯'}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-slate-300">
                    {a.type} · <span className="text-slate-500">{a.city}</span>
                  </div>
                  <div className="num text-xs text-slate-600">{ago(a.at, now || a.at)}</div>
                </div>
                <div className="num shrink-0 text-right">
                  {a.amount > 0 ? (
                    <span className="font-semibold text-slate-100">{a.amount.toFixed(2)}</span>
                  ) : (
                    <span className="text-xs text-signal-warn">pending</span>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
