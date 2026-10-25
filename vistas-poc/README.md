# VISTAS International Affairs – Local POC

Static HTML/CSS/JS prototype of the revised International Affairs tab bar and pages (BRD draft v0.1 + Excel). No backend, no build step.

## Run
```
cd vistas-poc
python -m http.server 8080
```
Open http://localhost:8080/ (redirects to `overview.html`).

## Tabs (one page each)
| Tab | File |
|---|---|
| Overview (existing text + MoUs/admission boxes + Global Partnership) | `overview.html` |
| International Admission (renamed from Admissions, content unchanged) | `international-admission.html` |
| Students Cell (unchanged) | `students-cell.html` |
| Student Mobility (sub-tabs: Inbound, Outbound) | `student-mobility.html` |
| Faculty Mobility (sub-tabs: Inbound, Outbound) | `faculty-mobility.html` |
| Visiting Professors | `visiting-professors.html` |
| Collaboration | `collaboration.html` |

Removed vs. the live site: International MoU's, Activities, Officials, Contact tabs.

## Other files
- `css/styles.css`, `js/app.js` (nav menu, sub-tabs, MoU filter, simulated hostel form)
- `js/data.js` – partner list read from the supplied Global Partnership image
- `assets/global-partners.jpeg` – supplied image, used as-is
- `assets/forms/` – supplied forms (`.doc` originals + `.pdf` conversions)

## Real vs. draft vs. simulated
- **Verbatim from vistas.ac.in (read-only, 2026-10-25):** Overview, International Admission, Students Cell text. Live-page links/accordions (Programs, Eligibility, bonafide items) appear as plain labels.
- **DRAFT (orange badge / yellow `[to be confirmed]`):** MoU/admission boxes, mobility, visiting professors, collaboration copy. No programme facts invented.
- **Simulated:** Hostel Form validates and shows a demo confirmation; no network calls, no storage.
- **Form buttons:** Application Form, Learning Agreement and Hostel Form appear on **Student Mobility → Inbound only**.
- **Logo:** hot-linked from vistas.ac.in with text fallback offline. Tab links are POC-local.

## Test checklist
- [ ] Nav shows exactly 7 tabs in the order above; current tab highlighted on each page
- [ ] Overview: original text, then MoU boxes (filter works), admission boxes, Global Partnership image
- [ ] International Admission and Students Cell text matches live site
- [ ] Student/Faculty Mobility: Inbound/Outbound sub-tabs switch (mouse and ←/→ keys); `#outbound` deep link works
- [ ] Inbound only: three form buttons; PDFs open in new tab; .doc downloads work; outbound has none
- [ ] Hostel form: empty submit shows errors; check-out before check-in rejected; valid submit shows demo confirmation
- [ ] Draft/placeholder items visibly marked
- [ ] Usable at ~375px (menu button, no horizontal scroll)
