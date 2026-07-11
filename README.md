# ScaleForge.AI

The official marketing website for **ScaleForge.AI**, an AI automation and web development agency helping small and medium businesses automate repetitive work and launch premium web presences.

This is a production frontend built to feel like it belongs to a funded product company rather than a templated agency site — dark theme, restrained motion, and a component architecture that keeps animation primitives, composed UI, and route-level pages cleanly separated.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM |
| Scroll animation | GSAP + ScrollTrigger |
| Micro-interactions | Framer Motion |
| Hero visual | Three.js (custom WebGL shader) |
| Icons | Lucide React, React Icons |
| Backend / persistence | Supabase (Postgres + Edge Functions) |
| Transactional email | Resend |
| Hosting target | Vercel |

Every service in this stack runs on a free tier — no paid infrastructure required to run or deploy this project.

---

## Design system

Brand tokens are centralized and consistent across every page and component — no ad hoc colors or fonts anywhere in the codebase.

```css
--bg-base:       #0A0A0F   /* base background */
--accent-indigo: #6C5CE7   /* primary accent */
--accent-teal:   #00D9C0   /* secondary accent */
--text-primary:  #FFFFFF
--text-muted:    #A0A0AC
```

**Typography:** Space Grotesk for headings/display, Inter for body text.

**Design principles:**
- One dominant animated moment per page — motion is restrained and intentional, not omnipresent
- No stock photography — abstract shapes, gradients, and real UI over generic imagery
- No fabricated statistics, client counts, or testimonials — placeholder content is always clearly labeled as such until replaced with real data
- Mobile-first responsive layout; heavy animation degrades gracefully or falls back to static alternatives on lower-powered devices

---

## Project structure
