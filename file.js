import { saveAs } from 'file-saver';
export function exportNotes(notes) {
  const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
  saveAs(blob, 'notes-export.json');
}
export function importNotesFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
