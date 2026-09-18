import { localize, type TranslationKey } from "./localize";
import { LitElement, html, css } from "lit";
import { property, state, customElement } from "lit/decorators.js";

interface HomeAssistant {
  language?: string;
  locale?: { language?: string };
  states: Record<string, any>;
}

interface PersonalWakeupCardConfig {
  type: string;
  entity: string;
  name?: string;
  appearance?: "default" | "bubble";
  snooze_presets?: number[];
}

@customElement("lovelace-personal-wakeup-card-editor")
export class PersonalWakeupCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: PersonalWakeupCardConfig;

  private _t(key: TranslationKey): string { return localize(this.hass, key); }

  public setConfig(config: PersonalWakeupCardConfig): void {
    this._config = { appearance: "default", ...config };
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const value = { ...(ev.detail.value as Record<string, unknown>) };

    // The form edits presets as text; store them as a clean number list.
    const rawPresets = value.snooze_presets;
    if (typeof rawPresets === "string") {
      const nums = rawPresets
        .split(/[\s,]+/)
        .map((s) => Number(s))
        .filter((n) => Number.isFinite(n) && n > 0);
      if (nums.length) value.snooze_presets = nums;
      else delete value.snooze_presets;
    }
    if (value.name === "") delete value.name;

    const newConfig = { ...this._config, ...value } as PersonalWakeupCardConfig;
    for (const key of ["name", "snooze_presets"] as const) {
      if (!(key in value)) delete newConfig[key];
    }

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true
      })
    );
  }

  protected render() {
    if (!this.hass || !this._config) return html``;

    const data = {
      ...this._config,
      snooze_presets: Array.isArray(this._config.snooze_presets)
        ? this._config.snooze_presets.join(", ")
        : this._config.snooze_presets ?? ""
    };


    const SCHEMA = [
      {
        name: "appearance",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "default", label: this._t("Default") },
              { value: "bubble", label: this._t("Bubble") }
            ]
          }
        }
      },
      {
        name: "entity",
        required: true,
        selector: { entity: { integration: "personal_wakeup", domain: "sensor" } }
      },
      { name: "name", selector: { text: {} } },
      {
        name: "snooze_presets",
        selector: { text: {} }
      }
    ];

    const LABELS: Record<string, string> = {
      appearance: this._t("Appearance"),
      entity: this._t("Wakeup alarm entity"),
      name: this._t("Name (optional)"),
      snooze_presets: this._t("Snooze presets in minutes (optional, e.g. 5, 10, 15)")
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${SCHEMA}
        .computeLabel=${(s: { name: string }) => LABELS[s.name] ?? s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  static styles = css`
    ha-form {
      display: block;
      padding: 8px 0;
    }
  `;
}
