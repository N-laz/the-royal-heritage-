# The Royal Heritage

A full-stack luxury hotel booking system — Next.js 15 (App Router), TypeScript, Prisma, PostgreSQL (Neon), Tailwind CSS, bcryptjs, jose (JWT sessions), Nodemailer, Zod. Ready for Vercel.

## Features

- Home, Stay listing with filters, room detail with live availability calendar
- 3-step booking wizard (dates & extras → guest details → payment) with live pricing
- Weekend (+12%) and festive (+25%) pricing, promo codes, extras, 18% GST
- Inventory-safe bookings (serializable transactions with retries — no overbooking)
- Confirmation page (print / email), Manage My Booking (lookup + cancel)
- Dining, Wellness, Experiences, Offers, Celebrations, Gallery, About, Contact pages with reservation modals
- Guest Reviews (`/reviews`): star rating form, Verified Guest badge via booking reference, filters & sorting, rating summary; approved reviews also rotate on the home page
- Register / Login / Account (all stays linked by email, one-click "Review this stay")
- Admin dashboard: KPIs, bookings table (search, filter, cancel, CSV export), review moderation (approve / reject / delete), reservations table
- HTML emails: booking confirmation, cancellation, reservation confirmation, welcome, review thank-you

## 1. Requirements

- Node.js 18.18+ (20 LTS recommended)
- A free [Neon](https://neon.tech) PostgreSQL database
- A Gmail account with 2-Step Verification (for an App Password)

## 2. Install

```bash
npm install
```

## 3. Environment variables

Copy the example file and fill it in:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Neon connection string. Use the DIRECT string locally (for `db push` / seed), the POOLED string (`-pooler` in host) on Vercel. Keep `?sslmode=require`. |
| `AUTH_SECRET` | Random string, 32+ characters (`openssl rand -base64 32`). |
| `EMAIL_PROVIDER` | `smtp` to send real emails, `console` to only log them in the terminal. |
| `EMAIL_FROM` | e.g. `The Royal Heritage <you@gmail.com>` — must match `SMTP_USER`. |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` for port 465, `false` for 587 |
| `SMTP_USER` | Your Gmail address |
| `SMTP_PASS` | Gmail App Password (16 characters, no spaces) |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` locally, your Vercel URL in production |

### Gmail App Password

1. Google Account → Security → turn on 2-Step Verification.
2. Open https://myaccount.google.com/apppasswords
3. Create an app password named "Royal Heritage", copy the 16 characters into `SMTP_PASS` without spaces.

## 4. Database

```bash
npm run db:push    # creates all tables
npm run db:seed    # 6 rooms, 5 extras, 4 promo codes, admin user, 4 sample reviews
```

`npm run db:reset` wipes and re-seeds everything.

Admin login after seeding:

- Email: `kazinomanimtiyaz7656@gmail.com`
- Password: `Admin@12345`

## 5. Images

Put your images in `public/img/` as `.webp` files with these exact names:

```
hero  night  aerial  lobby  bathroom  room-ocean  room-club
dining-fine  dining-plates  dining-rooftop  suite-royal  suite-grand
villa-pool  villa-crown  couple-villa  cabana  beach-dinner  spa
hammam  yoga  wedding  ballroom  yacht  desert
```

Example: `public/img/hero.webp`. Recommended width 1600–2400px.

## 6. Run

```bash
npm run dev
```

Open http://localhost:3000

## 7. Deploy to Vercel

1. Push the project to GitHub.
2. Import the repo in Vercel (framework: Next.js — defaults are fine; build runs `prisma generate && next build`).
3. Add all environment variables from `.env` (use the Neon POOLED connection string, and set `NEXT_PUBLIC_APP_URL` to your Vercel domain).
4. Deploy. Tables and seed data already live in Neon from step 4, so nothing else is needed.

## Pricing rules

| Rule | Detail |
| --- | --- |
| Base | Room price per night |
| Weekend | Friday & Saturday nights +12% |
| Festive | 20 Dec – 5 Jan nights +25% (stacks with the weekend uplift on Fri/Sat) |
| Rooms | Nightly total × number of rooms |
| Promo | % discount on the room total |
| Extras | Flat per stay; breakfast = ₹4,500 × guests × nights (skipped when breakfast is included) |
| GST | 18% on (rooms − discount + extras) |

## Promo codes

| Code | Discount | Condition |
| --- | --- | --- |
| `ROYAL10` | 10% | Any room |
| `STAY4` | 20% | Minimum 4 nights |
| `HONEYMOON` | 15% | Suites and Villas |
| `HERITAGE25` | 25% | Villas, minimum 3 nights |

## Test flow

1. `/stay` → choose dates → open a room → Book.
2. Add extras, try `HERITAGE25` on the Oceanfront Pool Villa for 3 nights.
3. Enter guest details → pay by Card (test: 4242 4242 4242 4242, any future expiry, any CVC), UPI, or Pay at Hotel.
4. Confirmation page shows the reference `RH-XXXXXX`; an email is sent.
5. `/my-booking` → enter reference + email → cancel.
6. `/reviews` → write a review (add your booking reference after check-in for a Verified Guest badge).
7. `/login` as admin → `/admin` shows KPIs, bookings, reviews (approve to publish) and reservations.

No real payment is charged — card details are validated and only the last 4 digits are stored.

## Review rules

- New reviews are saved as PENDING and appear publicly only after an admin approves them.
- A booking reference is optional. If given, it must match the email, the booking must not be cancelled and the stay must have begun — then the review is marked Verified Guest.
- One review per booking; max 3 reviews per email per 24 hours.

## Troubleshooting

- **`P1001 Can't reach database`** — check `DATABASE_URL`, keep `?sslmode=require`, and make sure the Neon project isn't paused.
- **`db push` hangs on Neon** — use the DIRECT (non-pooler) connection string locally.
- **Emails not arriving** — `EMAIL_PROVIDER` must be `smtp`; `SMTP_PASS` must be an App Password; check spam. Errors are logged in the terminal but never break a booking.
- **`Invalid login: 535`** — wrong App Password or 2-Step Verification not enabled.
- **Logged out immediately / session errors** — `AUTH_SECRET` must be at least 32 characters and the same on every deployment.
- **Images missing** — confirm the files are `public/img/<name>.webp` (lowercase names).
- **Prisma client errors after schema changes** — run `npx prisma generate`.

## Project structure

```
app/                  Pages and API routes (App Router)
  api/                availability, rooms/[slug]/calendar, pricing/quote, bookings,
                      bookings/lookup, bookings/[ref], bookings/[ref]/cancel,
                      reservations, reviews, newsletter, admin/bookings,
                      admin/reviews/[id], auth/*
components/           ui, layout, home, rooms, booking, reservations, reviews, gallery, auth, admin
lib/                  prisma, auth, jwt, password, pricing, promo, availability, quote,
                      validators, dates, format, ref, booking-view, reviews, admin, http, constants
lib/email/            mailer + 5 HTML templates
prisma/               schema.prisma, seed.ts
middleware.ts         protects /account, /admin, /api/admin
```
