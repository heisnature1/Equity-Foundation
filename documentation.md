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
- **3D Graphics & Motion:** Three.js (`three` & `@types/three`) for the fluid animated dotted wave background in the hero section
- **Icons:** Lucide Icons (`lucide-react` v1.47.0) exclusively — zero emojis throughout
- **Typography:** Google Fonts loaded via `next/font/google`:
  - Display: `Libre_Baskerville` (Editorial Serif, weights 400 & 700)
  - Body: `Manrope` (Clean Sans-Serif, weights 400, 500, 600, 700, 800)
- **Motion & Animations:** Motion (`motion` v12, `motion/react`) for dynamic canvas physics, ray casting, and fluid spring animations
- **Component Primitives:** shadcn-compatible structure with `@/components/ui` and `@/lib/utils` (`clsx` + `tailwind-merge`)
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
- **`Our Work / Pillars Section` (`app/page.tsx`):** Classy, simple, professional viewport-fitting (`100svh`) editorial showcase with soft, perceptible ambient warm champagne beams:
  - Background Beams: Soft, gentle warm gold rays (`hue: 43-51`, `opacity: 0.22`, `blur(40px)`, `intensity="medium"`) that softly sweep in the background without heavy neon weight.
  - Card Transparency: Calibrated semi-translucent obsidian glass (`rgba(13, 16, 24, 0.58)` with `backdrop-filter: blur(20px)`), allowing the soft warm beams to be felt gently radiating behind and through each card.
  - Clean, restrained eyebrow badge (`OUR CORE PILLARS`) with subtle translucent border.
  - Stately editorial headline (`Libre Baskerville` in crisp white with classic italicized `<em>access-to-justice</em>` emphasis).
  - Frosted Pill Action Button:
    - High-spec inline pill button (`.pillar-card__action`) with subtle translucent frosted background (`rgba(255, 255, 255, 0.08)`), delicate 1px border (`rgba(255, 255, 255, 0.15)`), and `backdrop-filter: blur(12px)`.
    - High-contrast white typography (`font-weight: 700`) and warm gold diagonal arrow (`ArrowUpRight`).
    - Smooth hover transition to solid brand gold fill (`#d4af37`) with ink text (`#0b0d13`), tactile press scale (`0.97`), and diagonal arrow glide.
- **`Justice Bridge Index Section` (`app/page.tsx`):** Viewport-fitting (`100svh`) research publication portal:
  - Left Narrative Column:
    - Authoritative pill badge: `QUARTERLY RESEARCH PUBLICATION` with gold beacon dot.
    - Stately headline in `Libre Baskerville` and descriptive research lede.
    - 3-metric empirical data strip: `16` Regions Monitored, `4,200+` Citizens Surveyed, `Quarterly` Peer-Reviewed Releases.
    - Archive link with interactive directional arrow.
  - Right Publication Dossier Card:
    - Elevated document card (`background: #ffffff; border-top: 4px solid var(--brand-gold)`) with soft depth shadow.
    - Edition badge (`CURRENT EDITION · Q1 2026`) and page count (`38 Pages · PDF & Online`).
    - Title: *Justice Bridge Index — Q1: Rights Awareness Baseline*.
    - Abstract and 3-point key empirical findings with forest green checkmark icons.
    - Action cluster: Primary `Read online ↗` button + Secondary `Download PDF ↓` button.
    - Open access citation badge: `Open Access (CC BY 4.0) · Peer-Reviewed Civic Data`.
- **`Know Your Rights Section` (`app/page.tsx`):** Redesigned high-impact legal education section powered by the homepage hero's 3D interactive `<DottedSurface />` canvas:
  - **Atmospheric Background Canvas:** Dynamic Three.js particle wave canvas with warm multi-layer radial gradient backdrop matching the Hero section.
  - **Category Pill Badge:** `KNOW YOUR RIGHTS` with pulsating gold beacon indicator.
  - **8 Rich Interactive Topic Cards:** Upgraded from static text tags to structured, elevated glassmorphism cards (`background: rgba(255, 255, 255, 0.92)`):
    - Dedicated Lucide icons (`ShieldAlert`, `HeartHandshake`, `Briefcase`, `HomeIcon`, `Users`, `Scale`, `HelpCircle`, `Landmark`).
    - Statutory tags (Criminal Procedure, Protection & Safety, Labour Act 651, Rent Act 220, Family Law, State Aid, Directory, 1992 Constitution).
    - Concise legal overview descriptions and interactive hover lifts with directional arrows (`↗`).
  - **Legal Intake Bottom Banner:** Integrated horizontal CTA with direct links to browse all rights guides and initiate free legal clinic intake.
- **`Justice Bridge Index Portal` (`app/justice-bridge-index/page.tsx` & `components/justice-bridge-portal.tsx`):**
  - Institutional research and civic data portal designed to high-caliber think tank standards:
  - **Atmospheric Background & Grain:** Multi-stop oceanic sapphire gradient with an ethereal top horizon white-cyan light aura (`.jbi-bg-atmosphere`) and a tactile SVG fractal noise film-grain overlay (`.jbi-bg-grain`).
  - **Hero & Empirical Benchmark Strip:** Breadcrumbs, gold beacon badge, Libre Baskerville header, 4 benchmark metrics (16 Regions, 4,200+ Citizens, Quarterly Releases, CC BY 4.0 License), quick section jump pills.
  - **Featured Edition Dossier Showcase:** Elevated white dossier card with 4px gold accent border, edition badges, executive abstract, 3-point empirical findings with forest green checkmark icons, factual `Read online` & `Download PDF` actions, `Cite publication` modal trigger, and `Share` link copy button with toast feedback.
  - **Side Research Governance Card:** Principal investigator details, empirical scope across all 16 regions, dual peer-review standards, and an academic data inquiry callout.
  - **Interactive Report Viewer:** Tabbed on-page reader covering *Executive Summary*, *Survey Findings* (with comparative empirical dispute resolution data table), *Regional Indicators* across all 16 Ghanaian regions, and *Policy Remedies*.
  - **Searchable & Filterable Publication Archive:** Search bar with live keyword filtering across titles/descriptions/focus areas, year filter pills (`All`, `2026`, `2025`), live result counter, reset filter actions, and structured empty state with reset trigger.
  - **Methodology & Integrity Section:** 3-column breakdown covering Stratified National Sampling, Multidisciplinary Review, and Open Access Licensing standards.
  - **Scholarly Citation Modal:** Multi-format citation generator (APA 7th, Harvard, BibTeX) with 1-click clipboard copy and accessible modal trap/backdrop dismiss.
- **`SiteFooter` (`components/site-footer.tsx`):** Modern Graphy-inspired closing section featuring:
  - High-impact dark CTA card (`.footer-cta`) with radial light glow, crisp headline, and high-contrast pill action button.
  - Floating white card footer (`.footer-card`) on an off-white canvas (`#f6f7f9`) with soft shadow elevation.
  - Massive, subtle brand watermark typography (`"EQUITY BRIDGE"`) faded behind the card.
  - Brand identity column with `BrandMark`, mission synopsis, and interactive social icons (X, Instagram, LinkedIn, GitHub).
  - 3 structured link columns (*Programs*, *Resources*, *Organization*).
  - Clean divider and bottom row with copyright and inline legal links (*Privacy Policy*, *Terms of Service*, *Legal Disclaimer*, *Accessibility*).

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
3. **Pillars Viewport Fitting & Vertical Rhythm:** Styled with `min-height: 100svh; display: flex; align-items: center; justify-content: center;` and fluid vertical padding (`clamp(2.5rem, 5vh, 4rem) 0`). Calibrated internal card padding and spacing ensure the entire section (badge, headline, lede, and all 3 pillar cards) sits cleanly in the viewport without vertical cutoffs on laptop and desktop screens.
4. **Classy, Simple, Professional Editorial Restraint:** Eliminated rainbow clashing (green/yellow/cyan) and AI-style neon glows. Headline uses crisp solid white with classic italicized serif emphasis (`<em>access-to-justice</em>`). Background beams cast soft, warm champagne light (`hue: 42-48`, subtle intensity) evoking warm architectural gallery lighting rather than a cyberpunk laser show.
5. **Unified Institutional Card Aesthetic:** All 3 pillar cards share identical high-spec frosted glass styling with subtle brass/gold icon badges and understated neutral tags, creating visual harmony and institutional authority.
6. **Cognitive Load Control:** Restricted primary actions in the hero and pillars to fewer than 5 clear paths to ensure rapid comprehension for users in distress.
7. **Zero Emojis Policy:** Replaced all informal emojis with purposeful, scalable Lucide icons for institutional credibility.
8. **Graphy-Inspired Floating Card Footer:** Replaced the legacy dark block footer with a two-tier closing experience: an immersive dark CTA card with top radial vignette glow followed by an off-white canvas with a subtle watermark and a crisp white floating card housing structured navigation, social links, and legal disclosures.

---

## Responsive Breakpoints

- **Mobile (< 720px):**
  - Hero and pillar grid stack vertically with full-width touch targets (min 48px).
  - Headline fluidly scales via `clamp(2.25rem, 3.8vw, 4.25rem)` to eliminate awkward line overflows.
  - Section min-height relaxes to `auto` with `padding: 4rem 0`.
- **Tablet (720px - 979px):**
  - 2-column layout for pillar cards with centered text hierarchy.
- **Desktop (980px - 1440px):**
  - Full-bleed ambient gradient and `BeamsBackground` canvas fitting standard laptop and desktop viewports (`min-height: 100svh`).
- **Large Displays (1440px+):**
  - Constrained text content within `1180px` centered frame while the canvas stretches full-bleed.

---

## Known Limitations

- Supabase live CMS connection is optional; when environment variables are not configured, fallback constants ensure 100% operational uptime.

## Build Phase Log

- Refreshed the homepage hero to use a centered, editorial layout inspired by the supplied reference image while preserving the existing site navigation and legal-aid content.
- Integrated `DottedSurface` (`@/components/ui/dotted-surface`) Three.js animated 3D particle wave background into the hero section.
- Added Royal Forest Emerald (`hsl(164 74% 27%)`) as a third signature color alongside Gold and Ink/Black, highlighting "Rights" and "Justice" in the hero headline for immediate visual focal clarity.
- Integrated `BeamsBackground` (`@/components/ui/beams-background`) canvas animation behind the "Our Work" / "Our Core Pillars" section with shadcn structure, `cn()` utility, and `components.json`.
- Redesigned the Core Pillars section with classy, simple, professional editorial typography (crisp white serif with italic accent, no garish yellow gradient), unified obsidian glass cards, warm champagne ambient lighting, and subtle brass icon badges.
- Calibrated viewport fitting (`100svh`) with flex vertical centering so the entire section displays seamlessly within the viewport on laptop and desktop screens.
- Redesigned `http://localhost:3000/justice-bridge-index` into a high-caliber think-tank research publication portal with multi-format citation modal, interactive report reader, searchable publication archive, and radiant sapphire backdrop with SVG fractal film grain.
- Overhauled `http://localhost:3000/know-your-rights` (`components/know-your-rights-portal.tsx` & `app/know-your-rights/page.tsx`) with an interactive 3D `DottedSurface` canvas anchored below the header, instant search bar with live filtering, category tabs, and 8 comprehensive statutory legal guides (Arrest & Police Rights, Gender-Based Violence, Employment Rights, Housing & Tenancy, Family & Domestic Rights, Access to Legal Representation, Where to Seek Help, Constitutional Rights).
- Refined `DottedSurface` 3D particle physics: organized the wave propagation forward along the depth axis (`iy`), leveled and lowered the camera and ground plane (`pointsY = -280`), and structured the color gradient so rows remain parallel, neat, and positioned strictly below typography and content.
- Completely redesigned `http://localhost:3000/about` (`components/about-portal.tsx` & `app/about/page.tsx`) into an institutional profile with an organized 3D `DottedSurface` ground plane, 4 key operational benchmarks (100% Pro Bono, 16 Regions, 4,200+ Surveyed, Quarterly Index), Mission & Vision purpose cards, tripartite operational pillars, vulnerable community beneficiary breakdowns, and governance/transparency standards.
- Styled the "Read Research Publications" action button on `/about` to high-contrast black background with pure white typography, matching the hero's secondary button design and elevating visual hierarchy.
- Completely redesigned the homepage (`http://localhost:3000/` / `app/page.tsx` & `app/globals.css`) so that every section fits the viewport (`min-height: 100svh; display: flex; align-items: center; justify-content: center;`) with responsive fallbacks on mobile/tablet (`min-height: auto; padding: 4rem 0;`):
  1. **Hero Section (`.hero`):** Full-bleed `calc(100svh - 84px)` with signature 3D `DottedSurface` wave, dual emerald-gold headline accents, direct legal-aid and rights education actions, and trust proof indicators.
  2. **Our Core Pillars (`#our-work` / `.section--pillars`):** Dark obsidian viewport showcase powered by `BeamsBackground`, featuring 3 structured pillars (Legal Aid, Advocacy, Legal Education) in semi-translucent frosted glass cards with gold checkmarks and action pills.
  3. **Justice Bridge Index Preview (`#justice-bridge-index` / `.section--jbi`):** Viewport research publication portal with `AnimatedGradientBackground`, empirical data counters (16 Regions, 4,200+ Surveyed, Quarterly), and current edition dossier card with PDF download and online reading triggers.
  4. **Know Your Rights Showcase (`#know-your-rights` / `.section--know-your-rights`):** Viewport-fitting legal education section with 4 flagship statutory cards (Arrest & Police Rights, Gender-Based Violence, Labour Rights, Tenancy & Housing) in a sleek single-row grid on desktop, supported by the organized 3D `DottedSurface` ground plane and an integrated action banner linking to all 8 guides.
  5. **Advocacy & Systemic Campaigns (`#advocacy` / `.section--campaigns`):** Dedicated viewport section in warm parchment aesthetic featuring 3 active civic campaigns (Police Conduct Monitoring, Grassroots Legal Education Townhalls, State Legal Aid Expansion) with Lucide icons, status pill badges, impact benchmarks, and interactive links.
  6. **Get Involved & Civic Action (`#get-involved` / `.section--get-involved`):** Viewport section in deep obsidian theme with subtle gold and emerald radial ambient glows, offering 3 structured participation pathways (Pro Bono Legal Network, Community Volunteers, Strategic Partnerships & Donors) with highlight checklists and custom action buttons.
  7. **Latest Insights & Publications (`#insights` / `.section--insights`):** Viewport editorial section showcasing 3 research and educational publications with category badges, reading times, and excerpts, culminating in an integrated pro bono intake banner immediately preceding the site footer.
