import { colorSchemeStyles } from "./color-schemes";
import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    color: var(--primary-text-color, #1b1b1a);
    --pw-text: var(--primary-text-color, #1b1b1a);
    --pw-muted: var(--secondary-text-color, #5b5a55);
    --pw-ok: var(--success-color, #2e7d32);
    --pw-warn: var(--warning-color, #f59e0b);
    --pw-orange: var(--orange-color, #ea580c);
    --pw-alarm: var(--error-color, #c62828);
    --pw-accent: var(--primary-color, #03a9f4);
    --pw-off: var(--disabled-text-color, #8a8984);
    --pw-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --pw-pill: var(--secondary-background-color, #f3f2ee);
    --pw-radius: 20px;
    --pw-tile: 16px;
  }
  :host([data-appearance="bubble"]) {
    --pw-surface: var(
      --bubble-main-background-color,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
    --pw-pill: var(
      --bubble-secondary-background-color,
      var(--secondary-background-color, #f3f2ee)
    );
    --pw-accent: var(--bubble-accent-color, var(--primary-color, #03a9f4));
    --pw-radius: var(--bubble-border-radius, 32px);
    --pw-tile: var(--bubble-sub-button-border-radius, 22px);
  }
  * {
    box-sizing: border-box;
  }
  ha-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background: var(--pw-surface);
    border-radius: var(--ha-card-border-radius, 16px);
    overflow: hidden;
  }
  :host([data-appearance="bubble"]) ha-card {
    border: var(--bubble-border, none);
    border-radius: var(--bubble-border-radius, 32px);
    box-shadow: var(--bubble-box-shadow, var(--ha-card-box-shadow));
  }

  /* Status tones: every tinted element reads --sev from its nearest tone. */
  .sev-ok {
    --sev: var(--pw-ok);
  }
  .sev-warn {
    --sev: var(--pw-warn);
  }
  .sev-snoozed {
    --sev: var(--pw-accent);
  }
  .sev-alarm {
    --sev: var(--pw-alarm);
  }
  .sev-off {
    --sev: var(--pw-off);
  }

  .i {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
  .i.s {
    width: 18px;
    height: 18px;
  }
  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .circ {
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    border-radius: var(--bubble-icon-border-radius, 50%);
    display: grid;
    place-items: center;
    color: color-mix(in srgb, var(--sev) 75%, var(--pw-text));
    background: color-mix(in srgb, var(--sev) 20%, transparent);
  }
  .circ.big {
    flex-basis: 52px;
    width: 52px;
    height: 52px;
  }
  .circ.big .i {
    width: 26px;
    height: 26px;
  }

  /* ---------- header ---------- */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-left: 8px;
  }
  .title {
    min-width: 0;
    font-size: 17px;
    font-weight: 700;
    color: var(--pw-muted);
    overflow-wrap: anywhere;
  }
  .icon-button {
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    padding: 0;
    display: grid;
    place-items: center;
    border: 0;
    border-radius: 50%;
    font: inherit;
    color: var(--pw-muted);
    background: var(--pw-pill);
    cursor: pointer;
  }
  .icon-button:hover {
    color: var(--pw-text);
  }

  /* ---------- hero (calm states) ---------- */
  .hero {
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 14px;
    border-radius: var(--pw-radius);
    background: var(--pw-pill);
  }
  .hero-text {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
  .status {
    font-size: 13px;
    font-weight: 600;
    color: color-mix(in srgb, var(--sev) 65%, var(--pw-text));
  }
  .current {
    font-size: 32px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  .current.dim {
    color: var(--pw-muted);
  }
  .context {
    font-size: 13px;
    color: var(--pw-muted);
    overflow-wrap: anywhere;
  }

  /* ---------- takeover (rising, ringing, snoozed) ---------- */
  .takeover {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: var(--pw-radius);
    background: color-mix(in srgb, var(--sev) 18%, var(--pw-pill));
  }
  .takeover-head {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .hero-title {
    font-size: 28px;
    font-weight: 800;
    line-height: 1.1;
    overflow-wrap: anywhere;
  }
  .hero-sub {
    font-size: 13px;
    color: var(--pw-muted);
    overflow-wrap: anywhere;
  }
  .hero-sub em {
    font-style: normal;
    font-weight: 600;
    margin-left: 4px;
    color: color-mix(in srgb, var(--sev) 65%, var(--pw-text));
  }
  .stop {
    min-height: 56px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 0;
    border-radius: 28px;
    font: inherit;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    background: color-mix(in srgb, var(--sev) 62%, #000);
    cursor: pointer;
  }
  .stop .i {
    width: 24px;
    height: 24px;
  }
  .snooze-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }
  .snooze-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 6px 0 4px;
    font-size: 14px;
    font-weight: 700;
  }
  .presets {
    display: flex;
    flex: 1 1 200px;
    gap: 6px;
  }
  .preset {
    flex: 1 1 0;
    min-width: 0;
    white-space: nowrap;
    min-height: 44px;
    padding: 0 12px;
    border: 0;
    border-radius: 22px;
    font: inherit;
    font-weight: 700;
    color: var(--pw-text);
    background: color-mix(in srgb, var(--pw-text) 8%, transparent);
    cursor: pointer;
  }
  .preset.primary {
    color: color-mix(in srgb, var(--sev) 65%, var(--pw-text));
    background: color-mix(in srgb, var(--sev) 24%, transparent);
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--sev) 60%, transparent);
  }
  /* Ringing takes over the card: solid alarm red, white primary action. */
  .takeover.is-ringing {
    color: #fff;
    background: var(--pw-alarm);
  }
  .takeover.is-ringing .circ {
    color: var(--pw-alarm);
    background: #fff;
    animation: pulse 1.4s ease-in-out infinite;
  }
  .takeover.is-ringing .hero-sub,
  .takeover.is-ringing .hero-sub em {
    color: rgb(255 255 255 / 0.88);
  }
  .takeover.is-ringing .stop {
    color: var(--pw-alarm);
    background: #fff;
  }
  .takeover.is-ringing .preset {
    color: #fff;
    background: rgb(0 0 0 / 0.2);
  }
  .takeover.is-ringing .preset.primary {
    background: rgb(255 255 255 / 0.22);
    box-shadow: inset 0 0 0 1.5px #fff;
  }
  .takeover.is-ringing button:focus-visible {
    outline-color: #fff;
  }
  @keyframes pulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgb(255 255 255 / 0.55);
    }
    50% {
      box-shadow: 0 0 0 10px rgb(255 255 255 / 0);
    }
  }

  /* ---------- grouped rows ---------- */
  .settings.rows,
  .toggles {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 56px;
    padding: 6px 12px 6px 6px;
    border-radius: var(--pw-radius);
    background: var(--pw-pill);
    cursor: pointer;
  }
  .row-text {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
  .name {
    font-weight: 700;
    overflow-wrap: anywhere;
  }
  .state {
    font-size: 13px;
    color: var(--pw-muted);
    overflow-wrap: anywhere;
  }
  .state.on {
    font-weight: 600;
    color: color-mix(in srgb, var(--sev) 65%, var(--pw-text));
  }
  .state.away {
    font-weight: 600;
    color: color-mix(in srgb, var(--pw-warn) 65%, var(--pw-text));
  }
  /* A native checkbox with role=switch, drawn as a family pill toggle. */
  .switch {
    appearance: none;
    flex: 0 0 auto;
    position: relative;
    width: 52px;
    height: 32px;
    margin: 0;
    border-radius: 16px;
    background: color-mix(in srgb, var(--pw-text) 14%, transparent);
    cursor: pointer;
    transition: background 150ms;
  }
  .switch::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--pw-surface);
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
    transition: transform 150ms;
  }
  .switch:checked {
    background: color-mix(in srgb, var(--sev) 62%, #000);
  }
  .switch:checked::after {
    transform: translateX(20px);
    background: #fff;
  }
  .switch:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  .switch:focus-visible {
    outline: 2px solid var(--primary-color, #0277bd);
    outline-offset: 2px;
  }

  /* ---------- settings dialog ---------- */
  dialog {
    width: min(520px, calc(100vw - 24px));
    max-height: calc(100dvh - 24px);
    padding: 20px;
    border: 0;
    border-radius: var(--pw-radius);
    color: var(--pw-text);
    background: var(--pw-surface);
    box-shadow: 0 16px 60px #0006;
    overflow: auto;
  }
  :host([data-appearance="bubble"]) dialog {
    border: var(--bubble-border, none);
  }
  dialog::backdrop {
    background: #0007;
  }
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-left: 8px;
    margin-bottom: 12px;
  }
  .dialog-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
    overflow-wrap: anywhere;
  }
  dialog .settings {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    padding: 12px 14px;
    border-radius: var(--pw-tile);
    background: var(--pw-pill);
  }
  .device-field,
  .wide,
  dialog .toggles {
    grid-column: 1 / -1;
  }
  .selector-field {
    padding: 4px;
    background: none;
  }
  p.device-field {
    margin: 0;
    font-size: 14px;
    padding: 12px 14px;
    border-radius: var(--pw-tile);
    background: color-mix(in srgb, var(--pw-warn) 16%, var(--pw-pill));
  }
  .label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--pw-muted);
  }
  .label .value {
    margin-left: auto;
    font-size: 15px;
    font-weight: 700;
    color: var(--pw-text);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .value.muted {
    color: var(--pw-muted);
    font-weight: 400;
    overflow-wrap: anywhere;
  }
  .time-input,
  select {
    width: 100%;
    min-height: 44px;
    padding: 0 14px;
    border: 0;
    border-radius: 22px;
    font: inherit;
    font-size: 16px;
    color: var(--pw-text);
    background: color-mix(in srgb, var(--pw-text) 7%, transparent);
  }
  select option {
    color: var(--pw-text);
    background: var(--pw-surface);
  }
  .time-field .time-input {
    min-height: 48px;
    font-size: 24px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }
  ha-selector {
    display: block;
    min-width: 0;
  }
  ha-slider {
    width: 100%;
  }
  .weekdays {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .weekdays .day-row {
    flex: 1 1 40px;
    display: flex;
  }
  .daily-times {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .daily-times .day-row {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }
  .daily-times .time-input {
    flex: 1;
    min-width: 0;
  }
  .day {
    flex: 1;
    min-width: 44px;
    min-height: 40px;
    padding: 0 10px;
    border: 0;
    border-radius: 20px;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    color: var(--pw-muted);
    background: color-mix(in srgb, var(--pw-text) 7%, transparent);
    cursor: pointer;
  }
  .daily-times .day {
    flex: 0 0 52px;
  }
  .day.on {
    color: color-mix(in srgb, var(--pw-accent) 65%, var(--pw-text));
    background: color-mix(in srgb, var(--pw-accent) 24%, transparent);
    box-shadow: inset 0 0 0 1.5px
      color-mix(in srgb, var(--pw-accent) 60%, transparent);
  }
  .text-button {
    min-height: 44px;
    padding: 0 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: 0;
    border-radius: 22px;
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    color: var(--pw-text);
    background: color-mix(in srgb, var(--pw-text) 8%, transparent);
    cursor: pointer;
  }
  .text-button.strong {
    color: #fff;
    background: color-mix(in srgb, var(--pw-accent) 62%, #000);
  }
  .daily-times .text-button {
    flex: 0 0 auto;
    padding: 0 12px;
    font-size: 13px;
  }
  .save-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
  }
  .save-row .value {
    flex: 1 1 100%;
    padding: 0 8px;
    font-size: 13px;
  }
  .save-row .text-button {
    flex: 1 1 140px;
  }
  .footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 12px;
    padding: 6px 6px 6px 14px;
    border-radius: var(--pw-radius);
    background: var(--pw-pill);
    font-size: 14px;
    color: var(--pw-muted);
  }
  .footer-note {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .error {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--pw-alarm);
  }
  dialog .error {
    margin: 12px 0 0;
    padding: 12px 14px;
    border-radius: var(--pw-tile);
    color: var(--pw-text);
    background: color-mix(in srgb, var(--pw-alarm) 16%, var(--pw-pill));
  }
  dialog .error .i {
    color: color-mix(in srgb, var(--pw-alarm) 75%, var(--pw-text));
  }
  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  button:focus-visible,
  select:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--primary-color, #0277bd);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    .spin,
    .takeover.is-ringing .circ {
      animation: none;
    }
  }
  @media (max-width: 480px) {
    dialog .settings {
      grid-template-columns: 1fr;
    }
    dialog {
      padding: 16px;
    }
  }
  @media (max-width: 400px) {
    ha-card {
      padding: 12px;
    }
    .current {
      font-size: 26px;
    }
  }
  ${colorSchemeStyles}
`;
