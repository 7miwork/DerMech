# DerMech Solution — Official Website

**德機智造 | Engineering Beyond Boundaries**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> German engineering consulting for industrial automation, CE/DIN standards compliance, and engineering education — serving Taiwan and Asia.

---

## Overview

Static corporate website for **DerMech Solution** ([dermech-etc.com](https://dermech-etc.com)), a German mechanical engineering consultancy bridging German engineering rigor with Asian manufacturing agility.

Built with pure HTML5 · CSS3 · Vanilla JavaScript — no frameworks, no build tools, no dependencies.

---

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, stats, services overview, industries preview |
| `about.html` | Company background & founder profile |
| `services.html` | Core services — Automation, Engineering Design, Education |
| `industries.html` | 12 industries served |
| `standards.html` | Engineering standards & 8-phase project workflow |
| `contact.html` | Contact form with client-side validation |

---

## Project Structure

```
DerMech/
├── index.html
├── about.html
├── services.html
├── industries.html
├── standards.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── LICENSE
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── img/
```

---

## Features

- **Bilingual EN/ZH** — all content via `data-en` / `data-zh` attributes, language persists in `localStorage`
- **Responsive** — breakpoints at 1440px · 1024px · 768px · 375px
- **Mobile navigation** — full-screen overlay hamburger menu
- **Scroll animations** — IntersectionObserver reveal effects
- **Contact form** — client-side validation with success state
- **Accessibility** — semantic HTML, focus-visible outlines, reduced-motion support
- **Zero dependencies** — no Bootstrap, no Tailwind, no npm

---

## Standards Referenced

- DIN EN ISO 9001 — Quality Management
- DIN EN 61355 — Classification of documents
- ISO 128 — Technical drawings
- CE Marking Directive

---

## Local Development

No build step required. Open directly in a browser or serve locally:

```bash
python -m http.server 8000
# → http://localhost:8000
```

---

## Brand

| Token | Value |
|-------|-------|
| Primary color | `#1A56DB` (German Blue) |
| Display font | Barlow |
| Body font | Inter |
| Mono font | JetBrains Mono |
| Design language | German industrial · Swiss grid · dark theme |

---

## License

MIT License — see [LICENSE](LICENSE) for details.

© 2024 DerMech Solution

---

## Contact

🌐 [dermech-etc.com](https://dermech-etc.com)  
💻 [github.com/7miwork/DerMech](https://github.com/7miwork/DerMech)