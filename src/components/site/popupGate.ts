// Only one promotional overlay (lead popup, install banner) may be on screen at a time.
// The active one is recorded on <body data-popup="..."> so independent components can check it.

export const popupActive = () => typeof document !== "undefined" && !!document.body.dataset.popup;

export function claimPopup(name: string) {
  if (popupActive()) return false;
  document.body.dataset.popup = name;
  return true;
}

export function releasePopup(name: string) {
  if (document.body.dataset.popup === name) delete document.body.dataset.popup;
}
