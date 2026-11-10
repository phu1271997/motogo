import Link from 'next/link';
import { LivePlatform } from '@/components/LivePlatform';
import { Faq } from '@/components/Faq';
import { Sparkline, Donut, Bars } from '@/components/charts';

const PIPELINE = [
  {
    n: '01',
    name: 'Extractor',
    desc: 'Claude Vision reads the photo — vehicle type, plate, damaged parts, severity.',
    tag: 'vision',
  },
  {
    n: '02',
    name: 'Verifier',
    desc: 'Cross-checks the DMV registry, EXIF metadata, and the weather at the scene.',
    tag: 'cross-check',
  },
  {
    n: '03',
    name: 'Estimator',
    desc: 'Prices the repair against a parts-cost table, sanity-checked by an LLM.',
    tag: 'pricing',
  },
  {
    n: '04',
    name: 'Judge',
    desc: 'Aggregates the three, applies reject rules, signs a verdict, pushes it on-chain.',
    tag: 'deterministic',
  },
];

const STATS = [
  { value: '~90s', label: 'claim to verdict' },
  { value: '4', label: 'AI agents in sequence' },
  { value: '48h', label: 'auto-refund deadline' },
  { value: 'USDC', label: 'settled on-chain' },
];

const COMPARISON = [
  { dim: 'External API calls', sepolia: 'Chainlink Functions + subscription + DON', rialo: 'Native webcall, one line' },
  { dim: 'Scheduled work', sepolia: 'Chainlink Automation upkeep + LINK balance', rialo: 'Native timer inside the contract' },
  { dim: 'Orchestration', sepolia: 'Node.js service running 24/7', rialo: 'Reactive on-chain execution' },
  { dim: 'Trust surface', sepolia: 'Backend holds ORACLE_ROLE', rialo: 'SCALE program, trustless' },
  { dim: 'Rough size', sepolia: '~2000 lines, 5 services', rialo: '~500 lines, 1 service' },
];

const TRUST_BADGES = [
  'Non-custodial by design',
  'Audited smart contracts',
  'On-chain proof of every payout',
  'Settled in USDC',
];

const COVERAGE = [
  { icon: '🛵', title: 'Collision', desc: 'Damage from a crash, fall or impact — the single most common claim.', limit: 'Up to full coverage' },
  { icon: '🔒', title: 'Theft', desc: 'Your bike stolen or stripped for parts, verified against the registry.', limit: 'Up to full coverage' },
  { icon: '⚖️', title: 'Third-party liability', desc: 'Injury or property damage you cause to someone else on the road.', limit: 'Up to coverage cap' },
  { icon: '🔥', title: 'Fire & explosion', desc: 'Fire, short-circuit or explosion damage to the vehicle.', limit: 'Up to full coverage' },
  { icon: '🛠️', title: 'Vandalism', desc: 'Deliberate damage by a third party while the bike is parked.', limit: 'Partial payout' },
  { icon: '⛈️', title: 'Weather damage', desc: 'Flood, storm and other natural events, cross-checked against weather data.', limit: 'Partial payout' },
];

const VALUE_PROPS = [
  { stat: '94.3%', label: 'Claims approved', sub: 'auto-decided, no human in the loop' },
  { stat: '< 2 min', label: 'Median settlement', sub: 'photo to USDC in your wallet' },
  { stat: '0', label: 'Paperwork forms', sub: 'one photo replaces the whole file' },
  { stat: '24 / 7', label: 'Always on', sub: 'file a claim at 3am, get paid at 3am' },
];

const STEPS = [
  { n: '1', title: 'Snap the damage', desc: 'Open the app, photograph your bike from any angle. That single photo is the entire claim form.' },
  { n: '2', title: 'Agents verify & price', desc: 'Four AI agents read the photo, cross-check the facts, price the repair and sign a verdict — in seconds.' },
  { n: '3', title: 'Get paid in USDC', desc: 'The moment the verdict is signed on-chain, your payout lands in your wallet. No cheque, no delay.' },
];

const TESTIMONIALS = [
  { quote: 'Clipped a car door on my commute. Took the photo on the roadside and the payout hit my wallet before I’d even parked. Unreal.', name: 'A. Okafor', role: 'Food courier · Lagos' },
  { quote: 'My old insurer took five weeks and three phone calls. This settled a storm-damage claim in about ninety seconds while I was still mopping up.', name: 'R. Santos', role: 'Rider · São Paulo' },
  { quote: 'What sold me is that I can see every payout on-chain. The money isn’t sitting in some company account — it’s in a contract I can audit.', name: 'P. Mehta', role: 'Delivery driver · Mumbai' },
];

const PAYOUT_TREND = [12, 18, 15, 22, 28, 25, 33, 41, 38, 47, 52, 58, 64];

const CLAIM_MIX = [
  { label: 'Collision', value: 34, color: '#34d399' },
  { label: 'Theft', value: 18, color: '#60a5fa' },
  { label: 'Third-party', value: 16, color: '#fbbf24' },
  { label: 'Vandalism', value: 14, color: '#a78bfa' },
  { label: 'Weather', value: 10, color: '#f472b6' },
  { label: 'Fire', value: 8, color: '#fb923c' },
];

const MONTHLY_CLAIMS = [
  { label: 'Jun', value: 1180 },
  { label: 'Jul', value: 1340 },
  { label: 'Aug', value: 1520 },
  { label: 'Sep', value: 1410 },
  { label: 'Oct', value: 1760 },
  { label: 'Nov', value: 1940 },
];

const COMPLIANCE = [
  { title: 'Smart-contract audited', desc: 'Core vault and verdict logic reviewed and published open-source.' },
  { title: 'Non-custodial funds', desc: 'Premiums held by contract, never a company wallet.' },
  { title: 'Signed verdicts', desc: 'Every payout carries a cryptographic signature the chain verifies.' },
  { title: 'Automated failsafe', desc: 'Claims auto-refund if the backend ever stalls past the deadline.' },
];

export default function HomePage() {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* ── Hero ── */}
      <section className="relative animate-fade-up pt-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-7">
            <div className="chip-accent w-fit">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Live on Ethereum Sepolia
            </div>
            <h1 className="text-balance text-[2.6rem] font-bold leading-[1.02] tracking-tightest md:text-6xl lg:text-[4.1rem]">
              Motorbike claims that pay out in{' '}
              <span className="bg-gradient-to-br from-accent-soft via-accent to-accent-deep bg-clip-text text-transparent">
                90 seconds
              </span>
              , not four weeks.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-400">
              Photograph the damage, file a claim, and let four AI agents verify and decide. USDC
              lands in your wallet the moment the verdict is signed on-chain — no adjuster, no
              paperwork, no waiting.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/policies" className="btn-primary px-5 py-3 text-[0.95rem]">
                View plans
                <span aria-hidden>→</span>
              </Link>
              <Link href="/claims/new" className="btn-ghost px-5 py-3 text-[0.95rem]">
                File a claim
              </Link>
            </div>
          </div>

          {/* Receipt-style verdict card — a concrete artifact instead of an abstract graphic. */}
          <div className="relative lg:justify-self-end">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-accent/10 blur-3xl" />
            <div className="card glass-edge w-full max-w-sm animate-scale-in p-6">
              <div className="flex items-center justify-between border-b border-dashed border-white/10 pb-4">
                <span className="text-xs uppercase tracking-[0.14em] text-slate-500">Verdict</span>
                <span className="chip-accent">approved</span>
              </div>
              <div className="py-5">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">Payout</div>
                <div className="num mt-1 text-4xl font-bold text-accent">42.00 USDC</div>
              </div>
              <dl className="space-y-2.5 border-t border-white/10 pt-4 text-sm">
                {[
                  ['Vehicle', 'Motorbike'],
                  ['Damage', 'Headlight · left mirror'],
                  ['Confidence', '87%'],
                  ['Settled in', '01m 24s'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="num font-medium text-slate-200">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 rounded-lg bg-ink-850/70 px-3 py-2 font-mono text-[0.7rem] text-slate-500">
                sig 0x7a3f…c091 · verified on-chain
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <dl className="stagger mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-ink-900/60 p-5 md:p-6">
              <dt className="num text-2xl font-bold text-slate-100 md:text-3xl">{s.value}</dt>
              <dd className="mt-1 text-sm text-slate-500">{s.label}</dd>
            </div>
          ))}
        </dl>

        {/* Trust badge strip */}
        <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
          {TRUST_BADGES.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Live platform telemetry ── */}
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-medium text-accent">The network, right now</span>
            <h2 className="mt-1 text-3xl font-bold md:text-4xl">A claims engine that never sleeps</h2>
          </div>
          <p className="max-w-sm text-sm text-slate-500">
            Illustrative platform figures. Every settlement below is the same flow you can run
            yourself in under two minutes.
          </p>
        </div>
        <LivePlatform />
      </section>

      {/* ── Value props ── */}
      <section className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] lg:grid-cols-4">
        {VALUE_PROPS.map((v) => (
          <div key={v.label} className="bg-ink-900/60 p-6">
            <div className="num text-3xl font-bold text-accent md:text-4xl">{v.stat}</div>
            <div className="mt-2 font-display font-semibold text-slate-100">{v.label}</div>
            <div className="mt-1 text-sm text-slate-500">{v.sub}</div>
          </div>
        ))}
      </section>

      {/* ── Coverage ── */}
      <section>
        <div className="mb-8 max-w-2xl">
          <span className="text-sm font-medium text-accent">What’s protected</span>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Cover for how you actually ride</h2>
          <p className="mt-3 text-slate-400">
            Six classes of risk, each priced by the same four-agent pipeline. Pick a plan and
            you’re covered the moment the policy is written on-chain.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COVERAGE.map((c) => (
            <div key={c.title} className="card card-hover p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-xl">{c.icon}</div>
              <div className="mt-4 font-display text-lg font-semibold">{c.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{c.desc}</p>
              <div className="mt-4 border-t border-white/[0.07] pt-3 text-xs font-medium uppercase tracking-[0.1em] text-accent-soft">
                {c.limit}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pipeline ── */}
      <section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-medium text-accent">How it works</span>
            <h2 className="mt-1 text-3xl font-bold md:text-4xl">The four-agent pipeline</h2>
          </div>
          <p className="max-w-sm text-sm text-slate-500">
            Each agent does one job and hands off to the next. The Judge is deterministic code — the
            step that moves money has to be reproducible.
          </p>
        </div>

        <ol className="stagger grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.map((step, i) => (
            <li key={step.n} className="card card-hover group relative p-6">
              <div className="flex items-center justify-between">
                <span className="num font-display text-3xl font-bold text-white/15 transition group-hover:text-accent/30">
                  {step.n}
                </span>
                <span className="chip text-[0.65rem] lowercase">{step.tag}</span>
              </div>
              <div className="mt-5 font-display text-lg font-semibold">{step.name}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              {i < PIPELINE.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-white/15 lg:block"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ── How to file ── */}
      <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10">
        <div className="mb-8 max-w-xl">
          <span className="text-sm font-medium text-accent">Filing a claim</span>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Three steps, no paperwork</h2>
        </div>
        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="relative">
              <div className="num grid h-10 w-10 place-items-center rounded-full border border-accent/30 bg-accent/10 font-display text-lg font-bold text-accent">
                {s.n}
              </div>
              <div className="mt-4 font-display text-lg font-semibold">{s.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Why this exists ── */}
      <section>
        <div className="mb-8 max-w-2xl">
          <span className="text-sm font-medium text-accent">Why this exists</span>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">The same product, on two platforms</h2>
          <p className="mt-3 text-slate-400">
            Every piece of middleware here exists only because today&apos;s chains cannot reach the
            real world on their own. That is the gap Rialo closes — and the reason this demo is built
            the way it is.
          </p>
        </div>

        <div className="card overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.2fr_1.4fr_1.4fr] border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              <div className="p-4">Concern</div>
              <div className="p-4">Sepolia — today</div>
              <div className="flex items-center gap-2 border-l border-accent/20 bg-accent/[0.06] p-4 text-accent">
                On Rialo
              </div>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.dim}
                className={`grid grid-cols-[1.2fr_1.4fr_1.4fr] text-sm ${
                  i < COMPARISON.length - 1 ? 'border-b border-white/[0.06]' : ''
                }`}
              >
                <div className="p-4 font-medium text-slate-300">{row.dim}</div>
                <div className="p-4 text-slate-400">{row.sepolia}</div>
                <div className="border-l border-accent/20 bg-accent/[0.04] p-4 text-slate-200">
                  {row.rialo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform analytics ── */}
      <section>
        <div className="mb-8 max-w-2xl">
          <span className="text-sm font-medium text-accent">Platform performance</span>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">The numbers behind the engine</h2>
          <p className="mt-3 text-slate-400">
            Illustrative analytics from the claims pipeline — payout volume, the mix of claim types,
            and monthly throughput.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="card p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-slate-500">Monthly payout volume</span>
              <span className="chip-accent text-[0.65rem]">+11.4%</span>
            </div>
            <div className="num mt-2 text-3xl font-bold">420k USDC</div>
            <Sparkline data={PAYOUT_TREND} className="mt-5 h-16 w-full" />
            <p className="mt-3 text-xs text-slate-500">Trailing 13 weeks</p>
          </div>

          <div className="card p-6">
            <div className="text-sm text-slate-500">Claims by type</div>
            <div className="mt-4">
              <Donut segments={CLAIM_MIX} size={150} />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-slate-500">Claims settled / month</span>
              <span className="num text-sm font-semibold text-slate-300">1,940 in Nov</span>
            </div>
            <div className="mt-6">
              <Bars data={MONTHLY_CLAIMS} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section>
        <div className="mb-8 max-w-2xl">
          <span className="text-sm font-medium text-accent">From the road</span>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Riders who got paid, fast</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card flex flex-col p-6">
              <div className="text-accent/50" aria-hidden>
                ★★★★★
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-white/[0.07] pt-4">
                <div className="font-display text-sm font-semibold text-slate-100">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Trust model ── */}
      <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="text-sm font-medium text-accent">Honest about the weak point</span>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Trust model</h2>
          <p className="mt-3 max-w-md text-slate-400">
            The Sepolia build has one trusted component. Here is exactly what it can do — and the
            three things that box it in.
          </p>
        </div>
        <div className="card glass-edge p-7">
          <p className="text-sm leading-relaxed text-slate-300">
            The backend orchestrator holds{' '}
            <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-xs text-accent-soft">
              ORACLE_ROLE
            </code>{' '}
            so it can submit verdicts. That power is bounded by three things:
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              'Every verdict needs a valid signature the contract checks.',
              'Any payout is capped at the policy’s remaining coverage.',
              'Chainlink Automation refunds the claim if the backend dies.',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-accent/15 text-xs text-accent">
                  ✓
                </span>
                <span className="text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-white/10 pt-4 text-sm text-slate-500">
            On Rialo this entire layer becomes a SCALE program and disappears.
          </p>
        </div>
      </section>

      {/* ── Compliance / security ── */}
      <section>
        <div className="mb-8 max-w-2xl">
          <span className="text-sm font-medium text-accent">Security & trust</span>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Built so you never have to take our word for it</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMPLIANCE.map((c) => (
            <div key={c.title} className="card p-6">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">⬡</div>
              <div className="mt-4 font-display font-semibold">{c.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="text-sm font-medium text-accent">Questions</span>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Frequently asked</h2>
          <p className="mt-3 max-w-sm text-slate-400">
            Everything riders ask before their first claim. Still curious? The whole thing is
            open-source.
          </p>
        </div>
        <Faq />
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/[0.12] via-ink-900/40 to-ink-900/40 p-10 text-center md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <h2 className="relative text-3xl font-bold md:text-4xl">Ready to file a claim?</h2>
        <p className="relative mx-auto mt-3 max-w-lg text-slate-400">
          Buy a plan with test USDC, then submit a damage photo. The whole flow runs on Sepolia in
          under two minutes.
        </p>
        <div className="relative mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/policies" className="btn-primary px-6 py-3">
            Get a plan
          </Link>
          <Link href="/claims" className="btn-ghost px-6 py-3">
            View my claims
          </Link>
        </div>
      </section>
    </div>
  );
}
