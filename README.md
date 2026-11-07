# unplug. — The electricity coach for real homes

A single-page app that shows which appliances are raising your electricity bill and,
on Premium, manages your energy from day one.

## Two levels

- **Standard (free)** — see which appliances use the most electricity each month,
  with a live bill breakdown and biggest-drain ranking.
- **Premium (65 kr/month)** — a personal energy plan from day one, action-by-action
  savings tracking, monthly savings history, and projections.

This build is a **browser demo**: joining and upgrading are simulated with
`localStorage`. No backend, no real payments, no tracking.

## Pages (inside the app)

- **Dashboard** — monthly bill estimate, biggest drain, appliance list, and (Premium) your energy plan.
- **My savings** — month-by-month savings history and a 12-month projection.
- **Community** — proof that members save an average of **12 000 kr in their first year**, plus testimonials.

## Run it

No build step, no dependencies.

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Or double-click `index.html`.

## Publish to GitHub

This folder is a ready-to-push git repository. Create an empty repo on GitHub,
then run:

```bash
git remote add origin https://github.com/<you>/unplug.git
git branch -M main
git push -u origin main
```

## Files

- `index.html` — page structure, landing, app shell, dialogs
- `styles.css` — the design system, intro animation, reveal-on-scroll styles
- `app.js` — catalog, calculator, tiers, routing, savings logic
- `fx.js` — the unplugging intro animation and scroll interactions (progress bar, reveals, animated counters, scrollspy, parallax)
- `pitch-deck.pptx` — 3-minute pitch deck (savings slide includes kWh, SEK, CO₂e + sources)
- `PITCH.md` — timed pitch script and Q&A notes

## Notes

Amounts are estimates based on wattage, usage hours, and an editable tariff
(default **2,50 kr/kWh**). Real bills vary with your tariff plan and habits.
