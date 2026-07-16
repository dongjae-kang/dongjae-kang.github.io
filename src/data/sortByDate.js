// Shared reverse-chronological sort. Items carry an ISO `sortDate`
// (YYYY-MM-DD) used only for ordering; display dates stay free-form.
// Items without sortDate keep their original relative position at the end.
export function sortByDateDesc(items) {
  return [...items].sort((a, b) => (b.sortDate || '').localeCompare(a.sortDate || ''));
}
