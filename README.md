# Jesse Adamu — Creative Portfolio

A static, multi-page portfolio that highlights brand design, web design, and sports graphics work with an interactive 3D hero carousel and cinematic navigation overlay.

- Built with vanilla HTML/CSS/JS, using GSAP from a CDN for animation.
- Includes dedicated pages for work categories (brand, sports, web, personal) plus a rich landing page with carousel, about, and contact call-to-action.
- Uses local assets in `Images/`, `fonts/`, and scoped styles in `css/` (per-section styling keeps pages modular).
- Mobile-friendly navigation with a scroll-locking hamburger menu and overlay.

## Project Structure
- `index.html` – landing page with hero carousel, about, and selected work.
- `work.html` – overview of categories with deep links to detailed galleries.
- `brand-design.html`, `tgraphics.html`, `gameday.html`, etc. – gallery/detail pages for each discipline.
- `css/` – shared styles (`header-hero.css`, `about-me.css`, `work.css`, `contact.css`, `cursor.css`) and page-specific folders (e.g., `css/Work-page`).
- `Js/` – interaction scripts (`script.js` for the landing page, `wscript.js` for the work page).
- `Images/`, `fonts/` – all media and typography assets referenced by the pages.

## Run Locally
1) From the project root, start a simple static server (example):  
   `python3 -m http.server 8000`
2) Open `http://localhost:8000/index.html` in your browser.  
   Other pages are available directly (e.g., `http://localhost:8000/work.html`, `brand-design.html`, etc.).

## Editing Notes
- Update hero and gallery visuals by replacing files in `Images/` and matching paths in the HTML.
- Adjust animations or carousel behavior in `Js/script.js`; nav/overlay logic is there as well.
- Tweak layout/typography in the relevant CSS file before creating new ones to keep styles consistent.
- External dependencies are loaded via CDN in the HTML head; no build step or package install is required.

## Deploy
Host the folder on any static host (e.g., Netlify/Vercel static deploy, GitHub Pages, S3/CloudFront). Ensure the root remains intact so relative asset paths resolve correctly.
