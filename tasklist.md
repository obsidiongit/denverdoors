# Denver Interior & Doors Co. Website Build Tasks

> Track development progress for the Denver Interior & Doors Co. website.
>
> **Last Updated:** February 17, 2026

---

## Phase 1: Template Adaptation & Design System

### 1.1 Configure Design System in `styles.css`
- [x] Update CSS Variables in `:root` to match `STYLE_GUIDE.md`
    - [x] Update Colors (Warm Neutrals, Amber Accent)
    - [x] Update Fonts (`DM Sans`, `DM Serif Display`)
    - [x] Update Spacing Scale & Border Radius
- [x] Add new utility classes if needed (e.g., specific text styles)

### 1.2 Global Component Refinement
- [x] Refine Navigation Bar
    - [x] Update Logo
    - [x] Update Menu Links
    - [x] Ensure "Get a Free Quote" CTA matches style guide
- [x] Refine Footer
    - [x] Update Column Designs
    - [x] Update Copyright & Legal

### 1.3 Template asset setup
- [x] Ensure `assets/` folder has placeholders or real images
- [x] Create `assets/videos/` directory for hero loop videos
- [ ] Update `favicon` <!-- Skipped per user request -->

---

## Phase 2: Core Pages Implementation (Multi-page Scale)

### 2.1 Homepage (`index.html`)
- [x] Update Hero Section (Background, Copy, CTAs) - *Fixed loop, refined layout (Wider/Centered Nav/Logo Overlay)*
- [x] Update Services Grid (Content & Icons)
- [x] Update About/Why Choose Us Section
- [x] Update Testimonials Section
- [x] Update Contact/CTA Section

### 2.2 Services Hub (`services/index.html`)
- [x] Create `services/` directory
- [x] Duplicate `index.html` as base template
- [x] Strip non-essential sections
- [x] Build Services Grid Layout

### 2.3 Individual Service Pages (`services/[service-name]/index.html`)
- [x] Create directory for each service
- [x] Implement Interior Doors Page
- [x] Implement Trim & Baseboard Page
- [x] Implement Custom Built-Ins Page
- [x] Implement Cabinet Installation Page
- [x] Implement Wall & Ceiling Treatments Page
- [x] Implement Custom Woodworking Page

### 2.4 Our Work / Portfolio (`our-work/index.html`)
- [x] Create `our-work/` directory
- [x] Build Gallery Grid Layout
- [x] Implement Lightbox or simple image view

### 2.5 Locations Hub (`locations/index.html`)
- [x] Create `locations/` directory
- [x] Build Locations List/Map

### 2.6 Individual Location Pages (`locations/[city]/index.html`)
- [x] Create directory for each city
- [x] Implement Denver Page
- [x] Implement Golden Page
- [x] Implement Lakewood Page
- [x] Implement Arvada Page
- [x] Implement Englewood Page
- [x] Implement Littleton Page
- [x] Implement Centennial Page
- [x] Implement Highlands Ranch Page

### 2.7 Support Pages
- [x] About Page (`about/index.html`)
- [x] Contact Page (`contact/index.html`)
- [x] FAQ Page (`faq/index.html`)
- [x] Craftsmanship Standards (`craftsmanship-standards/index.html`)

---

## Phase 3: Blog Implementation

### 3.1 Blog Hub (`blog/index.html`)
- [x] Design Blog Listing Layout
- [x] Implement Categories Sidebar

### 3.2 Blog Posts (`blog/[post-slug]/index.html`)
- [x] Create Blog Post Template
- [x] Implement Initial Posts (Tier 1)

### 3.3 Reviews Page (`testimonials/index.html`)
- [x] Create Reviews Page Layout

---

## Phase 4: Optimization & Launch

### 4.1 Mobile Responsiveness
- [ ] Audit all new pages on mobile
- [ ] Fix any layout overflows

### 4.2 SEO & Meta
- [ ] Update `<title>` and `<meta description>` for every page
- [ ] Generate `sitemap.xml`
- [ ] Create `robots.txt`

### 4.3 Performance
- [ ] Optimize images (WebP)
- [ ] Minify CSS/JS (manual or simple script)
