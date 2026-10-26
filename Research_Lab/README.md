# Rajesh Kumar — Research & Innovation Lab v2

A responsive, static research-portfolio website, suitable for GitHub Pages and designed to complement **LearningAi**.

## What's included

- Editorial homepage with medical AI visual reference, academic identity and navigational sections.
- ResearchLedger v2.0.1 featured research case study, architecture graphic, and interactive documentation-based stage explorer.
- Featured medical annotation and healthcare federated-learning research directions.
- Six workbenches inherited from the original v1 project: four executable/simulated browser experiences and two previews. Demos remain separate from actual empirical paper results.
- Source links to the supplied ResearchLedger and academic research skills repositories plus AutoResearch and Beihang Referee.
- Two provided YouTube videos: click-to-play privacy-enhanced embed, source links, and offline SVG poster fallback.
- Searchable selected publications (10 records, including one clearly labeled preprint and one submitted manuscript). Published citations link to DOI records; paper attribution and metadata should be confirmed before this becomes the official complete CV bibliography.
- Responsive layout, filterable demos, accessible button and modal labeling, and client-side operation.

## Deployment

1. Unzip and copy the **contents** of this folder to the root of a new GitHub repository (or a `/docs` directory).
2. Open GitHub → Settings → Pages → Deploy from a branch → `main` → `/ (root)` (or `/docs`).
3. Visit the published Pages URL after deployment. No build command, Python server, cloud AI API, or paid service is needed for the static site.
4. For a subpath such as `https://yourname.github.io/repo/`, relative asset links already work. The built-in hash routes `#/project/<name>` handle demo workbench views.

For a local preview you may run `python -m http.server 8000` in this directory and open `http://localhost:8000/`. Double-clicking `index.html` works in many browsers but a local server is more reliable.

## Files

- `index.html` — content and layout
- `design.css` — new design and responsive layout
- `legacy.css` — retained demo workbench styling from v1
- `app.js` — original interactive lab engines
- `redesign.js` — ResearchLedger stage selector, video modal, paper search, featured project navigation
- `assets/*.jpg` — crops of user-supplied **illustrative** reference images
- `assets/*.svg` — static vector fallback posters and favicon

## Research integrity and publication verification

**ResearchLedger** description and release were checked against [its README](https://github.com/raja21068/ResearchLedger). It is a research prototype; its machine-checkable gates do not certify scientific novelty, correctness, independent replication, journal acceptance, or scientific performance.

The **AI Academic Research Skills** descriptions come from its [public README](https://github.com/raja21068/claude-chatgpt-academic-research-skills). The second YouTube title is stated in that README. The first video is intentionally described generically because its title could not be independently retrieved.

The medical images were supplied as *visual design references*, **not** original clinical MRI evidence, a verified trained model output, or an actual patient record. Do not attach purported experimental accuracy to these assets. The third supplied comparison reference contained an impossible same-mask metric combination (Dice 65.5%, IoU 66.2%) and its bottom metrics were cropped rather than reproduced. Dice and IoU for the same binary mask obey `Dice = 2 × IoU / (1 + IoU)`.

The workbench `AutoLabel` uses synthetic pixels and a synthetic reference mask. The FedAvg/FedProx comparison uses deterministic generated data and a small JavaScript classifier; it does not implement secure aggregation, differential privacy, or an evaluated healthcare system. Beihang Referee on the site is a pre-authored scripted sample, not an online multi-agent model. AutoResearch and Brain Dynamics remain previews.

Paper list is **selected**, not complete. Titles/DOIs were drawn from the previously supplied CV plus the verified AutoResearch arXiv record; public sources independently corroborate multiple recent records. The VisGen item is labeled **submitted**, not published, without a fabricated DOI. For the final website, cross-check remaining DOI/author records via Crossref/ORCID/Scopus or publisher pages.

## Customize before publication

- Add your official CV PDF and link it from the header, if you have permission to publish it.
- Replace illustrated research screenshots with authentic, consent-cleared or licensed figures, once the empirical provenance is documented.
- Update contact email (none fabricated here), institution line, and full publication bibliography.
- Swap the two video SVG posters for verified high-resolution YouTube thumbnails if embed metadata becomes available.
- Extend ResearchLedger to a **real recorded-trace explorer** only when authentic anonymized run artifacts are available.

## Validation performed

- JavaScript syntax checks (`node --check app.js`, `node --check redesign.js`) passed.
- Required sections, publication count, video IDs, demos, and internal links checked.
- In-memory Chromium render succeeded for desktop and mobile; desktop full-page screenshot and mobile layout captured. In-memory tests confirmed medical-demo filtering, lab modal opening, and publication search. Local file-path navigation is blocked by this test environment's browser policy, so a deployed GitHub Pages smoke test remains outstanding.

No GitHub repository was modified or published from this package.
