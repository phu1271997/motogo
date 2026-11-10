# ClaimBot — Presentation

> Motorbike insurance claims that pay out in 90 seconds, not 4 weeks.
> A working demo of the problem [Rialo](https://rialo.io) is built to solve.

**Live app:** https://rialo-claimbot-five.vercel.app
**Code:** https://github.com/phu1271997/motogo
**Chain:** Ethereum Sepolia (testnet)

---

## Slide 1 — The problem

Buying motorbike insurance is easy. **Getting paid after a crash is not.**

Today, a claim takes **2 to 4 weeks**:

- You fill out paper forms.
- A human adjuster looks at your photos.
- The money moves slowly through a bank.
- You wait, call, and wait some more.

For a small claim (a broken headlight, a snapped mirror), the wait is longer than the repair.

**People need small claims paid fast. The old system is too slow and too manual.**

---

## Slide 2 — Our solution

**ClaimBot: file a claim in 90 seconds. AI decides. Money settles on-chain.**

1. You buy a policy and pay the premium in USDC (a digital dollar).
2. After a crash, you upload one photo of the damage and write what happened.
3. **Four AI agents** check the claim automatically.
4. If approved, USDC lands in your wallet the moment the decision is signed.

No forms. No phone calls. No waiting weeks.

---

## Slide 3 — How it works: the four AI agents

The claim passes through four agents, one after another. Each has **one job**:

| Agent | Job |
|---|---|
| **Extractor** | Reads the photo — what vehicle, which parts are broken, how bad. |
| **Verifier** | Cross-checks the vehicle registry, photo metadata, and the weather at that time. |
| **Estimator** | Prices the repair using a local parts table. |
| **Judge** | Combines the three results and makes the final call: approve or reject. |

The **Judge is plain code, not AI** — the step that moves money must be exact and repeatable.

---

## Slide 4 — When the AI is not sure: a human steps in

AI is not always confident. A blurry photo, an unclear plate — these are hard.

**If the AI's confidence is low, we do not auto-reject.** Instead:

- The claim is sent to a **human review console**.
- A person sees the photo and all the AI findings on one screen.
- They approve (and set the payout) or reject, by hand.
- The system records their decision on-chain.

**Best of both worlds:** fast machine decisions for clear cases, human judgment for the hard ones.

---

## Slide 5 — Live demo flow (what the judges will see)

1. **Connect wallet** and **buy a plan** (1 USDC premium → 20 USDC cover).
2. **Upload a damage photo** and describe the crash.
3. Watch the claim move through the pipeline: *Submitted → Reading photo → Verifying → Estimating → Judging*.
4. **Clear case:** approved automatically, USDC paid in seconds.
5. **Unclear case:** routed to the **Review console**, a human approves it, then it pays.
6. A live **Dashboard** shows all claims, payouts, and agent health in real time.

Everything above already runs on the deployed site, on real Sepolia.

---

## Slide 6 — What we built

- **Smart contracts** (Solidity, on Sepolia): policies, claims, payouts, and a safety refund.
- **Four-agent AI pipeline** (Claude vision + rules).
- **Human-in-the-loop review console** for low-confidence claims.
- **Real-time dashboard** with on-chain metrics and charts.
- **Photo storage** that works with or without a paid pinning service.

Safety built in: every payout is capped at the policy's remaining cover, and if the system ever stalls, the claim is **automatically refunded after 48 hours**.

---

## Slide 7 — The honest hard part

To make this work on a normal blockchain, we had to bolt on a lot of extra parts:

- A service to let the contract **call outside APIs** (weather, registry, AI).
- A separate service to **run tasks on a schedule** (the 48h refund).
- A **backend server** running 24/7 to drive the pipeline.
- A **trusted key** that signs the verdicts.

That is about **2,000 lines of code across 5 services** — and most of it is *plumbing*, not the actual insurance logic. The trusted key is also a weak spot.

---

## Slide 8 — Why this is a perfect fit for Rialo

ClaimBot needs four things a normal chain can't do on its own. **Rialo has all four built in:**

| ClaimBot needs | On Rialo it is native |
|---|---|
| Call outside APIs (AI, weather, registry) | **Native webcall** — one line inside the contract |
| React the moment a claim is filed | **Reactive transactions** — no backend, no bot |
| A 48-hour refund timer | **Native timer** — inside the contract |
| Pay AI agents in a trustworthy way | **SCALE** — escrow + judging, on-chain, no trusted key |

**Result on Rialo:** the same product shrinks from ~2,000 lines / 5 services to about **500 lines / 1 contract**, and the trusted key disappears.

> In one line: ClaimBot is exactly the kind of "touches the real world" app (APIs + timers + AI agents + payouts) that Rialo was built to make simple.

*(Note: Rialo mainnet is not public yet, so this is our migration path — not deployed there today.)*

---

## Slide 9 — Status & ask

**Working today, on Ethereum Sepolia:**

- Contracts live and verified on Etherscan.
- Full flow tested end-to-end: buy → claim → AI verdict → payout.
- Human review path tested live (low-confidence claim → human approve → paid).
- Dashboard and review console deployed.

**The vision:** fair, instant micro-insurance for the millions of people who ride motorbikes every day — and a clear example of why the next generation of real-world apps belongs on a chain like Rialo.

**Thank you. Questions?**

---

### Appendix — key facts for Q&A

- **Premium / cover tiers:** $1 → $20, $3 → $80, $5 → $200 (test USDC).
- **Decision time:** ~90 seconds for a clear claim.
- **Safety:** payout capped at remaining cover; 48h auto-refund if the pipeline stalls.
- **Confidence threshold:** below 70% (and above 40%, no fraud signal) → sent to a human reviewer.
- **Contracts (Sepolia):** PolicyManager, ClaimRegistry, PayoutVault, ClaimAutomation — all verified on Etherscan.
- **Stack:** Solidity + Foundry · Next.js + wagmi/RainbowKit · Claude (Anthropic) vision · TypeScript agent pipeline.
