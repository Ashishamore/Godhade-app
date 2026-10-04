# Godhade Dairy — training platform prototype

A **frontend-only** prototype of the customised LMS for Godhade Dairy Farm's milk
processing training business. Built to show the client the shape of the product before
any backend work starts.

Two applications live in one codebase:

| | |
|---|---|
| **Student app** | Mobile-first, five bottom tabs. `/` |
| **Admin console** | Web-only, side navigation. `/admin` |

On a desktop the toolbar in the bottom-right switches between them, and switches the
student app between full browser width and a simulated handset.

Nothing is persisted and no payment is taken. All data is demo data in `src/data/`.

## Running it

```bash
npm run dev        # http://localhost:5173 — also exposed on your LAN
npm run build
npm run tunnel     # public https link for showing the client on a phone
```

## Student app

Five tabs, in the order a student actually uses them: **Home · Courses · Calculator ·
My Learning · Profile**.

- **Home** — admin-editable advertisement slider, Godhade sir's welcome video, continue
  learning, quick actions, popular product courses, the residential batch with live seat
  count, written recipes, support and social links.
- **Courses** — three segments: single-product courses (₹2,000), written recipes (₹500),
  and the 3-day residential batch.
- **Calculator** — pick a product and a milk volume; get every ingredient quantity, the
  input cost, expected yield, cost per kg, suggested selling price and margin. Rates are
  editable so a student can enter local prices.
- **My Learning** — in progress, completed, purchased recipes, and the supplier contact
  list (locked until the residential batch is completed).
- **Profile** — language, theme, purchase history, invoices, consent documents, support.

### The flows worth demonstrating

**Buying a course and the upsell chain.** Open a course → Buy → the recording unlocks.
Finish all lessons and the *"this course opens more doors"* panel appears, listing the
products that use it as a base — khawa leads to pedha, barfi, badam shake, kulfi and
mastani; dahi leads to lassi, taak and shrikhand. Finish a **second** course and the
residential-batch upsell appears as well. That two-course gate is the rule from the
brief: anyone can apply for the batch at any time, but the upsell video only shows after
two completions.

**Content protection.** The lesson player carries a forensic watermark (student id and
phone), declares the single-view rule, and listens for PrintScreen and the macOS capture
shortcuts. The first attempt interrupts playback and warns; the second locks the session
with the "contact admin" message. A **Simulate capture attempt** button is on the player
so the flow can be shown on any device. Locked sessions appear on the admin dashboard
with an Unlock action.

> A browser can only detect a few capture signals. In the real app this pairs with a DRM
> stream and platform capture blocking — `FLAG_SECURE` on Android, the screen-capture
> callback on iOS. The prototype shows the UX, not the enforcement.

**Residential admission.** Batch → Apply → details → **Aadhaar upload** → consent →
submit. The application sits at *awaiting approval*; a clearly-marked demo button
simulates the admin approving it, which reveals *pay advance*, and paying confirms the
seat.

## Admin console

**Dashboard** — four KPIs with trend sparklines, a "needs your attention" row generated
from the week's activity, revenue by month (residential vs. online), revenue mix donut,
best-selling courses, enquiry sources by district, the pending-applications queue, next
batch fill rate, and locked video sessions.

**Applications** — the distance rule made operational. Every applicant shows their
district and kilometres from Murgud; anyone inside 60 km is flagged red, because
admitting them builds competition next door. Open a row to review the uploaded Aadhaar
before approving. Approval is blocked until the document is uploaded. Nothing is
auto-rejected — the rule flags, Godhade sir decides.

**Students** — searchable, filterable by attended-batch / repeater / lead. Each profile
shows lifetime spend, purchases, and a full timeline: how they were onboarded, every
purchase, every support conversation.

**Courses** — price editing, publish/hide, lesson counts, units sold. A course can be
hidden but **never deleted**, because purchases and invoices stay attached to it.

**Batches · Recipes · Payments · Support · Marketing · Settings** — batch seats and
revenue, recipe catalogue, Razorpay transaction log, the support inbox with quick
replies, the home slider and WhatsApp templates with a broadcast targeter, and the
settings that matter: batch fee, course and recipe prices, the distance radius, and
whether Aadhaar is mandatory before approval.

## Languages

English, Hindi and Marathi, switchable from the app header or Profile. UI strings live in
[src/i18n/strings.js](src/i18n/strings.js); content carries its own `{en, hi, mr}` fields
in `src/data/`. Product names stay in Devanagari throughout — खवा, पनीर, बासुंदी — because
that is what students call them. Typography falls back to Noto Sans Devanagari.

## Design

Flat by instruction: solid fills, hairline borders, one shadow level, **no gradients
anywhere**. Colour carries meaning rather than decoration — orange for the brand, green reserved for
success, amber for caution, red for the distance-rule and failure states. Product tiles
are a tinted wash with a line icon, which keeps the catalogue recognisable without
needing a photo library.

Colours are semantic tokens (`bg-surface`, `text-ink-2`, `border-line`, `bg-brand-soft`)
mapped to CSS variables redefined under `.dark`, so the whole system re-themes from one
class. Both apps have full dark mode.

Breakpoints are **container queries** (`@wide` 640px, `@desk` 1024px), not viewport
queries, so the student app lays itself out from its container width. That is what lets a
393px phone frame on a 1440px monitor render the genuine mobile layout. If you add a
breakpoint, use `@wide:`/`@desk:` — a `sm:`/`lg:` would respond to the monitor instead.

## Layout

```
src/
  App.jsx                 route map for both apps
  i18n/                   en / hi / mr strings and the provider
  data/
    catalog.js            courses, recipes, batches, slider, contacts
    calculator.js         ingredient ratios, yields and the costing model
    student.js            the signed-in student
    admin.js              students, applications, payments, KPIs
  hooks/
    useStudent.jsx        purchases, progress, capture strikes, application state
    useViewMode.jsx       web ↔ phone frame, device picker
  components/
    AppShell.jsx          student shell + the @container query root
    DeviceFrame.jsx       simulated handset
    admin/AdminShell.jsx  side navigation console
    charts/               hand-rolled SVG charts, no chart library
    ui/                   Button, Card, Badge, Sheet, ProductIcon, …
  screens/student/        Home, Courses, CourseDetail, Player, Calculator, …
  screens/admin/          Dashboard, Admissions, People, Content, Business
```

## What is not real

Payments (Razorpay is not connected), video streaming (the player is a styled stand-in),
Aadhaar verification, WhatsApp sending, file storage, and auth. State lives in memory, so
a reload returns the demo to its starting point — which is useful when walking a client
through the same flow twice.
