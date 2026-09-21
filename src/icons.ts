import { html, svg, type SVGTemplateResult } from "lit";

const paths: Record<string, SVGTemplateResult> = {
  alarm: svg`<circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2.5 2"></path><path d="M5 3 2 6M22 6l-3-3"></path>`,
  alarmOff: svg`<path d="M6.87 6.87a8 8 0 1 0 11.26 11.26"></path><path d="M19.9 14.25a8 8 0 0 0-9.15-9.15"></path><path d="m22 6-3-3M2 2l20 20M4 4 2 6"></path>`,
  sunrise: svg`<path d="M12 2v7"></path><path d="m8 6 4-4 4 4"></path><path d="m4.93 10.93 1.41 1.41M19.07 10.93l-1.41 1.41M2 18h2M20 18h2M22 22H2"></path><path d="M16 18a4 4 0 0 0-8 0"></path>`,
  ringing: svg`<path d="M10.3 21a2 2 0 0 0 3.4 0"></path><path d="M3.3 15.3A1 1 0 0 0 4 17h16a1 1 0 0 0 .7-1.7C19.4 14 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.4 6-2.7 7.3"></path><path d="M22 8c0-2.3-.8-4.3-2-6M4 2C2.8 3.7 2 5.7 2 8"></path>`,
  snooze: svg`<path d="M4 4h6l-6 7h6"></path><path d="M13 11h7l-7 9h7"></path>`,
  stop: svg`<circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6" rx="1"></rect>`,
  power: svg`<path d="M12 2v10"></path><path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path>`,
  skip: svg`<path d="m5 4 10 8-10 8z"></path><path d="M19 5v14"></path>`,
  home: svg`<path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path>`,
  clock: svg`<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>`,
  calendar: svg`<rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path>`,
  light: svg`<path d="M9 18h6M10 22h4"></path><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"></path>`,
  music: svg`<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>`,
  volume: svg`<path d="M11 5 6 9H2v6h4l5 4z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"></path>`,
  playlist: svg`<path d="M21 15V6"></path><circle cx="18.5" cy="15.5" r="2.5"></circle><path d="M12 12H3M16 6H3M12 18H3"></path>`,
  play: svg`<circle cx="12" cy="12" r="10"></circle><path d="m10 8 6 4-6 4z"></path>`,
  close: svg`<path d="M18 6 6 18M6 6l12 12"></path>`,
  warning: svg`<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"></path><path d="M12 9v4M12 17h.01"></path>`,
  spinner: svg`<path d="M21 12a9 9 0 1 1-6.2-8.56"></path>`,
  cog: svg`<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>`,
};

// No whitespace inside <svg>: it would leak into a button's textContent.
// prettier-ignore
export const icon = (name: string, extra = "") =>
  html`<svg class="i ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
