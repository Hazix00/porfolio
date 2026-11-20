# Hamza Taoussi — Portfolio

A responsive, bilingual static portfolio built with HTML, CSS and vanilla JavaScript.

## Run locally
Open `index.html` in a browser. No build step or backend is required.

## Deploy to GitHub Pages
1. Create a GitHub repository (for example, `hamza-portfolio`).
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site.

All internal asset paths are relative, so the site works from a GitHub Pages project URL.

## Languages
The site detects the browser language (English or French), defaults to English for other languages, and lets visitors switch manually. The preference is saved in local storage.

## Content and evidence notes
- Career start date is set to May 2019; the elapsed-years counter is calculated dynamically.
- Flow Digital is listed as October 2023 – September 2026.
- Public contact details are limited to email, LinkedIn and GitHub.
- Project visuals are original illustrative SVG compositions. They are not screenshots of private product interfaces.
- Public product links are included for Keeze, Devis Home and Lizee.
- Project assignment dates marked with an asterisk are approximate; confirm exact dates before publishing if you want month-level precision.

## Before publishing
- Review all copy and confirm that client/project names and descriptions may be shared publicly.
- Add a custom domain if desired.
- Consider adding a dedicated social preview image.


### Responsive project imagery
Each project includes dedicated desktop, tablet and portrait mobile SVG artwork. The page selects the matching composition with HTML `<picture>` media sources.


## Project image assets

The Keeze, Devis Home and Lizee carousels expect your locally generated responsive images in the `img/` directory at the site root. Keep the folder names and filenames exactly as follows:

- `img/keeze-img-1/` through `img/keeze-img-3/`
- `img/devihome-img-1/` through `img/devihome-img-2/`
- `img/lizee-img-1/` through `img/lizee-img-9/`

Each folder should contain the provided `-desktop-lg`, `-desktop-md`, `-tablet-lg`, `-tablet-sm`, `-mobile-2x`, and `-mobile-1x` variants in both `.webp` and `.jpg` formats. The HTML references these exact names; image files are intentionally not bundled because they are maintained locally by you.

DmpEServices uses the two original SVG carousel assets in `assets/dmp-workflow.svg` and `assets/dmp-form-builder.svg`. MetaGIS retains its existing responsive SVG artwork.
