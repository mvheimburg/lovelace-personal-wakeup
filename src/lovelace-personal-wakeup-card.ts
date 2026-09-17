import { LitElement, css, html, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "./lovelace-personal-wakeup-card-editor";

interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

interface HomeAssistant {
  states: Record<string, HassEntity>;
  locale?: { language?: string };
  callService(
    domain: string,
    service: string,
    data?: Record<string, any>
  ): Promise<unknown>;
}

interface PersonalWakeupCardConfig {
  type: string;
  entity: string;
  name?: string;
  appearance?: "default" | "bubble";
  snooze_presets?: number[];
}

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const WEEKDAY_LABELS: Record<string, string> = {
  mon: "Mo",
  tue: "Tu",
  wed: "We",
  thu: "Th",
  fri: "Fr",
  sat: "Sa",
  sun: "Su"
};
// Service settings contain scalars, arrays and the weekday/time mapping.
function sameSetting(left: unknown, right: unknown): boolean {
  if (left && right && typeof left === "object" && typeof right === "object") {
    const a = Object.entries(left).sort(([x], [y]) => x.localeCompare(y));
    const b = Object.entries(right).sort(([x], [y]) => x.localeCompare(y));
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return left === right;
}

const DEFAULT_SNOOZE_PRESETS = [5, 10, 15];

const STATE_LABELS: Record<string, string> = {
  disarmed: "Off",
  armed: "Armed",
  rising: "Waking up",
  ringing: "Ringing",
  snoozed: "Snoozed",
  unavailable: "Unavailable",
  unknown: "Unknown"
};

const STATE_ICONS: Record<string, string> = {
  disarmed: "mdi:alarm-off",
  armed: "mdi:alarm",
  rising: "mdi:weather-sunset-up",
  ringing: "mdi:alarm-light",
  snoozed: "mdi:alarm-snooze"
};

@customElement("lovelace-personal-wakeup-card")
export class PersonalWakeupCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: PersonalWakeupCardConfig;
  /** Live slider values while dragging, keyed by attribute name. */
  @state() private _draft: Record<string, number> = {};
  @state() private _busy: string | null = null;
  @state() private _settingsDraft: Record<string, any> = {};
  @state() private _settingsError = "";
  private _savedDraft: Record<string, any> | null = null;
  private _tick?: number;

  private _advanced(): boolean {
    const a = this._entity()?.attributes ?? {};
    return "wake_mode" in a && "person_entities" in a && "day_times" in a;
  }

  private _stage(partial: Record<string, unknown>): void {
    this._settingsDraft = { ...this._settingsDraft, ...partial };
    this._settingsError = "";
  }

  protected willUpdate(): void {
    if (!this._savedDraft) return;
    const a = this._entity()?.attributes ?? {};
    const acknowledged = Object.entries(this._savedDraft).every(([key, value]) =>
      sameSetting(a[key === "ma_player_entity" ? "player_entity" : key], value));
    if (acknowledged) {
      const remaining = { ...this._settingsDraft };
      for (const [key, value] of Object.entries(this._savedDraft)) {
        if (sameSetting(remaining[key], value)) delete remaining[key];
      }
      this._settingsDraft = remaining;
      this._savedDraft = null;
    }
  }

  private async _saveSettings(): Promise<void> {
    if (this._busy || !this._advanced()) return;
    const partial = { ...this._settingsDraft };
    const a = this._entity()?.attributes ?? {};
    const mode = partial.wake_mode ?? a.wake_mode;
    if ((mode !== "music" && !(partial.light_entity ?? a.light_entity)) ||
        (mode !== "lights" && !(partial.ma_player_entity ?? a.player_entity))) {
      this._settingsError = "Choose a target for each enabled channel.";
      return;
    }
    this._settingsError = "";
    if (await this._call("set_config", partial)) {
      this._savedDraft = partial;
      this.requestUpdate();
    }
  }

  public setConfig(config: PersonalWakeupCardConfig): void {
    if (!config.entity) {
      throw new Error("You must define an entity for lovelace-personal-wakeup-card");
    }
    if (this._config?.entity !== config.entity) {
      this._settingsDraft = {};
      this._savedDraft = null;
      this._settingsError = "";
      this._draft = {};
    }
    this._config = config;
    this.setAttribute("data-appearance", config.appearance === "bubble" ? "bubble" : "default");
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): Element {
    return document.createElement("lovelace-personal-wakeup-card-editor");
  }

  public static getStubConfig(hass?: HomeAssistant): PersonalWakeupCardConfig {
    const found = hass
      ? Object.values(hass.states).find(
          (s) =>
            s.entity_id.startsWith("sensor.") &&
            "next_fire" in s.attributes &&
            "time_of_day" in s.attributes
        )
      : undefined;
    return {
      type: "custom:lovelace-personal-wakeup-card",
      entity: found?.entity_id ?? ""
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Re-render every 30 s so "in 12 min" style countdowns stay honest.
    this._tick = window.setInterval(() => this.requestUpdate(), 30_000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._tick) window.clearInterval(this._tick);
  }

  // ---------------------------------------------------------------- helpers

  private _entity(): HassEntity | undefined {
    return this.hass?.states?.[this._config?.entity];
  }

  private _lang(): string | undefined {
    return this.hass?.locale?.language || undefined;
  }

  private _fmtTime(value: string | null | undefined): string {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleTimeString(this._lang(), { hour: "2-digit", minute: "2-digit" });
  }

  private _fmtDay(value: string | null | undefined): string {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    const now = new Date();
    const startOf = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
    const dayDiff = Math.round((startOf(d) - startOf(now)) / 86_400_000);
    if (dayDiff === 0) return "Today";
    if (dayDiff === 1) return "Tomorrow";
    return d.toLocaleDateString(this._lang(), { weekday: "short" });
  }

  private _fmtRelative(value: string | null | undefined): string {
    if (!value) return "";
    const diffMin = Math.round((new Date(value).getTime() - Date.now()) / 60_000);
    if (Number.isNaN(diffMin)) return "";
    const abs = Math.abs(diffMin);
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    const span = h ? (m ? `${h} h ${m} min` : `${h} h`) : `${m} min`;
    return diffMin >= 0 ? `in ${span}` : `${span} ago`;
  }

  private _normalizeTime(value: unknown): string {
    if (!value) return "07:00";
    const s = String(value);
    return s.length >= 5 && s.indexOf(":") === 2 ? s.slice(0, 5) : "07:00";
  }

  private _toast(message: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-notification", {
        detail: { message },
        bubbles: true,
        composed: true
      })
    );
  }

  private async _call(
    service: string,
    data: Record<string, unknown> = {},
    label = service
  ): Promise<boolean> {
    this._busy = label;
    try {
      await this.hass.callService("personal_wakeup", service, {
        entity_id: this._config.entity,
        ...data
      });
      return true;
    } catch (err: any) {
      const msg = err?.message || err?.error || String(err);
      this._settingsError = String(msg);
      this._toast(`Wakeup alarm: ${service} failed (${msg})`);
      return false;
    } finally {
      this._busy = null;
    }
  }

  private _set(partial: Record<string, unknown>): Promise<boolean> {
    return this._call("set_config", partial, "set_config");
  }

  private _openSettings(): void {
    this.renderRoot.querySelector<HTMLDialogElement>("dialog")?.showModal();
  }

  private _closeSettings(): void {
    this.renderRoot.querySelector<HTMLDialogElement>("dialog")?.close();
  }

  private _sliderInput(key: string, ev: Event): void {
    const value = Number((ev.target as HTMLInputElement).value);
    this._draft = { ...this._draft, [key]: value };
  }

  private async _sliderChange(key: string, ev: Event, scale = 1): Promise<void> {
    const value = Number((ev.target as HTMLInputElement).value);
    if (!await this._set({ [key]: value * scale })) return;
    const draft = { ...this._draft };
    delete draft[key];
    this._draft = draft;
  }

  private _toggleWeekday(day: string, current: string[]): void {
    const next = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    if (!next.length) {
      this._toast("At least one weekday must stay selected. Use Enabled to turn the alarm off.");
      return;
    }
    const partial = { weekdays: WEEKDAYS.filter((d) => next.includes(d)) };
    if (this._advanced()) this._stage(partial);
    else void this._set(partial);
  }

  // ---------------------------------------------------------------- render

  protected render() {
    const stateObj = this._entity();
    if (!stateObj) {
      return html`
        <ha-card>
          <div class="error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            Entity ${this._config?.entity || "(not set)"} not found
          </div>
        </ha-card>
      `;
    }

    const live = stateObj.attributes;
    const a = { ...live, ...this._settingsDraft };
    const advanced = this._advanced();
    const mode = a.wake_mode ?? "both";
    const lights = mode !== "music";
    const music = mode !== "lights";
    const dayTimes: Record<string, string> = a.day_times ?? {};
    const st = stateObj.state;
    const active = st === "rising" || st === "ringing";
    const snoozed = st === "snoozed";
    const canStop = Boolean(a.can_stop) || active || snoozed;
    const canSnooze = Boolean(a.can_snooze) || active || snoozed;

    const enabled = Boolean(a.enabled);
    const requireHome = Boolean(a.require_home);
    const skipNext = Boolean(a.skip_next);
    const timeOfDay = this._normalizeTime(a.time_of_day);
    const weekdays: string[] = Array.isArray(a.weekdays) && a.weekdays.length ? a.weekdays : [...WEEKDAYS];
    const fadeMin = this._draft.fade_duration ?? Math.round(Number(a.fade_duration ?? 900) / 60);
    const musicMin =
      this._draft.fade_music_duration ??
      Math.round(Number(a.fade_music_duration ?? 300) / 60);
    const volume = this._draft.volume ?? Number(a.volume ?? 0.25);
    const playlist: string = a.playlist ?? "";
    const playlistOptions: string[] = Array.isArray(a.playlist_options)
      ? a.playlist_options
      : [];
    const nextFire: string | null = a.next_fire ?? null;
    const skippedFire: string | null = a.skipped_fire ?? null;
    const snoozeUntil: string | null = a.snooze_until ?? null;
    const runStarted: string | null = a.run_started ?? null;
    const personEntity: string | null = a.person_entity ?? null;
    const people: string[] = Array.isArray(a.person_entities) ? a.person_entities : personEntity ? [personEntity] : [];
    const anyoneHome = people.some((person) => this.hass.states[person]?.state === "home");
    const defaultSnooze = Number(a.snooze_minutes ?? 10);
    const presets = Array.from(
      new Set([...(this._config.snooze_presets ?? DEFAULT_SNOOZE_PRESETS), defaultSnooze])
    ).sort((x, y) => x - y);

    const title = this._config.name || a.friendly_name || "Wakeup alarm";
    const icon = STATE_ICONS[st] ?? "mdi:alarm";

    return html`
      <ha-card class=${classMap({ [`is-${st}`]: true })}>
        <div class="header">
          <div class="header-main">
            <div class="icon-wrap"><ha-icon icon=${icon}></ha-icon></div>
            <div class="header-text">
              <div class="title">${title}</div>
              <div class="subtitle">${this._renderSubtitle(st, nextFire, snoozeUntil, runStarted)}</div>
            </div>
          </div>
          <div class="header-actions">
            <div class="pill"><span class="dot"></span>${STATE_LABELS[st] ?? st}</div>
            <button class="icon-button" type="button" title="Configure" aria-label="Configure"
              @click=${this._openSettings}>
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
          </div>
        </div>

        ${canStop
          ? html`
              <div class="hero">
                <div class="hero-text">
                  ${snoozed
                    ? html`<span class="hero-title">Snoozed</span>
                        <span class="hero-sub">Rings again at ${this._fmtTime(snoozeUntil)}
                          <em>${this._fmtRelative(snoozeUntil)}</em></span>`
                    : st === "rising"
                      ? html`<span class="hero-title">Waking up</span>
                          <span class="hero-sub">${live.wake_mode === "lights" ? "Light" : live.wake_mode === "music" ? "Music" : "Light and music"} fading in since
                            ${this._fmtTime(runStarted)}</span>`
                      : html`<span class="hero-title">Ringing</span>
                          <span class="hero-sub">Since ${this._fmtTime(runStarted)}</span>`}
                </div>
                <button
                  class="stop"
                  type="button"
                  ?disabled=${this._busy === "stop"}
                  @click=${() => this._call("stop")}
                >
                  <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                  Stop
                </button>
                ${canSnooze
                  ? html`
                      <div class="snooze-row">
                        <span class="snooze-label">
                          <ha-icon icon="mdi:alarm-snooze"></ha-icon>Snooze
                        </span>
                        ${presets.map(
                          (m) => html`
                            <button
                              class=${classMap({ preset: true, primary: m === defaultSnooze })}
                              type="button"
                              ?disabled=${this._busy === `snooze-${m}`}
                              @click=${() =>
                                this._call("snooze", { duration_minutes: m }, `snooze-${m}`)}
                            >
                              ${m} min
                            </button>
                          `
                        )}
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}

        <div class="settings">
          <div class="toggles">
            <label class="toggle">
              <span>
                <ha-icon icon="mdi:power"></ha-icon>
                Enabled
              </span>
              <ha-switch
                .checked=${enabled}
                @change=${(e: Event) =>
                  this._set({ enabled: (e.target as HTMLInputElement).checked })}
              ></ha-switch>
            </label>
            <label class="toggle">
              <span>
                <ha-icon icon="mdi:debug-step-over"></ha-icon>
                Skip next
                ${skipNext && skippedFire
                  ? html`<small>${this._fmtDay(skippedFire)} ${this._fmtTime(skippedFire)}</small>`
                  : nothing}
              </span>
              <ha-switch
                .checked=${skipNext}
                ?disabled=${!enabled}
                @change=${(e: Event) =>
                  this._set({ skip_next: (e.target as HTMLInputElement).checked })}
              ></ha-switch>
            </label>
          </div>

        </div>
      </ha-card>

      <dialog aria-labelledby="settings-title" @click=${(e: MouseEvent) => {
        if (e.target !== e.currentTarget) return;
        const rect = (e.currentTarget as HTMLDialogElement).getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
          this._closeSettings();
        }
      }}>
        <div class="dialog-header">
          <h2 id="settings-title">${title} settings</h2>
          <button class="icon-button" type="button" title="Close settings" aria-label="Close settings"
            autofocus @click=${this._closeSettings}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        <div class="settings">
          ${advanced ? html`<div class="field device-field">
            <label class="label" for="wake-mode">Wake mode</label>
            <select id="wake-mode" aria-label="Wake mode" .value=${mode}
              @change=${(e: Event) => this._stage({ wake_mode: (e.target as HTMLSelectElement).value })}>
              <option value="lights" ?selected=${mode === "lights"}>Lights only</option>
              <option value="music" ?selected=${mode === "music"}>Music only</option>
              <option value="both" ?selected=${mode === "both"}>Lights and music</option>
            </select>
          </div>` : html`<p class="device-field">Multiple people, wake modes and daily times require Personal Wakeup integration 0.4.0.</p>`}
          <div class="field time-field">
            <span class="label"><ha-icon icon="mdi:clock-outline"></ha-icon>Alarm time</span>
            <input
              class="time-input"
              type="time"
              aria-label="Alarm time"
              .value=${timeOfDay}
              @change=${(e: Event) =>
                this._set({ time_of_day: (e.target as HTMLInputElement).value })}
            />
          </div>

          <div class="field">
            <span class="label"><ha-icon icon="mdi:calendar-week"></ha-icon>Repeat</span>
            <div class=${advanced ? "daily-times" : "weekdays"}>
              ${WEEKDAYS.map(
                (d) => html`
                  <div class="day-row">
                  <button
                    data-day=${d}
                    type="button"
                    class=${classMap({ day: true, on: weekdays.includes(d) })}
                    aria-pressed=${weekdays.includes(d)}
                    @click=${() => this._toggleWeekday(d, weekdays)}
                  >
                    ${WEEKDAY_LABELS[d]}
                  </button>
                  ${advanced ? html`<input class="time-input" type="time" data-day-time=${d}
                    aria-label=${`${d} alarm time`} .value=${dayTimes[d] ?? timeOfDay}
                    @change=${(e: Event) => {
                      const value = (e.target as HTMLInputElement).value;
                      if (value) this._stage({ day_times: { ...dayTimes, [d]: value } });
                    }} />
                    <button type="button" class="text-button" aria-label=${`Use default time for ${d}`}
                      ?disabled=${!(d in dayTimes)} @click=${() => {
                        const next = { ...dayTimes }; delete next[d]; this._stage({ day_times: next });
                      }}>${d in dayTimes ? "Reset" : "Default"}</button>` : nothing}
                  </div>
                `
              )}
            </div>
          </div>

          ${lights ? this._renderSlider("mdi:weather-sunset-up", "Light fade", "fade_duration", fadeMin, 1, 60, 1, `${fadeMin} min`, 60) : nothing}
          ${music ? html`${this._renderSlider("mdi:music-note", "Music fade", "fade_music_duration", musicMin, 1, 30, 1, `${musicMin} min`, 60)}
          ${this._renderSlider("mdi:volume-high", "Volume", "volume", volume, 0, 1, 0.05, `${Math.round(volume * 100)}%`)}

          <div class="field">
            <span class="label"><ha-icon icon="mdi:playlist-music"></ha-icon>Playlist</span>
            ${playlistOptions.length
              ? html`
                  <select
                    aria-label="Playlist"
                    .value=${playlist}
                    @change=${(e: Event) =>
                      this._set({ playlist: (e.target as HTMLSelectElement).value })}
                  >
                    ${playlistOptions.map(
                      (opt) => html`<option .value=${opt} ?selected=${opt === playlist}>${opt}</option>`
                    )}
                  </select>
                `
              : html`<span class="value muted">${playlist || "No playlist configured"}</span>`}
          </div>
          ` : nothing}
          ${lights ? this._renderEntitySelector("light_entity", "Wakeup light", "light", a.light_entity) : nothing}
          ${music ? this._renderEntitySelector("ma_player_entity", "Music player", "media_player", a.ma_player_entity ?? a.player_entity) : nothing}
          ${this._renderEntitySelector(advanced ? "person_entities" : "person_entity", advanced ? "People (anyone home)" : "Person", "person", advanced ? people : personEntity)}
          <div class="toggles">
            <label class="toggle">
              <span>
                <ha-icon icon="mdi:home-account"></ha-icon>Only when home
                ${people.length
                  ? html`<small class=${classMap({ away: !anyoneHome })}>
                      ${anyoneHome ? "Someone home" : "Nobody home"}
                    </small>`
                  : nothing}
              </span>
              <ha-switch .checked=${requireHome} ?disabled=${!people.length}
                @change=${(e: Event) => this._set({ require_home: (e.target as HTMLInputElement).checked })}
              ></ha-switch>
            </label>
          </div>
        </div>

        ${this._settingsError ? html`<p role="alert" class="error">${this._settingsError}</p>` : nothing}
        ${advanced ? html`<div class="save-row">
          <span class="value muted">Mode, targets, people and daily schedule save together.</span>
          <button class="text-button" data-discard type="button"
            ?disabled=${this._busy !== null || !Object.keys(this._settingsDraft).length}
            @click=${() => { this._settingsDraft = {}; this._savedDraft = null; this._settingsError = ""; }}>Discard changes</button>
          <button class="text-button" data-save type="button"
            ?disabled=${this._busy !== null || !Object.keys(this._settingsDraft).length}
            @click=${this._saveSettings}>Save configuration</button>
        </div>` : nothing}
        <div class="footer">
          <span class="footer-note">
            ${nextFire && !snoozed
              ? html`<ha-icon icon="mdi:alarm-check"></ha-icon>
                  Next: ${this._fmtDay(nextFire)} ${this._fmtTime(nextFire)}`
              : enabled
                ? nothing
                : html`<ha-icon icon="mdi:alarm-off"></ha-icon> Alarm is off`}
          </span>
          <button
            class="text-button"
            type="button"
            ?disabled=${this._busy === "trigger_now"}
            @click=${() => {
              this._closeSettings();
              return this._call("trigger_now");
            }}
          >
            <ha-icon icon="mdi:play-circle-outline"></ha-icon>
            Test now
          </button>
        </div>
      </dialog>
    `;
  }

  private _renderSubtitle(
    st: string,
    nextFire: string | null,
    snoozeUntil: string | null,
    runStarted: string | null
  ) {
    switch (st) {
      case "armed":
        return nextFire
          ? `${this._fmtDay(nextFire)} ${this._fmtTime(nextFire)} · ${this._fmtRelative(nextFire)}`
          : "No upcoming alarm";
      case "snoozed":
        return `Rings again at ${this._fmtTime(snoozeUntil)}`;
      case "rising":
        return `Started ${this._fmtTime(runStarted)}`;
      case "ringing":
        return `Ringing since ${this._fmtTime(runStarted)}`;
      case "disarmed":
        return "Alarm is off";
      default:
        return "";
    }
  }

  private _renderSlider(
    icon: string,
    label: string,
    key: string,
    value: number,
    min: number,
    max: number,
    step: number,
    display: string,
    scale = 1
  ) {
    return html`
      <div class="field slider-field">
        <span class="label">
          <ha-icon icon=${icon}></ha-icon>${label}
          <span class="value">${display}</span>
        </span>
        <ha-slider
          aria-label=${label}
          min=${min}
          max=${max}
          step=${step}
          .value=${value}
          @input=${(e: Event) => this._sliderInput(key, e)}
          @change=${(e: Event) => this._sliderChange(key, e, scale)}
        ></ha-slider>
      </div>
    `;
  }

  private _renderEntitySelector(key: string, label: string, domain: string, value: string | string[] | null) {
    return html`
      <div class="field device-field">
        <ha-selector
          data-key=${key}
          .hass=${this.hass}
          .selector=${{ entity: { domain, ...(key === "person_entities" ? { multiple: true } : {}) } }}
          .value=${value || undefined}
          .label=${label}
          .required=${domain !== "person"}
          .disabled=${this._busy !== null}
          @value-changed=${(ev: CustomEvent) => {
            ev.stopPropagation();
            const selected = ev.detail.value ?? (key === "person_entities" ? [] : "");
            if (this._advanced()) {
              if (key === "person_entities" && Array.isArray(selected)) this._stage({ [key]: [...new Set(selected)] });
              else if (typeof selected === "string") this._stage({ [key]: selected });
              return;
            }
            if (typeof selected === "string" && (selected || key === "person_entity")) {
              void this._set({ [key]: selected });
            }
          }}
        ></ha-selector>
      </div>
    `;
  }

  static styles = css`
    :host {
      --pw-accent: var(--primary-color, #03a9f4);
      --pw-accent-text: var(--text-primary-color, #fff);
      --pw-danger: var(--error-color, #db4437);
      --pw-warn: var(--warning-color, #ff9800);
      --pw-info: var(--info-color, #4a6cf7);
      --pw-muted: var(--secondary-text-color, #727272);
      --pw-surface: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
      --pw-radius: var(--ha-card-border-radius, 12px);
      --pw-ring-color: var(--pw-accent);
    }

    ha-card {
      padding: 16px;
      box-sizing: border-box;
      overflow: hidden;
    }
    ha-card.is-ringing { --pw-ring-color: var(--pw-danger); }
    ha-card.is-rising { --pw-ring-color: var(--pw-warn); }
    ha-card.is-snoozed { --pw-ring-color: var(--pw-info); }
    ha-card.is-disarmed { --pw-ring-color: var(--pw-muted); }

    /* ---------- header ---------- */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .header-main {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .icon-wrap {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      flex: none;
      background: color-mix(in srgb, var(--pw-ring-color) 16%, transparent);
      color: var(--pw-ring-color);
      transition: background 300ms, color 300ms;
    }
    .icon-wrap ha-icon {
      --mdc-icon-size: 24px;
    }
    .is-ringing .icon-wrap {
      animation: pw-pulse 1.4s ease-in-out infinite;
    }
    .header-text { min-width: 0; }
    .title {
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.25;
      overflow-wrap: anywhere;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .subtitle {
      font-size: 0.82rem;
      color: var(--pw-muted);
      margin-top: 2px;
    }
    .header-actions { display: flex; align-items: center; gap: 4px; flex: none; }
    .icon-button {
      display: inline-grid;
      place-items: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--pw-muted);
      cursor: pointer;
      flex: none;
    }
    .icon-button:hover { background: var(--pw-surface); }
    button:focus-visible { outline: 2px solid var(--pw-accent); outline-offset: 2px; }
    dialog {
      box-sizing: border-box;
      width: min(520px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      padding: 20px;
      border: 1px solid var(--divider-color, #ddd);
      border-radius: var(--pw-radius);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      box-shadow: 0 12px 40px #0004;
      overflow: auto;
    }
    dialog::backdrop { background: #0007; }
    .dialog-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .dialog-header h2 { margin: 0; font-size: 1.1rem; font-weight: 600; overflow-wrap: anywhere; }
    .device-field { grid-column: 1 / -1; }
    ha-selector { display: block; min-width: 0; }
    .pill {
      flex: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      padding: 4px 10px;
      border-radius: 999px;
      color: var(--pw-ring-color);
      background: color-mix(in srgb, var(--pw-ring-color) 14%, transparent);
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentColor;
    }
    .is-ringing .dot,
    .is-rising .dot {
      animation: pw-blink 1s steps(2, start) infinite;
    }

    /* ---------- hero (active alarm) ---------- */
    .hero {
      margin-top: 16px;
      padding: 16px;
      border-radius: var(--pw-radius);
      display: flex;
      flex-direction: column;
      gap: 12px;
      color: var(--pw-ring-color);
      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--pw-ring-color) 22%, transparent),
        color-mix(in srgb, var(--pw-ring-color) 6%, transparent)
      );
      border: 1px solid color-mix(in srgb, var(--pw-ring-color) 30%, transparent);
    }
    .hero-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .hero-title {
      font-size: 1.35rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .hero-sub {
      font-size: 0.85rem;
      color: var(--primary-text-color);
      opacity: 0.85;
    }
    .hero-sub em {
      font-style: normal;
      color: var(--pw-muted);
      margin-left: 6px;
    }
    .stop {
      width: 100%;
      padding: 16px;
      border: none;
      border-radius: calc(var(--pw-radius) - 2px);
      background: var(--pw-danger);
      color: #fff;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 6px 18px color-mix(in srgb, var(--pw-danger) 35%, transparent);
      transition: transform 120ms ease, filter 120ms ease;
    }
    .stop ha-icon { --mdc-icon-size: 26px; }
    .stop:hover { filter: brightness(1.05); }
    .stop:active { transform: scale(0.985); }
    .snooze-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .snooze-label {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-text-color);
      margin-right: 4px;
    }
    .snooze-label ha-icon { --mdc-icon-size: 18px; }
    .preset {
      flex: 1 1 auto;
      min-width: 64px;
      padding: 10px 12px;
      border-radius: 999px;
      border: 1px solid color-mix(in srgb, var(--pw-ring-color) 45%, transparent);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 120ms ease, background 120ms ease;
    }
    .preset.primary {
      background: var(--pw-ring-color);
      border-color: var(--pw-ring-color);
      color: var(--pw-accent-text);
    }
    .preset:hover { filter: brightness(1.05); }
    .preset:active { transform: scale(0.97); }
    button:disabled { opacity: 0.6; cursor: progress; }

    /* ---------- settings ---------- */
    .settings {
      margin-top: 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px 20px;
    }
    .toggles {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      border-radius: calc(var(--pw-radius) - 4px);
      background: var(--pw-surface);
      overflow: hidden;
    }
    .toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .toggle + .toggle {
      border-top: 1px solid color-mix(in srgb, var(--pw-muted) 18%, transparent);
    }
    .toggle > span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      white-space: nowrap;
    }
    .toggle ha-icon {
      --mdc-icon-size: 20px;
      color: var(--pw-muted);
    }
    .toggle small {
      font-size: 0.72rem;
      color: var(--pw-muted);
      padding: 1px 6px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--pw-muted) 14%, transparent);
    }
    .toggle small.away {
      color: var(--pw-warn);
      background: color-mix(in srgb, var(--pw-warn) 14%, transparent);
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--pw-muted);
    }
    .label ha-icon { --mdc-icon-size: 18px; }
    .label .value {
      margin-left: auto;
      color: var(--primary-text-color);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .value.muted { color: var(--pw-muted); font-weight: 400; }
    .time-input,
    select {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      font-size: 1rem;
      font-family: inherit;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.3));
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    .time-input {
      font-size: 1.25rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .save-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; font-size: 0.8rem; }
    .daily-times { display: grid; gap: 6px; }
    .day-row { display: flex; align-items: center; gap: 6px; min-width: 0; }
    .daily-times .day { flex: 0 0 38px; }
    .daily-times .time-input { min-width: 0; font-size: 1rem; }
    .weekdays .day-row { flex: 1; }
    .weekdays {
      display: flex;
      gap: 4px;
    }
    .day {
      flex: 1;
      padding: 7px 0;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.3));
      background: transparent;
      color: var(--pw-muted);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 120ms, color 120ms;
    }
    .day.on {
      background: var(--pw-accent);
      border-color: var(--pw-accent);
      color: var(--pw-accent-text);
    }
    .slider-field ha-slider {
      width: 100%;
      margin: 0 -4px;
    }

    /* ---------- footer ---------- */
    .footer {
      margin-top: 14px;
      padding-top: 10px;
      border-top: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: var(--pw-muted);
    }
    .footer-note {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .footer ha-icon { --mdc-icon-size: 18px; }
    .text-button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      border-radius: 999px;
      border: none;
      background: transparent;
      color: var(--pw-accent);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
    }
    .text-button:hover {
      background: color-mix(in srgb, var(--pw-accent) 10%, transparent);
    }

    .error {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--pw-danger);
    }

    @keyframes pw-pulse {
      0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--pw-ring-color) 45%, transparent); }
      50% { box-shadow: 0 0 0 10px color-mix(in srgb, var(--pw-ring-color) 0%, transparent); }
    }
    @keyframes pw-blink {
      to { opacity: 0.25; }
    }

    :host([data-appearance="bubble"]) {
      --pw-accent: var(--bubble-accent-color, var(--primary-color, #03a9f4));
      --pw-surface: var(--bubble-secondary-background-color, var(--card-background-color, #fff));
      --pw-radius: var(--bubble-border-radius, 28px);
      --mdc-theme-primary: var(--pw-accent);
      --switch-checked-color: var(--pw-accent);
    }
    :host([data-appearance="bubble"]) ha-card,
    :host([data-appearance="bubble"]) dialog {
      background: var(--bubble-main-background-color, var(--secondary-background-color, #f2f3f5));
      border: var(--bubble-border, none);
      border-radius: var(--pw-radius);
      box-shadow: var(--bubble-box-shadow, none);
    }
    :host([data-appearance="bubble"]) .header { gap: 8px; }
    :host([data-appearance="bubble"]) .title { font-size: 1rem; }
    :host([data-appearance="bubble"]) .icon-wrap {
      border-radius: var(--bubble-icon-border-radius, 50%);
      background: var(--bubble-icon-background-color, var(--pw-surface));
    }
    :host([data-appearance="bubble"]) .icon-button,
    :host([data-appearance="bubble"]) .text-button {
      border-radius: var(--bubble-sub-button-border-radius, 20px);
      background: var(--bubble-sub-button-background-color, var(--pw-surface));
    }
    :host([data-appearance="bubble"]) .icon-button:hover,
    :host([data-appearance="bubble"]) .text-button:hover { filter: brightness(0.95); }
    :host([data-appearance="bubble"]) .toggles {
      border-radius: var(--bubble-sub-button-border-radius, 20px);
    }
    :host([data-appearance="bubble"]) .toggle { padding: 12px; }
    :host([data-appearance="bubble"]) .pill { letter-spacing: 0; }
    :host([data-appearance="bubble"]) .time-input,
    :host([data-appearance="bubble"]) select {
      background: var(--pw-surface);
      border-radius: var(--bubble-sub-button-border-radius, 20px);
    }
    :host([data-appearance="bubble"]) .day,
    :host([data-appearance="bubble"]) .preset {
      border-radius: var(--bubble-sub-button-border-radius, 20px);
    }
    :host([data-appearance="bubble"]) .hero {
      border-radius: var(--bubble-sub-button-border-radius, 20px);
      background: color-mix(in srgb, var(--pw-ring-color) 12%, var(--pw-surface));
    }
    :host([data-appearance="bubble"]) .stop {
      border-radius: var(--bubble-sub-button-border-radius, 24px);
    }

    @media (max-width: 480px) {
      .settings { grid-template-columns: 1fr; }
      dialog { padding: 16px; }
      .header { gap: 6px; }
      .header-main { gap: 8px; }
      .toggle > span { white-space: normal; flex-wrap: wrap; }
    }
  `;
}

declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "lovelace-personal-wakeup-card",
  name: "Personal Wakeup Card",
  description:
    "Control a Personal Wakeup alarm: time, weekdays, fades, volume, playlist, snooze and stop.",
  preview: true
});
