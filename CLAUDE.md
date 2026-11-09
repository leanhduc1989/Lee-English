# Lee English – notes for Claude

Free static web app (GitHub Pages) for learning everyday workplace English: HR, banking, real estate, energy. Target IELTS 6.0. Owner: Đức (leanhduc1989).

- Live site: https://leanhduc1989.github.io/Lee-English/ (repo name is case-sensitive: `Lee-English`).
- Workflow agreed with the owner: improve the app, test it, then commit and push to `main` directly. Pages redeploys in 1–2 minutes.

## Structure
- `index.html` – shell, styles (dark theme, neon green #44D62C, Chakra Petch + Inter).
- `lessons.js` – `window.LESSONS`: each lesson has `id, field, title, storyTitle, lines[8], fills[3]{text,ans[],line,word}, explainQ, evidence[], model, keys[], words[5]{en,ipa,vi,def,ex}, grammar{title,why,examples,focus,qs[{q,opts,a,why}]}, speak[4]{lee,target,vi}, dict{}`. `fills[].word` must appear in `lines[line]`.
- `app.js` – UI and logic. No server, no AI: browser speech synthesis (Lee's voice), Web Speech recognition for speaking practice, local alignment scoring (`compare`). Progress in `localStorage` key `lee-english-v1`.

## Rules
- UI text in English; Vietnamese only for meanings and hints.
- Keep it a static site (no build step, no secrets, no paid APIs).
- Test changes in a headless browser before pushing; keep old saved progress compatible.
