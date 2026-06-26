# DerMech Solution — Official Website

**德機智造 | Engineering Beyond Boundaries**

Premium bilingual corporate website for DerMech Solution, a German-led engineering consulting company specializing in industrial automation, mechanical design, and engineering education.

## Pages

- `index.html` — Homepage with hero, stats, services overview, workflow, industries preview
- `about.html` — About & Founder Profile (Michael Lison)
- `services.html` — Three Core Services (Automation Consulting, Engineering Design, Engineering Education)
- `industries.html` — 12 Industries Served
- `standards.html` — Engineering Standards & Full 8-Phase Workflow
- `contact.html` — Contact Form with Validation

## Tech Stack

Pure HTML5 + CSS3 + Vanilla JavaScript. No build tools, no frameworks.

- One shared CSS file: `assets/css/style.css`
- One shared JS file: `assets/js/main.js`
- All pages in root directory
- Font loading via Google Fonts CDN
- No external UI libraries, no Bootstrap, no Tailwind

## Development

Open `index.html` directly in a browser, or serve with any local HTTP server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`

## Brand

- **Primary color:** #1A56DB (German Blue)
- **Typography:** Barlow (display) + Inter (body) + JetBrains Mono (technical)
- **Design language:** German industrial, Swiss grid, dark theme, zero rounded corners

## Features

- **Bilingual (EN/ZH):** All content in English and Traditional Chinese via `data-en`/`data-zh` attributes
- **Language toggle:** Persists in localStorage
- **Sticky nav:** Scroll effect with backdrop blur
- **Scroll reveal:** IntersectionObserver animations
- **Mobile menu:** Full-screen overlay
- **Contact form:** Client-side validation with success state
- **Responsive:** 1440px, 1024px, 768px, 375px breakpoints
- **Accessibility:** Focus-visible outlines, semantic HTML, reduced motion support# DerMech
