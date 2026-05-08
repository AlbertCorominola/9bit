# 9bit — Building Information Technologies

Partner tecnològic. Next.js 14 + TypeScript + Tailwind + i18n (CA/ES/EN) + dark/light theme.

## Quickstart

```bash
npm install
npm run dev
```

Open http://localhost:3000 (redirects to `/ca`).

## Stack

- Next.js 14 App Router
- TypeScript strict
- Tailwind CSS 3
- next-intl (CA/ES/EN)
- next-themes (dark/light)
- Framer Motion
- Three.js (animated shader hero)
- lucide-react

## Structure

```
app/[locale]/         pages per locale
components/
  ui/                 shared UI (Navbar, Footer, Button, ThemeToggle, etc.)
  sections/           landing sections (Hero, Services, Clients, ...)
messages/             ca.json, es.json, en.json
i18n.ts               next-intl config
middleware.ts         locale routing
```

## Notes

- Default locale: `ca`
- Three.js shader respects `prefers-reduced-motion`
- Glassmorphism + neon blue glow theme

## Contact form email

The contact form posts to `/api/contact` and sends mail via [Resend](https://resend.com).
Copy `.env.local.example` to `.env.local` and set:

- `RESEND_API_KEY` — required, from https://resend.com/api-keys
- `CONTACT_TO_EMAIL` — optional, defaults to `hola@9-bit.com`
- `CONTACT_FROM_EMAIL` — must be a Resend-verified domain. For testing before DNS is ready, use `onboarding@resend.dev`.
