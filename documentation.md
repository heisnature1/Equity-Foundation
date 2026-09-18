# Project Documentation — Equity Bridge Foundation

## Overview

Equity Bridge Foundation is a dedicated human-rights and access-to-justice initiative based in Ghana. The platform delivers accessible, pro bono legal aid guidance, constitutional public legal education, and advocacy reporting for women, underprivileged groups, and marginalized communities facing legal barriers.

The homepage Hero Section has been completely redesigned into a high-impact, prestigious civic portal that immediately clarifies the foundation's mission, builds institutional trust, reduces cognitive friction, and directs users to free legal representation and plain-language rights resources.

---

## Tech Stack

- **Core Framework:** Next.js 16.3.5 (App Router, Server Components)
- **Runtime & UI Library:** React 19.2.8 & React DOM 19.2.8
- **Language:** TypeScript 5
- **Styling:** CSS Custom Properties / HSL design token system + Tailwind CSS v4
- **Icons:** Lucide Icons (`lucide-react` v1.47.0) exclusively — zero emojis throughout
- **Typography:** Google Fonts loaded via `next/font/google`:
  - Display: `Libre_Baskerville` (Editorial Serif, weights 400 & 700)
  - Body: `Manrope` (Clean Sans-Serif, weights 400, 500, 600, 700, 800)
- **Backend / CMS Integration:** Supabase (`@supabase/supabase-js` v2.116.0, `@supabase/ssr` v0.12.7) with resilient fallback to public content defaults.

---

## User Flow

1. **Entry Point (Hero Section):**
   - Visitor lands on `https://www.equitybridgefoundation.org/`.
   - Sees the live status pill: _"Official Public Legal Aid Initiative · Ghana"_.
   - Reads the mission headline: _"Bridging the Gap Between Rights and Justice"_.
   - Within 3 seconds, understands the core purpose through the 3 trust proof metrics:
     - `100% Pro Bono Legal Aid`
     - `16 Regions Reached in Ghana`
     - `24/7 Open Public Legal Guides`
2. **Action Pathways:**
   - **Primary Action:** Clicks `Get Free Legal Help` → navigates directly to the intake form at `/legal-help`.
   - **Educational Action:** Clicks `Know Your Rights` → navigates to plain-language legal topic guides at `/know-your-rights`.
   - **Crisis Escalation:** Urgency micro-bar connects users facing immediate rights violations to `/contact`.
   - **Topic Quick-Jump:** Direct interactive topic pills (_Women's Rights_, _Tenancy_, _Police Conduct_, _Labor_) on the showcase card route straight to targeted guidance.
3. **Empty / Loading / Error States:**
   - Server-side fallback defaults prevent blank screens if CMS content is delayed or unavailable.
   - All interactive buttons and cards include hover, focus-visible, and active/pressed feedback states.

---

## Component Map

- **`HeroSection` (`app/page.tsx`):**
  - Ambient glow mesh canvas with fine grid pattern.
  - Status kicker pill with pulsating emerald beacon.
  - Typographic headline with gold gradient clipping.
  - Action button cluster with high-contrast tactile feedback.
  - Urgent inquiry notice bar for rapid legal support.
  - 3-column verified metric counter strip.
  - Multi-dimensional visual frame with real community advocacy photography, floating verified badge, and interactive topic chips.
- **`SiteHeader` (`components/site-header.tsx`):** Sticky navigation with brand emblem and mobile drawer.
- **`SectionIntro` (`app/page.tsx`):** Reusable section heading component with eyebrow, title, and lead.
- **`SiteFooter` (`components/site-footer.tsx`):** Civic footer with disclaimers and navigation.

---

## API Routes

- Public content retrieval via Supabase server helper (`lib/public-content.ts`):
  - `getPublishedPageContent("home")`: Fetches published homepage content.
  - `getPublicSiteSettings()`: Fetches global foundation settings.

---

## Security Notes (OWASP Top 10 Protections)

- **A01 Broken Access Control:** Public routes only access published CMS content; admin routes require verified session tokens.
- **A02 Cryptographic Failures:** Strict HTTPS enforcement, secure cookie storage.
- **A03 Injection:** Supabase client uses parameterized queries exclusively; no raw SQL concatenation.
- **A04 Insecure Design:** All inputs validated server-side; strict sanitization of public inputs.
- **A05 Security Misconfiguration:** Zero debug credentials exposed; sensitive tokens kept in environment variables.
- **A06 Vulnerable Components:** Pinned modern versions of Next.js 16 and React 19.
- **A07 Auth Failures:** Password hashing, rate limiting on admin authentication endpoints.
- **A08 Software Integrity:** No untrusted remote scripts loaded; all icons and styles bundled or sourced with integrity.
- **A09 Logging Failures:** Structured error logging without logging sensitive personally identifiable data.
- **A10 SSRF:** Absolute URL validation and restricted outgoing API endpoints.

---

## Design Decisions

1. **Civic Trust & Editorial Sophistication:** Moving away from generic template layouts to an authoritative, editorial Ghanaian human-rights aesthetic blending deep forest teal (`hsl(174 44% 12%)`), rich warm gold (`hsl(45 76% 52%)`), and soft parchment backgrounds.
2. **Full-Bleed Viewport Hero & Classy Gradient:** The hero covers edge-to-edge with seamless integration beneath the header, utilizing a multi-layered ambient gradient (warm champagne ivory base with soft radial golden radiance at `hsl(45 80% 93% / 0.75)` and delicate dot mesh texture) to evoke high-end editorial prestige while remaining light and understated.
3. **Viewport Fitting & Vertical Rhythm:** Fluid vertical padding (`clamp(1.5rem, 3.5vh, 3.5rem)`), calibrated typography scale (`clamp(2.25rem, 3.8vw, 4.25rem)`), and condensed proof line spacing ensure the entire hero (eyebrow, title, lede, action buttons, mission proof line, and focus area badges) fits neatly within the visible viewport on desktop and laptop displays without vertical cutoff.
4. **Cognitive Load Control:** Restricted primary actions in the hero to fewer than 5 clear paths to ensure rapid comprehension for users in distress.
5. **Zero Emojis Policy:** Replaced all informal emojis with purposeful, scalable Lucide icons for institutional credibility.

---

## Responsive Breakpoints

- **Mobile (< 720px):**
  - Hero stacks vertically with full-width touch targets (min 48px).
  - Headline fluidly scales via `clamp(2.25rem, 3.8vw, 4.25rem)` to eliminate awkward line overflows.
  - Tags wrap naturally into fluid pills.
- **Tablet (720px - 979px):**
  - Centered flow with proportional font and margin scaling.
- **Desktop (980px - 1440px):**
  - Full-bleed ambient gradient fitting standard laptop and desktop viewports (`min-height: calc(100svh - 84px)`).
- **Large Displays (1440px+):**
  - Constrained text content within `1180px` centered frame while the gradient canvas stretches full-bleed.

---

## Known Limitations

- Supabase live CMS connection is optional; when environment variables are not configured, fallback constants ensure 100% operational uptime.

## Build Phase Log

- Refreshed the homepage hero to use a centered, editorial layout inspired by the supplied reference image while preserving the existing site navigation and legal-aid content.
- Updated homepage hero to full-bleed cover with a classy warm champagne & gold ambient gradient background, subtle dot mesh overlay, and calibrated vertical spacing so all content fits comfortably in the viewport without cutoffs.
