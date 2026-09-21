const { chromium } = require("playwright");
const { readFileSync, mkdirSync } = require("node:fs");
const { resolve } = require("node:path");

const root = resolve(__dirname, "..");

const light = `--primary-text-color: #1b1b1a; --secondary-text-color: #5b5a55; --card-background-color: #fff; --secondary-background-color: #f3f2ee; --primary-color: #1d4ed8; --success-color: #2e7d32; --warning-color: #b7791f; --error-color: #c62828; background: #eeede9;`;
const dark = `--primary-text-color: #eceef1; --secondary-text-color: #9aa0aa; --card-background-color: #1a1c20; --secondary-background-color: #22252a; --primary-color: #8ab4f8; --success-color: #6fd39a; --warning-color: #f5c451; --orange-color: #ff9a6b; --error-color: #d93a3a; --bubble-main-background-color: #1a1c20; --bubble-secondary-background-color: #22252a; --bubble-border-radius: 32px; --bubble-sub-button-border-radius: 22px; background: #121316; color-scheme: dark;`;

/** Simulated alarm states: no live Home Assistant is involved. */
function alarm(state) {
  const at = (minutes) => new Date(Date.now() + minutes * 60000).toISOString();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(6, 30, 0, 0);
  const attributes = {
    friendly_name: "Matilde",
    enabled: state !== "disarmed",
    time_of_day: "06:30:00",
    weekdays: ["mon", "tue", "wed", "thu", "fri"],
    day_times: { fri: "07:15" },
    wake_mode: "both",
    light_entity: "light.bedroom",
    player_entity: "media_player.bedroom",
    person_entities: ["person.matilde"],
    require_home: true,
    skip_next: false,
    fade_duration: 900,
    fade_music_duration: 300,
    volume: 0.3,
    playlist: "Morning calm",
    playlist_options: ["Morning calm", "Wake up happy"],
    snooze_minutes: 10,
    next_fire: state === "armed" ? tomorrow.toISOString() : null,
    run_started: state === "ringing" ? at(-4) : state === "rising" ? at(-6) : null,
    snooze_until: state === "snoozed" ? at(8) : null,
  };
  return {
    "sensor.matilde_wakeup": { entity_id: "sensor.matilde_wakeup", state, attributes },
    "person.matilde": { entity_id: "person.matilde", state: "home", attributes: { friendly_name: "Matilde" } },
  };
}

/** Minimal stand-ins for HA's own elements, which exist only inside the HA frontend. */
const standIns = `
  customElements.define("ha-slider", class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = '<input type="range" style="width:100%;accent-color:var(--primary-color)">';
      const input = this.firstChild;
      input.min = this.getAttribute("min"); input.max = this.getAttribute("max");
      input.step = this.getAttribute("step"); input.value = this.value;
    }
  });
  customElements.define("ha-selector", class extends HTMLElement {
    connectedCallback() {
      const value = [].concat(this.value || []).join(", ");
      this.innerHTML = '<div style="padding:8px 14px;border-radius:12px;border:1px solid color-mix(in srgb,var(--primary-text-color) 22%,transparent)"><div style="font-size:12px;color:var(--secondary-text-color)">' + this.label + '</div><div>' + value + '</div></div>';
    }
  });
`;

async function shot(browser, errors, { file, theme, width = 1040, height = 700, column = 440, cards, dialog }) {
  // Native time inputs follow the browser locale, as they do in a real browser.
  const locale = cards[0].language === "nb" ? "nb-NO" : "en-GB";
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, locale });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setContent(`<style>
    body { margin: 0; padding: 28px; font: 15px system-ui, sans-serif; ${theme} }
    main { display: flex; gap: 28px; align-items: flex-start; }
    main > * { flex: 0 0 ${column}px; }
  </style><main></main>`);
  await page.addScriptTag({ content: standIns });
  await page.addScriptTag({ type: "module", content: readFileSync(resolve(root, "dist/lovelace-personal-wakeup-card.js"), "utf8") });
  await page.evaluate(async ({ cards, dialog }) => {
    await customElements.whenDefined("lovelace-personal-wakeup-card");
    for (const { states, appearance, language } of cards) {
      const card = document.createElement("lovelace-personal-wakeup-card");
      card.setConfig({ type: "custom:lovelace-personal-wakeup-card", entity: "sensor.matilde_wakeup", appearance });
      card.hass = { states, language, locale: { language }, callService: () => new Promise(() => {}) };
      document.querySelector("main").append(card);
      await card.updateComplete;
      if (dialog) {
        card.shadowRoot.querySelector('[aria-label="Configure"], [aria-label="Konfigurer"]').click();
        card.shadowRoot.querySelector("dialog").scrollTop = 0;
      }
    }
  }, { cards, dialog });
  await page.screenshot({ path: resolve(root, "images", file), fullPage: !dialog });
}

(async () => {
  // Native time inputs take their 24-hour format from the browser language.
  const browser = await chromium.launch({ headless: true, args: ["--lang=nb-NO"], env: { ...process.env, LANG: "nb_NO.UTF-8", LANGUAGE: "nb_NO" } });
  try {
    const errors = [];
    mkdirSync(resolve(root, "images"), { recursive: true });
    await shot(browser, errors, {
      file: "bubble-night.png",
      theme: dark,
      cards: [
        { states: alarm("armed"), appearance: "bubble", language: "nb" },
        { states: alarm("ringing"), appearance: "bubble", language: "nb" },
      ],
    });
    await shot(browser, errors, {
      file: "light.png",
      theme: light,
      cards: [
        { states: alarm("disarmed"), appearance: "default", language: "en-GB" },
        { states: alarm("snoozed"), appearance: "default", language: "en-GB" },
      ],
    });
    await shot(browser, errors, {
      file: "ringing-phone.png",
      theme: dark,
      width: 390,
      height: 520,
      column: 334,
      cards: [{ states: alarm("rising"), appearance: "bubble", language: "en-GB" }],
    });
    await shot(browser, errors, {
      file: "settings.png",
      theme: dark,
      width: 600,
      height: 1640,
      cards: [{ states: alarm("armed"), appearance: "bubble", language: "nb" }],
      dialog: true,
    });
    if (errors.length) throw new Error(`Browser errors: ${errors.join("; ")}`);
    console.log("Wrote images/bubble-night.png, light.png, ringing-phone.png and settings.png with simulated Home Assistant data.");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
