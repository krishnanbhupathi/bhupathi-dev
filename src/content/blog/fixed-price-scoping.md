# How I Scope Fixed-Price Projects Without Losing Money

*January 2026 · Process*

---

Hourly billing is comfortable for the engineer and terrifying for the client.

"How long will this take?" "Hard to say — maybe 6 weeks, maybe 10." That answer costs you the project. The founder on the other end of that Zoom call isn't worried about your estimate being wrong. They're worried about writing checks with no end date.

I switched to fixed-price scoping 18 months ago. Since then, I've quoted 14 projects, delivered 12 on time and on budget, and come in under estimate on 8. The other 2 ran over — but because the scope was fixed, the overrun was my problem, not the client's. One cost me about a week of uncompensated work. The other, two days. Neither client knew.

Here's the framework I use. It's not magic — it's a checklist I run before quoting that catches the scope traps that burn most freelancers.

## The discovery call: 30 minutes that save 30 hours

Every project starts with a 30-minute call. Not a requirements gathering session — those happen after the quote is accepted. The discovery call answers one question: can I estimate this accurately enough to quote a fixed price?

I ask five questions on every call:

**"What does the user do with this?"** Not "what features do you want" — that gets you a laundry list. I want the user journey. "A vendor uploads a PDF, the system parses it, and an ops person approves the extracted data in Slack." That's a scope I can estimate. "We need an AI-powered document processing platform" is a pitch, not a scope.

**"What exists today?"** Am I building from zero or integrating with existing systems? If there's an existing database, I need to know the schema. If there's an existing API, I need to see the docs. Integration work is the #1 source of estimate overruns because the other system never behaves the way the docs say it will.

**"What's the hardest part, in your opinion?"** Founders usually know where the complexity lives. If they say "the Stripe integration" and I've done 6 Stripe integrations, I can estimate that confidently. If they say "the compliance audit trail" and I've never built for SOC 2, I need to factor in learning time or bring in someone who has.

**"What does done look like?"** Deployed to production? Handed off as a repo? Running with monitoring and alerts? "Done" for a startup founder often means "live and generating revenue." "Done" for a CTO at a Series B means "merged into our monorepo, passing CI, with tests and documentation." These are wildly different amounts of work.

**"What's your budget range?"** I ask this directly. Some freelancers think it's taboo — I think it's respectful. If their budget is $3,000 and the project is clearly $15,000 of work, I'd rather tell them now than waste a week writing a proposal they'll reject. I've had multiple clients come back months later with a larger budget because I was honest the first time.

## The estimation spreadsheet

After the discovery call, I break the project into deliverables (not tasks — deliverables). A deliverable is something the client can see, touch, or test. "User authentication flow" is a deliverable. "Set up JWT middleware" is a task — the client doesn't care about it independently.

For each deliverable, I estimate three numbers:

- **Best case**: Everything goes smoothly, no surprises, I've done this exact thing before.
- **Expected case**: Normal friction — a few API quirks, a design change, one round of feedback.
- **Worst case**: Real problems — undocumented API behavior, a requirement I misunderstood, a third-party service that's flaky.

The formula: `(best + 4 × expected + worst) / 6`

This is a PERT estimate — it weights the expected case heavily but accounts for tail risk. In practice, it gives me a number that's about 20% above my gut estimate, which is exactly the buffer I need.

I sum the deliverable estimates, add a 10% integration buffer (things always take longer when you connect them together), and that's my hours estimate. Multiply by my internal rate, and that's the quote.

<!-- diagram:scoping-flow -->

## The scope document

The quote goes to the client as a one-page scope document — not a proposal deck, not a statement of work. One page with four sections:

**What I'm building**: 3-5 bullet points describing the deliverables in plain language. "A multi-bank payment portal with role-based access, signed audit trails, and automated reconciliation." Not "implement RBAC middleware and cryptographic signing service."

**What's included**: Deployment, basic monitoring, 2 weeks of bug-fix support after launch, source code with documentation.

**What's not included**: This is the most important section. Explicitly listing exclusions prevents scope creep. "Does not include: mobile app, admin dashboard beyond the agreed wireframes, integration with banks beyond the 4 specified, or ongoing maintenance after the 2-week support period."

**Price and timeline**: A single number and a delivery date. "$8,500, delivered by March 15th." No hourly breakdown — that invites line-item negotiation. The client is buying an outcome, not hours.

## How I handle scope creep

Scope creep is the fixed-price killer. My defense is simple: the scope document is the contract. If a client asks for something that's not in the document, I say: "That's a great feature — it's outside the current scope. I can add it for $X, which would move the timeline to Y. Want me to include it?"

Crucially, I never say no. I say "yes, and here's what it costs." Most of the time, the client says "let's do it after launch" — which is the right answer anyway. Sometimes they approve the addition. Either way, the scope stays controlled because every addition has a visible price tag.

The tone matters. I'm not being adversarial — I'm being clear. Founders respect clarity because they deal with ambiguity everywhere else.

<!-- diagram:scope-change -->

## The two projects that went over

One was a clinical operations platform where the HIPAA compliance requirements turned out to be significantly more involved than what the client described on the discovery call. My "worst case" hadn't accounted for the audit logging granularity that their compliance officer required. I ate about 40 hours of extra work.

The lesson: for regulated industries (healthcare, finance, insurance), I now add a 20% compliance buffer instead of 10%. And I ask to speak with the compliance person directly during discovery, not just the founder.

The second was an integration with a banking API that had documentation from 2019 and actual behavior from 2024. Every third endpoint returned a different response shape than documented. I'd estimated 2 days for the integration; it took 5.

The lesson: for any project involving third-party API integration, I now spend 2 hours during the estimation phase actually calling the API endpoints with test credentials. If the client can't provide test access before I quote, I add a 30% integration risk buffer and explain why in the scope document.

## Why clients prefer this

Every founder I've worked with has told me some version of the same thing: "I've been burned by hourly billing." They hired someone who estimated 4 weeks, took 12, and the invoice was 3x the original conversation. Fixed-price eliminates that risk.

From my side, it forces me to think before I build. The estimation process — discovery call, PERT estimates, explicit exclusions — catches problems before they become expensive. I spend 3-4 hours scoping a project that might take 4-6 weeks to build. That's a good trade.

And the projects that come in under estimate? That's where the model rewards efficiency. If I quoted $8,500 and finish in 3 weeks instead of 4, the effective hourly rate goes up. Good estimation and efficient execution become profit, not just a faster invoice.

## The framework, summarized

1. **Discovery call** (30 min): Can I estimate this? Five questions to find out.
2. **PERT estimates** per deliverable: (best + 4 × expected + worst) / 6
3. **Buffer**: 10% integration, 20% for regulated industries, 30% for flaky third-party APIs
4. **Scope document** (1 page): What's built, what's included, what's excluded, price + date
5. **Scope additions**: "Yes, and here's what it costs."

No hourly tracking. No surprise invoices. No arguments about what was or wasn't included. Just a number, a date, and a handshake.

---

*If you're evaluating engineers for a fixed-scope project and want to see how I'd scope yours, [send me a brief](mailto:krishnanbhupathi@gmail.com). The discovery call is free and I'll tell you within 30 minutes if I'm the right fit.*
