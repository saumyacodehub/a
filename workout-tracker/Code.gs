// Google Apps Script backend. Paste into the Apps Script editor of the
// "Workout Tracker DB" spreadsheet (Extensions > Apps Script), then deploy as Web app.
const SHEET_NAME = 'Workouts';
const HEADERS = ['Date', 'Exercise', 'Weight (kg)', 'Reps', 'Sets', 'Notes', 'Logged At'];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.getSheets()[0];
    sh.setName(SHEET_NAME);
  }
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// GET -> returns all entries
function doGet() {
  const sh = getSheet_();
  const rows = sh.getDataRange().getValues().slice(1);
  const tz = Session.getScriptTimeZone();
  const entries = rows.filter(r => r[1] !== '').map(r => ({
    date: r[0] instanceof Date ? Utilities.formatDate(r[0], tz, 'yyyy-MM-dd') : String(r[0]),
    exercise: r[1], weight: r[2], reps: r[3], sets: r[4], notes: r[5]
  }));
  return json_({ ok: true, entries });
}

// POST (text/plain JSON body) -> appends one entry
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.exercise || d.weight === '' || d.weight == null || !d.date) {
      return json_({ ok: false, error: 'date, exercise and weight are required' });
    }
    const sh = getSheet_();
    const col = 1; // keep date as plain text yyyy-MM-dd
    sh.getRange(sh.getLastRow() + 1, 1, 1, 7).setNumberFormats([['@', '@', '0.##', '0', '0', '@', '@']])
      .setValues([[d.date, d.exercise, Number(d.weight), d.reps || '', d.sets || '', d.notes || '', new Date().toISOString()]]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
