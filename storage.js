const KEY = 'notes_app_advanced_v1';
export function loadNotes() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('loadNotes', e);
    return null;
  }
}
export function saveNotes(notes) {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('saveNotes', e);
  }
}
