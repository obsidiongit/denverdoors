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
- [ ] Update Services Grid (Content & Icons)
- [ ] Update About/Why Choose Us Section
- [ ] Update Testimonials Section
- [/] Update Contact/CTA Section

### 2.2 Services Hub (`services/index.html`)
- [ ] Create `services/` directory
- [ ] Duplicate `index.html` as base template
- [ ] Strip non-essential sections
- [ ] Build Services Grid Layout

### 2.3 Individual Service Pages (`services/[service-name]/index.html`)
- [ ] Create directory structure for each service
- [ ] Implement Interior Doors Page
- [ ] Implement Trim & Baseboard Page
- [ ] Implement Custom Built-Ins Page
- [ ] Implement Cabinet Installation Page
- [ ] Implement Wall & Ceiling Treatments Page
- [ ] Implement Custom Woodworking Page

### 2.4 Our Work / Portfolio (`our-work/index.html`)
- [ ] Create `our-work/` directory
- [ ] Build Gallery Grid Layout
- [ ] Implement Lightbox or simple image view

### 2.5 Locations Hub (`locations/index.html`)
- [ ] Create `locations/` directory
- [ ] Build Locations List/Map

### 2.6 Individual Location Pages (`locations/[city]/index.html`)
- [ ] Create directory for each city
- [ ] Implement Denver Page
- [ ] Implement Golden Page
- [ ] Implement Lakewood Page
- [ ] Implement Arvada Page
- [ ] Implement Englewood Page
- [ ] Implement Littleton Page
- [ ] Implement Centennial Page
- [ ] Implement Highlands Ranch Page

### 2.7 Support Pages
- [ ] About Page (`about/index.html`)
- [ ] Contact Page (`contact/index.html`)
- [ ] FAQ Page (`faq/index.html`)
- [ ] Craftsmanship Standards (`craftsmanship-standards/index.html`)

---

## Phase 3: Blog Implementation

### 3.1 Blog Hub (`blog/index.html`)
- [ ] Design Blog Listing Layout
- [ ] Implement Categories Sidebar

### 3.2 Blog Posts (`blog/[post-slug]/index.html`)
- [ ] Create Blog Post Template
- [ ] Implement Initial Posts (Tier 1)

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
