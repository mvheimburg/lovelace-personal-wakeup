import { applyColorScheme } from "./color-schemes";
import type { ColorScheme } from "./color-schemes";
import { localize, language, formattingLocale, type TranslationKey } from "./localize";
import { LitElement, html, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { icon } from "./icons";
import { styles } from "./styles";
import "./lovelace-personal-wakeup-card-editor";

interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

interface HomeAssistant {
  language?: string;
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
  color_scheme?: ColorScheme;
  snooze_presets?: number[];
}

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const WEEKDAY_LABELS: Record<string, TranslationKey> = {
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

const STATE_LABELS: Record<string, TranslationKey> = {
  disarmed: "Off",
  armed: "Armed",
  rising: "Waking up",
  ringing: "Ringing",
  snoozed: "Snoozed",
  unavailable: "Unavailable",
  unknown: "Unknown"
};

const STATE_ICONS: Record<string, string> = {
  disarmed: "alarmOff",
  armed: "alarm",
  rising: "sunrise",
  ringing: "ringing",
  snoozed: "snooze"
};

/** Status tone per alarm state; unknown states read as neutral. */
const STATE_TONES: Record<string, string> = {
  armed: "ok",
  rising: "warn",
  ringing: "alarm",
  snoozed: "snoozed",
  disarmed: "off"
};

@customElement("lovelace-personal-wakeup-card")
export class PersonalWakeupCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: PersonalWakeupCardConfig;
  /** Live slider values while dragging, keyed by attribute name. */
  @state() private _draft: Record<string, number> = {};
  @state() private _busy: string | null = null;
  @state() private _settingsDraft: Record<string, any> = {};
  @state() private _settingsError: string | { key: TranslationKey } = "";
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
    const acknowledged = Object.entries(this._savedDraft).every(([key, value]) => {
      const reported = a[key === "ma_player_entity" ? "player_entity" : key];
      // HA reports cleared optional targets as null; selectors submit "".
      if ((key === "light_entity" || key === "ma_player_entity") && value === "") {
        return reported === null || reported === "";
      }
      return sameSetting(reported, value);
    });
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
      this._settingsError = { key: "Choose a target for each enabled channel." };
      return;
    }
    this._settingsError = "";
    if (await this._call("set_config", partial)) {
      this._savedDraft = partial;
      this.requestUpdate();
    }
  }

  private _t(key: TranslationKey): string { return localize(this.hass, key); }

  public setConfig(config: PersonalWakeupCardConfig): void {
    if (!config.entity) {
      throw new Error(this._t("Define an entity") + ": lovelace-personal-wakeup-card");
    }
    applyColorScheme(this, config.color_scheme, this.hass);
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

  private _dayName(day: string): string {
    return language(this.hass) === "nb" ? this._t(WEEKDAY_LABELS[day]) : day;
  }

  private _lang(): string | undefined {
    return formattingLocale(this.hass);
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
    if (dayDiff === 0) return this._t("Today");
    if (dayDiff === 1) return this._t("Tomorrow");
    return d.toLocaleDateString(this._lang(), { weekday: "short" });
  }

  private _fmtRelative(value: string | null | undefined): string {
    if (!value) return "";
    const diffMin = Math.round((new Date(value).getTime() - Date.now()) / 60_000);
    if (Number.isNaN(diffMin)) return "";
    const abs = Math.abs(diffMin);
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    const span = h ? (m ? `${h} ${this._t("h")} ${m} min` : `${h} ${this._t("h")}`) : `${m} min`;
    return diffMin >= 0 ? `${this._t("in")} ${span}` : `${span} ${this._t("ago")}`;
  }

  private _normalizeTime(value: unknown): string {
    if (!value) return "07:00";
    const s = String(value);
    return s.length >= 5 && s.indexOf(":") === 2 ? s.slice(0, 5) : "07:00";
  }

  /** Format an "HH:MM" setting as a clock time in the HA formatting locale. */
  private _fmtClock(value: string): string {
    const [h, m] = value.split(":").map(Number);
    return new Date(2000, 0, 1, h, m).toLocaleTimeString(this._lang(), {
      hour: "2-digit",
      minute: "2-digit"
    });
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
      this._toast(`${this._t("Wakeup alarm")}: ${this._t("Action failed")} (${msg})`);
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
      this._toast(this._t("At least one weekday must stay selected. Use Enabled to turn the alarm off."));
      return;
    }
    const partial = { weekdays: WEEKDAYS.filter((d) => next.includes(d)) };
    if (this._advanced()) this._stage(partial);
    else void this._set(partial);
  }

  // ---------------------------------------------------------------- render

  private _stateLabel(st: string): string {
    return STATE_LABELS[st] ? this._t(STATE_LABELS[st]) : st;
  }

  protected render() {
    const stateObj = this._entity();
    if (!stateObj) {
      return html`
        <ha-card>
          <div class="error" role="alert">
            ${icon("warning")}<span>${this._t("Entity not found")}: ${this._config?.entity || this._t("(not set)")}</span>
          </div>
        </ha-card>
      `;
    }

    const live_ = stateObj.attributes;
    const a = { ...live_, ...this._settingsDraft };
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
    // Device actions stay off while the alarm entity reports no data.
    const noData = st === "unavailable" || st === "unknown";

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

    const title = this._config.name || a.friendly_name || this._t("Wakeup alarm");
    const tone = STATE_TONES[st] ?? "off";
    const settingBusy = this._busy === "set_config";

    return html`
      <ha-card class=${classMap({ [`is-${st}`]: true, [`sev-${tone}`]: true })}>
        <div class="header">
          <div class="title">${title}</div>
          <button class="icon-button" type="button" title=${this._t("Configure")} aria-label=${this._t("Configure")}
            @click=${this._openSettings}>${icon("cog")}</button>
        </div>

        ${canStop
          ? this._renderTakeover(st, live_.wake_mode, runStarted, snoozeUntil, canSnooze, presets, defaultSnooze)
          : this._renderHero(st, tone, enabled, timeOfDay, nextFire)}

        <div class="settings rows">
          <label class=${classMap({ row: true, "sev-ok": enabled, "sev-off": !enabled })}>
            <span class="circ">${icon("power")}</span>
            <span class="row-text">
              <span class="name">${this._t("Enabled")}</span>
              <span class=${classMap({ state: true, on: enabled })}>${enabled ? this._t("On") : this._t("Off")}</span>
            </span>
            <input type="checkbox" role="switch" class="switch" data-setting="enabled"
              aria-label=${this._t("Enabled")}
              .checked=${live(enabled)}
              ?disabled=${noData || settingBusy}
              @change=${(e: Event) => this._set({ enabled: (e.target as HTMLInputElement).checked })} />
          </label>
          <label class=${classMap({ row: true, "sev-warn": skipNext, "sev-off": !skipNext })}>
            <span class="circ">${icon("skip")}</span>
            <span class="row-text">
              <span class="name">${this._t("Skip next")}</span>
              ${skipNext && skippedFire
                ? html`<span class="state on">${this._fmtDay(skippedFire)} ${this._fmtTime(skippedFire)}</span>`
                : nothing}
            </span>
            <input type="checkbox" role="switch" class="switch" data-setting="skip_next"
              aria-label=${this._t("Skip next")}
              .checked=${live(skipNext)}
              ?disabled=${!enabled || noData || settingBusy}
              @change=${(e: Event) => this._set({ skip_next: (e.target as HTMLInputElement).checked })} />
          </label>
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
          <h2 id="settings-title">${title} ${this._t("settings")}</h2>
          <button class="icon-button" type="button" title=${this._t("Close settings")} aria-label=${this._t("Close settings")}
            autofocus @click=${this._closeSettings}>${icon("close")}</button>
        </div>
        <div class="settings">
          ${advanced ? html`<div class="field device-field">
            <label class="label" for="wake-mode">${icon("sunrise", "s")}${this._t("Wake mode")}</label>
            <select id="wake-mode" aria-label=${this._t("Wake mode")} .value=${mode}
              @change=${(e: Event) => this._stage({ wake_mode: (e.target as HTMLSelectElement).value })}>
              <option value="lights" ?selected=${mode === "lights"}>${this._t("Lights only")}</option>
              <option value="music" ?selected=${mode === "music"}>${this._t("Music only")}</option>
              <option value="both" ?selected=${mode === "both"}>${this._t("Lights and music")}</option>
            </select>
          </div>` : html`<p class="device-field">${this._t("Multiple people, wake modes and daily times require Personal Wakeup integration 0.4.0.")}</p>`}
          <div class="field time-field wide">
            <span class="label">${icon("clock", "s")}${this._t("Alarm time")}</span>
            <input
              class="time-input"
              type="time"
              aria-label=${this._t("Alarm time")}
              .value=${timeOfDay}
              @change=${(e: Event) =>
                this._set({ time_of_day: (e.target as HTMLInputElement).value })}
            />
          </div>

          <div class="field wide">
            <span class="label">${icon("calendar", "s")}${this._t("Repeat")}</span>
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
                  >${this._t(WEEKDAY_LABELS[d])}</button>
                  ${advanced ? html`<input class="time-input" type="time" data-day-time=${d}
                    aria-label=${`${this._dayName(d)} ${this._t("Alarm time")}`} .value=${dayTimes[d] ?? timeOfDay}
                    @change=${(e: Event) => {
                      const value = (e.target as HTMLInputElement).value;
                      if (value) this._stage({ day_times: { ...dayTimes, [d]: value } });
                    }} />
                    <button type="button" class="text-button" aria-label=${`${this._t("Use default time for")} ${this._dayName(d)}`}
                      ?disabled=${!(d in dayTimes)} @click=${() => {
                        const next = { ...dayTimes }; delete next[d]; this._stage({ day_times: next });
                      }}>${d in dayTimes ? this._t("Reset") : this._t("Default")}</button>` : nothing}
                  </div>
                `
              )}
            </div>
          </div>

          ${lights ? this._renderSlider("sunrise", this._t("Light fade"), "fade_duration", fadeMin, 1, 60, 1, `${fadeMin} min`, 60) : nothing}
          ${music ? html`${this._renderSlider("music", this._t("Music fade"), "fade_music_duration", musicMin, 1, 30, 1, `${musicMin} min`, 60)}
          ${this._renderSlider("volume", this._t("Volume"), "volume", volume, 0, 1, 0.05, `${Math.round(volume * 100)}%`)}

          <div class="field">
            <span class="label">${icon("playlist", "s")}${this._t("Playlist")}</span>
            ${playlistOptions.length
              ? html`
                  <select
                    aria-label=${this._t("Playlist")}
                    .value=${playlist}
                    @change=${(e: Event) =>
                      this._set({ playlist: (e.target as HTMLSelectElement).value })}
                  >
                    ${playlistOptions.map(
                      (opt) => html`<option .value=${opt} ?selected=${opt === playlist}>${opt}</option>`
                    )}
                  </select>
                `
              : html`<span class="value muted">${playlist || this._t("No playlist configured")}</span>`}
          </div>
          ` : nothing}
          ${lights ? this._renderEntitySelector("light_entity", this._t("Wakeup light"), "light", a.light_entity) : nothing}
          ${music ? this._renderEntitySelector("ma_player_entity", this._t("Music player"), "media_player", a.ma_player_entity ?? a.player_entity) : nothing}
          ${this._renderEntitySelector(advanced ? "person_entities" : "person_entity", advanced ? this._t("People (anyone home)") : this._t("Person"), "person", advanced ? people : personEntity)}
          <div class="toggles">
            <label class=${classMap({ row: true, "sev-ok": requireHome, "sev-off": !requireHome })}>
              <span class="circ">${icon("home")}</span>
              <span class="row-text">
                <span class="name">${this._t("Only when home")}</span>
                ${people.length
                  ? html`<span class=${classMap({ state: true, away: !anyoneHome })}>${anyoneHome ? this._t("Someone home") : this._t("Nobody home")}</span>`
                  : nothing}
              </span>
              <input type="checkbox" role="switch" class="switch" data-setting="require_home"
                aria-label=${this._t("Only when home")}
                .checked=${live(requireHome)}
                ?disabled=${!people.length || settingBusy}
                @change=${(e: Event) => this._set({ require_home: (e.target as HTMLInputElement).checked })} />
            </label>
          </div>
        </div>

        ${this._settingsError ? html`<p role="alert" class="error">${icon("warning", "s")}<span>${typeof this._settingsError === "string" ? this._settingsError : this._t(this._settingsError.key)}</span></p>` : nothing}
        ${advanced ? html`<div class="save-row">
          <span class="value muted">${this._t("Mode, targets, people and daily schedule save together.")}</span>
          <button class="text-button" data-discard type="button"
            ?disabled=${this._busy !== null || !Object.keys(this._settingsDraft).length}
            @click=${() => { this._settingsDraft = {}; this._savedDraft = null; this._settingsError = ""; }}>${this._t("Discard changes")}</button>
          <button class="text-button strong" data-save type="button"
            ?disabled=${this._busy !== null || !Object.keys(this._settingsDraft).length}
            @click=${this._saveSettings}>${this._busy === "set_config" ? icon("spinner", "s spin") : nothing}${this._t("Save configuration")}</button>
        </div>` : nothing}
        <div class="footer">
          <span class="footer-note">
            ${nextFire && !snoozed
              ? html`${icon("alarm", "s")}<span>${this._t("Next:")} ${this._fmtDay(nextFire)} ${this._fmtTime(nextFire)}</span>`
              : enabled
                ? nothing
                : html`${icon("alarmOff", "s")}<span>${this._t("Alarm is off")}</span>`}
          </span>
          <button
            class="text-button"
            type="button"
            ?disabled=${this._busy === "trigger_now" || noData}
            @click=${() => {
              this._closeSettings();
              return this._call("trigger_now");
            }}
          >${icon("play", "s")}${this._t("Test now")}</button>
        </div>
      </dialog>
    `;
  }

  /** Calm states: the next alarm time is the headline. */
  private _renderHero(st: string, tone: string, enabled: boolean, timeOfDay: string, nextFire: string | null) {
    let headline = "—";
    let dim = false;
    let context = "";
    if (st === "armed") {
      if (nextFire) {
        headline = this._fmtTime(nextFire);
        context = `${this._fmtDay(nextFire)} · ${this._fmtRelative(nextFire)}`;
      } else {
        context = this._t("No upcoming alarm");
      }
    } else if (st === "disarmed" || !enabled) {
      headline = this._fmtClock(timeOfDay);
      dim = true;
      context = this._t("Alarm is off");
    }
    return html`
      <div class="hero sev-${tone}">
        <span class="circ big">${icon(STATE_ICONS[st] ?? "alarm")}</span>
        <div class="hero-text">
          <span class="status" data-status>${this._stateLabel(st)}</span>
          <span class=${classMap({ current: true, dim })}>${headline}</span>
          ${context ? html`<span class="context subtitle">${context}</span>` : nothing}
        </div>
      </div>
    `;
  }

  /** Rising, ringing and snoozed take over the card with Stop and snooze. */
  private _renderTakeover(
    st: string,
    wakeMode: string | undefined,
    runStarted: string | null,
    snoozeUntil: string | null,
    canSnooze: boolean,
    presets: number[],
    defaultSnooze: number
  ) {
    const kind = st === "snoozed" || st === "rising" ? st : "ringing";
    const tone = STATE_TONES[kind];
    const channel = wakeMode === "lights" ? this._t("Light") : wakeMode === "music" ? this._t("Music") : this._t("Light and music");
    const stopping = this._busy === "stop";
    return html`
      <section class="takeover is-${kind} sev-${tone}" aria-label=${this._stateLabel(kind)}>
        <div class="takeover-head">
          <span class="circ big">${icon(STATE_ICONS[kind])}</span>
          <div class="hero-text">
            <span class="hero-title" data-status>${this._stateLabel(kind)}</span>
            ${kind === "snoozed"
              ? html`<span class="hero-sub">${this._t("Rings again at")} ${this._fmtTime(snoozeUntil)}<em>${this._fmtRelative(snoozeUntil)}</em></span>`
              : kind === "rising"
                ? html`<span class="hero-sub">${channel} ${this._t("fading in since")} ${this._fmtTime(runStarted)}</span>`
                : html`<span class="hero-sub">${this._t("Since")} ${this._fmtTime(runStarted)}</span>`}
          </div>
        </div>
        <button class="stop" type="button" ?disabled=${stopping} aria-busy=${stopping ? "true" : "false"}
          @click=${() => this._call("stop")}>${stopping ? icon("spinner", "spin") : icon("stop")}<span>${this._t("Stop")}</span></button>
        ${canSnooze
          ? html`
              <div class="snooze-row" role="group" aria-label=${this._t("Snooze")}>
                <span class="snooze-label">${icon("snooze", "s")}${this._t("Snooze")}</span>
                <div class="presets">
                ${presets.map(
                  (m) => html`
                    <button
                      class=${classMap({ preset: true, primary: m === defaultSnooze })}
                      type="button"
                      ?disabled=${this._busy === `snooze-${m}`}
                      @click=${() => this._call("snooze", { duration_minutes: m }, `snooze-${m}`)}
                    >${m} min</button>
                  `
                )}
                </div>
              </div>
            `
          : nothing}
      </section>
    `;
  }

  private _renderSlider(
    iconName: string,
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
          ${icon(iconName, "s")}${label}
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
      <div class="field device-field selector-field">
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

  static styles = styles;
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
