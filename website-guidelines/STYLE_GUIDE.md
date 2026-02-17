# Denver Interior & Doors Co. — Style Guide

> **Single Source of Truth** for all visual design decisions.
>
> **Direction:** Light mode, craft-forward, warm professional — real photography over illustrations
> **Framework:** Tailwind CSS + Vanilla JS (or lightweight React if needed)
>
> **Last Updated:** February 17, 2026

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Components](#5-components)
6. [Visual Effects](#6-visual-effects)
7. [Animation & Motion](#7-animation--motion)
8. [Imagery & Photography](#8-imagery--photography)
9. [Accessibility](#9-accessibility)
10. [Do's and Don'ts](#10-dos-and-donts)
11. [Changelog](#11-changelog)

---

## 1. Design Philosophy

### Core Aesthetic
**"Warm Professional"** — the confidence of a premium contractor paired with the approachability of a neighbor who does great work. Clean, trustworthy, and rooted in real craftsmanship. Every design decision should say: *we take our work seriously.*

### Design Pillars
- **Authenticity:** Real photography of real work. No stock photos, no abstract art.
- **Clarity:** Homeowners should immediately understand what we do and how to reach us.
- **Trust:** Testimonials, before/afters, and craftsmanship details build credibility.
- **Warmth:** Warm neutrals and wood-toned accents reflect the materials we work with.

### What We Are
- Professional but not corporate
- Warm and approachable, not casual
- Craft-forward — the work is the hero
- Local and rooted in Denver

### What We're Not
- Cold, sterile, or clinical
- Overly trendy or flashy
- Generic contractor template site
- Cluttered with low-quality stock imagery

### Inspiration Sources

| Brand / Reference | What We Take |
|:---|:---|
| **Havenly / Houzz** | Clean photography-first layouts, warm neutrals |
| **Thompson Traders** | Craft-forward product storytelling, material warmth |
| **Renoworks / Westside Roofing** | Local service credibility, clear CTAs |
| **Notion** | Generous whitespace, clear typographic hierarchy |

---

## 2. Color Palette

### Philosophy
The palette is rooted in the materials we work with — wood, stone, and warm whites. We avoid cold grays and blue-toned neutrals. Our accent is a warm amber/bronze that reflects craftsmanship without feeling rustic or dated.

### Core Colors

| Token | Hex | HSL | Usage |
|:---|:---|:---|:---|
| `--background` | `#FFFFFF` | `0 0% 100%` | Page backgrounds |
| `--background-secondary` | `#FAF8F5` | `30 20% 98%` | Section alternates, cards |
| `--background-tertiary` | `#F2EDE7` | `28 25% 93%` | Subtle fills, hover states |
| `--foreground` | `#1A1714` | `25 10% 9%` | Primary text, headings |
| `--foreground-muted` | `#5C5550` | `20 8% 34%` | Body text, descriptions |
| `--foreground-subtle` | `#A89F97` | `22 10% 63%` | Captions, placeholders |

### Brand Colors

| Token | Hex | Usage |
|:---|:---|:---|
| `--primary` | `#1A1714` | Primary buttons, key actions |
| `--primary-foreground` | `#FAF8F5` | Text on primary buttons |
| `--accent` | `#B07D3A` | Links, highlights, hover accents, active states |
| `--accent-light` | `#F3E9D8` | Badge backgrounds, accent hover fills |
| `--accent-dark` | `#8A5E22` | Pressed states, deeper accent usage |

### Semantic Colors

| Token | Hex | Usage |
|:---|:---|:---|
| `--success` | `#3A7A52` | Success states, positive indicators |
| `--warning` | `#CA8A04` | Warning states |
| `--destructive` | `#DC2626` | Error states, destructive actions |

### Border Colors

| Token | Hex | Usage |
|:---|:---|:---|
| `--border` | `#E3DDD4` | Default borders |
| `--border-light` | `#EDE9E3` | Subtle dividers |
| `--border-strong` | `#C8BFB3` | Emphasized borders, active inputs |

### CSS Variables (Tailwind Compatible)

```css
:root {
  /* Backgrounds */
  --background: 0 0% 100%;
  --foreground: 25 10% 9%;

  /* Cards & Surfaces */
  --card: 30 20% 98%;
  --card-foreground: 25 10% 9%;

  /* Popovers & Dropdowns */
  --popover: 0 0% 100%;
  --popover-foreground: 25 10% 9%;

  /* Primary (Near-black buttons) */
  --primary: 25 10% 9%;
  --primary-foreground: 30 20% 98%;

  /* Secondary (Warm gray buttons) */
  --secondary: 28 25% 93%;
  --secondary-foreground: 25 10% 9%;

  /* Muted */
  --muted: 28 25% 93%;
  --muted-foreground: 20 8% 34%;

  /* Accent (Warm amber) */
  --accent: 34 57% 46%;
  --accent-foreground: 0 0% 100%;

  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;

  /* Borders & Rings */
  --border: 30 15% 86%;
  --input: 30 15% 86%;
  --ring: 34 57% 46%;

  /* Border Radius */
  --radius: 0.5rem;
}
```

### Quick Reference (Copy-Paste)

```
Background:          #FFFFFF
Background Alt:      #FAF8F5
Background Hover:    #F2EDE7
Text Primary:        #1A1714
Text Secondary:      #5C5550
Text Muted:          #A89F97
Border:              #E3DDD4
Border Light:        #EDE9E3
Accent (Amber):      #B07D3A
Accent Light:        #F3E9D8
Accent Dark:         #8A5E22
```

---

## 3. Typography

### Font Stack

```css
--font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-serif: 'DM Serif Display', Georgia, 'Times New Roman', serif;
```

> **Usage split:** DM Serif Display for hero headlines and section titles where craft/warmth should come through. DM Sans for all body copy, nav, buttons, labels, and UI text.

### Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Font | Usage |
|:---|:---|:---|:---|:---|:---|:---|
| `display` | 64px / 4rem | 400 (Regular) | 1.1 | -0.02em | Serif | Hero headlines |
| `h1` | 48px / 3rem | 400 (Regular) | 1.15 | -0.02em | Serif | Page titles |
| `h2` | 36px / 2.25rem | 600 (Semibold) | 1.25 | -0.01em | Sans | Section headers |
| `h3` | 24px / 1.5rem | 600 (Semibold) | 1.3 | 0 | Sans | Card titles, subsections |
| `h4` | 20px / 1.25rem | 600 (Semibold) | 1.4 | 0 | Sans | Labels, minor headings |
| `body-lg` | 18px / 1.125rem | 400 (Regular) | 1.65 | 0 | Sans | Lead paragraphs |
| `body` | 16px / 1rem | 400 (Regular) | 1.65 | 0 | Sans | Default body text |
| `body-sm` | 14px / 0.875rem | 400 (Regular) | 1.5 | 0 | Sans | Secondary text, captions |
| `label` | 12px / 0.75rem | 600 (Semibold) | 1.4 | 0.08em | Sans | Eyebrow labels, tags, badges |

### Tailwind Config

```js
// tailwind.config.ts
fontFamily: {
  sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
  serif: ['DM Serif Display', ...defaultTheme.fontFamily.serif],
},
fontSize: {
  'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
  'h1': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '400' }],
  'h2': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
  'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
  'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
  'body-lg': ['1.125rem', { lineHeight: '1.65', fontWeight: '400' }],
  'body': ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
  'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
  'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
},
```

### Eyebrow Labels
Short all-caps labels above section headings to set context. Style: `font-label text-accent uppercase tracking-widest`.

```html
<!-- Example -->
<p class="text-label uppercase tracking-widest text-amber-700">Our Services</p>
<h2 class="font-serif text-h2">Interior Finish Carpentry</h2>
```

### Typography Rules

**Do:**
- Use DM Serif Display for hero and major section headings — it brings warmth and craft
- Keep body text at 16px minimum, 18px for lead paragraphs
- Use tight letter-spacing on display/h1 (-0.02em)
- Use eyebrow labels to add structure above h2 headings
- Use `#1A1714` for headings — slightly warm, not pure black

**Don't:**
- Use serif font for body copy, buttons, or UI elements
- Use pure black (`#000000`) — too harsh against warm backgrounds
- Go below 14px for any readable text
- Mix more than 2 font families on a single page

---

## 4. Spacing & Layout

### Spacing Scale (4px Base Unit)

| Token | Value | Usage |
|:---|:---|:---|
| `space-1` | 4px | Tight internal spacing |
| `space-2` | 8px | Icon gaps, compact spacing |
| `space-3` | 12px | Button padding, small gaps |
| `space-4` | 16px | Card internal padding |
| `space-6` | 24px | Standard component gaps |
| `space-8` | 32px | Section internal spacing |
| `space-12` | 48px | Component-to-component spacing |
| `space-16` | 64px | Compact section padding |
| `space-24` | 96px | Standard section padding |
| `space-32` | 128px | Hero section padding |

### Section Spacing Guidelines

| Section Type | Top/Bottom Padding | Tailwind Class |
|:---|:---|:---|
| Hero | 128px | `py-32` |
| Standard Section | 96px | `py-24` |
| Compact Section | 64px | `py-16` |
| Card Content | 24px | `p-6` |
| Component Internal | 16px | `p-4` |

### Container Max Widths

| Context | Max Width | Tailwind |
|:---|:---|:---|
| Blog / long-form text | 720px | `max-w-2xl` |
| Content (standard) | 960px | `max-w-5xl` |
| Standard layout | 1152px | `max-w-6xl` |
| Wide / hero | 1280px | `max-w-7xl` |
| Full bleed (image sections) | 100% | `max-w-full` |

### Breakpoints

| Token | Value | Description |
|:---|:---|:---|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

### Layout Philosophy
Whitespace is trust. Cramped layouts look like budget work. **Give content room to breathe** — especially around photography, which is the primary visual language of this site.

---

## 5. Components

### 5.1 Buttons

| Variant | Background | Text | Border | Hover | Use Case |
|:---|:---|:---|:---|:---|:---|
| **Primary** | `#1A1714` | `#FAF8F5` | None | `#3D3530` bg | Main CTAs (Get a Quote) |
| **Secondary** | `transparent` | `#1A1714` | `#E3DDD4` | `#F2EDE7` bg | Supporting actions |
| **Accent** | `#B07D3A` | `#FFFFFF` | None | `#8A5E22` bg | Highlighted CTAs |
| **Ghost** | `transparent` | `#5C5550` | None | `#F2EDE7` bg | Tertiary/nav actions |
| **Link** | `transparent` | `#B07D3A` | None | Underline | Inline text links |

**Button Specs:**
```css
/* Primary button */
height: 44px;
padding: 0 20px;
border-radius: 6px;
font-size: 14px;
font-weight: 600;
letter-spacing: 0.01em;
transition: background-color 150ms ease-out;
```

**Tailwind Example:**
```html
<!-- Primary -->
<button class="h-11 px-5 bg-stone-900 text-stone-50 text-sm font-semibold rounded-md hover:bg-stone-800 transition-colors">
  Get a Free Quote
</button>

<!-- Accent -->
<button class="h-11 px-5 bg-amber-700 text-white text-sm font-semibold rounded-md hover:bg-amber-800 transition-colors">
  View Our Work
</button>

<!-- Secondary -->
<button class="h-11 px-5 bg-transparent text-stone-900 text-sm font-semibold rounded-md border border-stone-200 hover:bg-stone-100 transition-colors">
  Learn More
</button>
```

---

### 5.2 Cards

| Variant | Background | Border | Radius | Shadow | Use Case |
|:---|:---|:---|:---|:---|:---|
| **Default** | `#FAF8F5` | `#E3DDD4` | 10px | Soft | Service summaries, FAQs |
| **Photo Card** | Image fill | None | 12px | Medium | Portfolio grid items |
| **Testimonial** | `#FFFFFF` | `#EDE9E3` | 10px | Soft | Customer quotes |
| **Stat** | `#F2EDE7` | None | 10px | None | Numbers/stats callouts |

```css
/* Default card */
border-radius: 10px;
border: 1px solid #E3DDD4;
background: #FAF8F5;
padding: 24px;
box-shadow: 0 1px 3px rgba(26, 23, 20, 0.06);

/* Photo card hover */
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(26, 23, 20, 0.12);
transition: transform 200ms ease-out, box-shadow 200ms ease-out;
```

---

### 5.3 Navigation Bar

- **Height:** 64px
- **Background:** `#FFFFFF` with `border-bottom: 1px solid #EDE9E3`
- **Sticky:** Yes — stays at top on scroll
- **Scroll behavior:** Add subtle shadow `0 2px 8px rgba(26,23,20,0.08)` when scrolled past 10px
- **Logo:** Left-aligned
- **Nav links:** Centered or right, `font-size: 14px`, `font-weight: 500`, color `#5C5550`, hover color `#1A1714`
- **CTA Button:** Primary or Accent button — **"Get a Free Quote"** — always visible in nav

```html
<!-- Nav structure -->
<nav class="sticky top-0 z-50 h-16 bg-white border-b border-stone-100 flex items-center justify-between px-6">
  <a href="/" class="logo"><!-- Logo SVG --></a>
  <ul class="flex gap-8 text-sm font-medium text-stone-500">
    <li><a href="/services" class="hover:text-stone-900 transition-colors">Services</a></li>
    <li><a href="/our-work" class="hover:text-stone-900 transition-colors">Our Work</a></li>
    <li><a href="/about" class="hover:text-stone-900 transition-colors">About</a></li>
    <li><a href="/blog" class="hover:text-stone-900 transition-colors">Blog</a></li>
  </ul>
  <a href="/contact" class="h-10 px-4 bg-stone-900 text-stone-50 text-sm font-semibold rounded-md hover:bg-stone-800 transition-colors flex items-center">
    Get a Free Quote
  </a>
</nav>
```

---

### 5.4 Footer

- **Background:** `#1A1714` (near-black warm)
- **Text:** `#A89F97` default, `#FAF8F5` for headings and links on hover
- **Columns:** Logo + tagline | Services | Pages | Contact info
- **Bottom bar:** Copyright + legal links, separated by `border-top: 1px solid #2E2A26`
- **Social icons:** Simple SVG icons, no filled backgrounds

---

### 5.5 Section Header Pattern

Consistent structure for all section intros across the site:

```html
<div class="text-center max-w-2xl mx-auto mb-12">
  <!-- Eyebrow label -->
  <p class="text-label uppercase tracking-widest text-amber-700 mb-3">Our Services</p>
  <!-- Section heading (serif) -->
  <h2 class="font-serif text-4xl text-stone-900 mb-4">Interior Finish Carpentry</h2>
  <!-- Optional subtext -->
  <p class="text-body-lg text-stone-500">
    We specialize in the details that make a house feel finished — and feel like home.
  </p>
</div>
```

---

### 5.6 Badges & Tags

```html
<!-- Service tag -->
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
  Interior Doors
</span>

<!-- Location tag -->
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-600">
  Denver, CO
</span>
```

---

### 5.7 Forms & Inputs

```css
/* Input field */
height: 44px;
padding: 0 14px;
border-radius: 6px;
border: 1px solid #E3DDD4;
background: #FFFFFF;
font-size: 15px;
color: #1A1714;
transition: border-color 150ms ease-out, box-shadow 150ms ease-out;

/* Focus state */
border-color: #B07D3A;
box-shadow: 0 0 0 3px rgba(176, 125, 58, 0.15);
```

```html
<input
  type="text"
  placeholder="Your name"
  class="w-full h-11 px-3.5 rounded-md border border-stone-200 bg-white text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/15 transition"
/>
```

---

## 6. Visual Effects

### 6.1 Shadows

```css
/* Subtle — default card */
--shadow-sm: 0 1px 3px rgba(26, 23, 20, 0.06);

/* Soft — hovered cards */
--shadow-md: 0 4px 12px rgba(26, 23, 20, 0.08);

/* Elevated — modals, dropdowns */
--shadow-lg: 0 8px 32px rgba(26, 23, 20, 0.12);

/* Nav scrolled */
--shadow-nav: 0 2px 8px rgba(26, 23, 20, 0.08);
```

### 6.2 Gradients

Gradients are used sparingly — primarily as photo overlays and subtle background transitions.

```css
/* Photo overlay — for text legibility on hero images */
.photo-overlay {
  background: linear-gradient(
    to top,
    rgba(26, 23, 20, 0.75) 0%,
    rgba(26, 23, 20, 0.0) 60%
  );
}

/* Section background fade — alt sections */
.section-warm-fade {
  background: linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%);
}

/* Accent underline on headings */
.accent-underline::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: #B07D3A;
  margin-top: 12px;
  border-radius: 2px;
}
```

### 6.3 Border Radius

| Element | Radius | CSS |
|:---|:---|:---|
| Buttons | 6px | `rounded-md` |
| Inputs | 6px | `rounded-md` |
| Cards | 10px | `rounded-[10px]` |
| Photo cards | 12px | `rounded-xl` |
| Badges / tags | 999px | `rounded-full` |
| Gallery images | 8px | `rounded-lg` |

### 6.4 Dividers

```html
<!-- Standard section divider -->
<hr class="border-stone-100 my-0" />

<!-- Warm accent divider -->
<div class="w-10 h-0.5 bg-amber-600 rounded-full mx-auto my-6"></div>
```

### 6.5 No-Go Effects

- **NO** neon colors or glowing elements
- **NO** busy background textures or patterns
- **NO** heavy drop shadows that look dated
- **NO** color-shifting or animated gradients
- **NO** parallax effects
- **NO** heavy overlays that obscure photography

---

## 7. Animation & Motion

### Timing Functions

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Duration Scale

| Token | Value | Usage |
|:---|:---|:---|
| `duration-fast` | 150ms | Hover states, button colors |
| `duration-normal` | 250ms | Card transitions, dropdowns |
| `duration-slow` | 400ms | Page reveals, image loads |

### Animation Guidelines

| Element | Duration | Effect | Easing |
|:---|:---|:---|:---|
| Button hover | 150ms | Background color change | ease-out |
| Nav shadow on scroll | 200ms | Shadow fade in | ease-out |
| Card hover | 200ms | translateY(-2px) + shadow | ease-out |
| Scroll-reveal elements | 400ms | Fade in + 12px upward | ease-out |
| Image gallery items | 300ms | Fade in, staggered | ease-out |
| Dropdown menus | 200ms | Fade + slight scale | ease-out |

### Scroll Reveal (CSS)

```css
/* Base state */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 400ms ease-out, transform 400ms ease-out;
}

/* Triggered by IntersectionObserver */
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
// IntersectionObserver setup
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### What We Avoid
- Animations longer than 500ms
- Bouncy or springy effects
- Autoplay videos or animations
- Animations that block interaction or scroll
- Heavy parallax or scroll-jacking

---

## 8. Imagery & Photography

### Primary Visual Language: Real Photography

This site lives or dies by photography quality. **Real project photos are the single most important trust signal.** Every key section should feature actual work from actual jobs.

### Photography Guidelines

- **Always use real project photos** — no stock photography of tools, hands, or generic interiors
- Show finished spaces, not in-progress shots (unless in a before/after context)
- **Lighting:** Prefer natural light, warm tones. Avoid cold blue-tinted photos.
- **Composition:** Wide shots to show full rooms; close-ups to show joinery and detail
- **Aspect ratios:** Landscape (16:9 or 4:3) for hero/banners; Square (1:1) for gallery grids; Portrait (3:4) for cards
- **Minimum resolution:** 1600px wide for full-bleed sections, 800px for cards

### Image Treatment

```css
/* All project photos */
img {
  object-fit: cover;
  display: block;
}

/* Gallery hover */
.gallery-item img {
  transition: transform 400ms ease-out;
}
.gallery-item:hover img {
  transform: scale(1.03);
}

/* Photo card overlay for text */
.photo-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(26,23,20,0.7) 0%, transparent 55%);
  border-radius: inherit;
}
```

### Hero Section Image

- Full-width, high-resolution project photo (ideally a dramatic before/after or a beautiful finished room)
- Overlay: dark gradient from bottom for text legibility
- Headline and CTA overlaid in `#FAF8F5`

### What We Use
- Real project photos (doors, trim, built-ins, finished rooms)
- Before & after pairs
- Detail/close-up shots of joinery, hardware, and finish quality
- Team at work (if available — shows authenticity)

### What We Don't Use
- Stock photos of smiling contractors or generic power tools
- AI-generated room renders
- Abstract textures or geometric patterns as hero backgrounds
- Low-resolution or poorly lit photos

### Performance
- Serve images in **WebP format** with JPEG fallback
- Use `loading="lazy"` on all below-fold images
- Provide responsive `srcset` for hero and large images
- Compress to ≤200KB for cards, ≤500KB for hero images

---

## 9. Accessibility

### Requirements

| Requirement | Standard |
|:---|:---|
| **WCAG Level** | AA minimum |
| **Keyboard Navigation** | Full support |
| **Screen Reader** | Semantic HTML, proper ARIA labels |
| **Color Contrast** | 4.5:1 minimum for body text |

### Color Contrast Checks

| Combination | Contrast Ratio | Pass? |
|:---|:---|:---|
| `#1A1714` on `#FFFFFF` | 18.1:1 | ✅ AAA |
| `#5C5550` on `#FFFFFF` | 6.8:1 | ✅ AAA |
| `#A89F97` on `#FFFFFF` | 2.5:1 | ❌ Decorative only |
| `#B07D3A` on `#FFFFFF` | 3.9:1 | ⚠️ Use for large text / decorative only |
| `#FAF8F5` on `#1A1714` | 16.4:1 | ✅ AAA |
| `#FFFFFF` on `#B07D3A` | 3.9:1 | ⚠️ Use bold weight for buttons only |

> ⚠️ **Note:** The amber accent `#B07D3A` does not pass AA for small body text on white. Use it for decorative elements, eyebrow labels, borders, and large-text button labels only. For body-text links, use `#8A5E22` (darker amber) which passes AA.

### Focus States

```css
/* Visible focus ring for all interactive elements */
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #FFFFFF,
              0 0 0 4px #B07D3A;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Semantic HTML Checklist
- [ ] `<nav>` with `aria-label` for main navigation
- [ ] `<main>` wrapping page content
- [ ] `<h1>` on every page (only one)
- [ ] `alt` text on all images (descriptive, not generic)
- [ ] `aria-label` on icon-only buttons
- [ ] Form `<label>` elements associated with every input
- [ ] Skip-to-content link at top of every page

---

## 10. Do's and Don'ts

### Do ✅

- Use real project photography as the primary visual asset
- Let whitespace breathe — don't cram sections together
- Use DM Serif Display for hero and section headings to convey craft and warmth
- Use the amber accent sparingly — for CTAs, eyebrow labels, and borders
- Keep the primary CTA ("Get a Free Quote") visible in the nav at all times
- Use eyebrow labels above section headings for structure
- Serve images in WebP, compressed and lazy-loaded
- Add `alt` descriptions that describe the carpentry shown, not just "image"
- Use a warm near-black (`#1A1714`) instead of pure black
- Test all pages on mobile before desktop

### Don't ❌

- Use stock photos of generic contractors, tools, or interiors
- Use pure black (`#000000`) or cold blue-gray neutrals
- Use the amber accent (`#B07D3A`) for small body-text links — use `#8A5E22`
- Add heavy shadows, gradients, or glow effects
- Cram multiple CTAs into the same visual area — pick one per section
- Skip `alt` text or use lazy descriptions like "photo of room"
- Use the serif font for body copy, buttons, or any UI text
- Use colored backgrounds for main sections — keep them white or warm off-white
- Add animations longer than 400ms or that block scrolling
- Launch with placeholder or stock imagery — real photos first, always

---

## 11. Changelog

> Track all updates to this style guide here. Most recent first.

### v1.0.0 — February 17, 2026
**Initial Release**
- Established warm professional design philosophy
- Defined color palette with warm neutrals and amber accent
- Set dual font stack (DM Serif Display + DM Sans) and type scale
- Documented spacing, layout, and container guidelines
- Defined component patterns: buttons, cards, nav, footer, forms, badges
- Added visual effects specs (shadows, gradients, radius)
- Created animation and motion guidelines with scroll-reveal pattern
- Added photography guidelines and performance requirements
- Included accessibility requirements and contrast checks
- Added Do's and Don'ts section

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  DENVER INTERIOR & DOORS — QUICK REFERENCE                  │
├─────────────────────────────────────────────────────────────┤
│  COLORS                                                     │
│  Background:      #FFFFFF    Text Primary:    #1A1714       │
│  Background Alt:  #FAF8F5    Text Secondary:  #5C5550       │
│  Border:          #E3DDD4    Accent (Amber):  #B07D3A       │
│  Accent Light:    #F3E9D8    Accent Dark:     #8A5E22       │
├─────────────────────────────────────────────────────────────┤
│  TYPOGRAPHY                                                 │
│  Serif:  DM Serif Display — Hero, H1, H2 headings          │
│  Sans:   DM Sans — Body, nav, buttons, labels              │
│  Display: 64px/400   H1: 48px/400   H2: 36px/600           │
│  Body: 16px/400      Body-sm: 14px/400                     │
├─────────────────────────────────────────────────────────────┤
│  SPACING                                                    │
│  Hero: py-32 (128px)    Standard: py-24 (96px)             │
│  Compact: py-16 (64px)  Card: p-6 (24px)                   │
├─────────────────────────────────────────────────────────────┤
│  RADIUS                                                     │
│  Buttons/Inputs: 6px   Cards: 10px   Photo cards: 12px     │
│  Badges: 999px         Gallery images: 8px                 │
├─────────────────────────────────────────────────────────────┤
│  ANIMATION                                                  │
│  Fast: 150ms    Normal: 250ms    Slow: 400ms               │
│  Easing: cubic-bezier(0.4, 0, 0.2, 1)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Related Documents

- `docs/product-brief.md` — Project overview, goals, and page list
- `docs/sitemap.md` — Full site architecture and SEO priority tiers
- `docs/copy-guidelines.md` — Voice, tone, and writing style *(to be created)*

---

*This is a living document. As pages are built and design decisions are refined, update this guide and log changes in the Changelog.*
