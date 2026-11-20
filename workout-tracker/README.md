# Workout Tracker

Static web page (`index.html`) that logs daily exercises + weight to a Google Sheet
("Workout Tracker DB", tab `Workouts`) through a small Google Apps Script web app (`Code.gs`).

## Setup (once, ~3 min)
1. Open the sheet: https://docs.google.com/spreadsheets/d/1SFrKZomUd3dtUJSGzmmXpbA0wqtdVTNwecWRPfScu_o/edit
2. **Extensions → Apps Script**, delete the default code, paste `Code.gs`, save.
3. **Deploy → New deployment → Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and authorize.
4. Copy the Web app URL (ends in `/exec`).
5. Open `index.html` (double-click, or host on GitHub Pages/Netlify) and paste the URL when asked.
   It is stored in your browser. Or hardcode it: add `<script>window.APPS_SCRIPT_URL="..."</script>` before the main script.

## Security note
"Anyone" access means anyone with the URL can read/append to the sheet. The URL is unguessable but not secret-proof;
don't commit it to a public repo if that matters.
