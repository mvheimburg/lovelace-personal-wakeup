export interface LanguageSource {
  language?: string;
  locale?: { language?: string };
}
export function language(hass?: LanguageSource): "en" | "nb" {
  const code = (hass?.language || hass?.locale?.language || "en")
    .toLowerCase()
    .replace(/_/g, "-")
    .split("-")[0];
  return ["nb", "no", "nn"].includes(code) ? "nb" : "en";
}
/** Preserve regional formatting independently of the translated dictionary. */
export function formattingLocale(hass?: LanguageSource): string {
  const code = (hass?.language || hass?.locale?.language || "en")
    .toLowerCase().replace(/_/g, "-").replace(/^(no|nn)(?=-|$)/, "nb");
  try {
    return Intl.getCanonicalLocales(code)[0] || "en";
  } catch {
    return "en";
  }
}
const en = {
  "Snooze presets in minutes (optional, e.g. 5, 10, 15)":
    "Snooze presets in minutes (optional, e.g. 5, 10, 15)",
  "Wakeup alarm entity": "Wakeup alarm entity",
  "Name (optional)": "Name (optional)",
  Appearance: "Appearance",
  Default: "Default",
  Bubble: "Bubble",
  "Multiple people, wake modes and daily times require Personal Wakeup integration 0.4.0.":
    "Multiple people, wake modes and daily times require Personal Wakeup integration 0.4.0.",
  "At least one weekday must stay selected. Use Enabled to turn the alarm off.":
    "At least one weekday must stay selected. Use Enabled to turn the alarm off.",
  "Mode, targets, people and daily schedule save together.":
    "Mode, targets, people and daily schedule save together.",
  "Choose a target for each enabled channel.":
    "Choose a target for each enabled channel.",
  "No playlist configured": "No playlist configured",
  "People (anyone home)": "People (anyone home)",
  "Save configuration": "Save configuration",
  "No upcoming alarm": "No upcoming alarm",
  "Lights and music": "Lights and music",
  "Discard changes": "Discard changes",
  "Light and music": "Light and music",
  "Close settings": "Close settings",
  "Only when home": "Only when home",
  "Rings again at": "Rings again at",
  "Wakeup alarm": "Wakeup alarm",
  "Wakeup light": "Wakeup light",
  "Music player": "Music player",
  "Someone home": "Someone home",
  "Alarm is off": "Alarm is off",
  "Lights only": "Lights only",
  "Nobody home": "Nobody home",
  "Music only": "Music only",
  "Alarm time": "Alarm time",
  "Light fade": "Light fade",
  "Music fade": "Music fade",
  Configure: "Configure",
  "Skip next": "Skip next",
  "(not set)": "(not set)",
  "Waking up": "Waking up",
  "Wake mode": "Wake mode",
  "Test now": "Test now",
  Tomorrow: "Tomorrow",
  settings: "settings",
  Playlist: "Playlist",
  Enabled: "Enabled",
  Ringing: "Ringing",
  Snoozed: "Snoozed",
  Snooze: "Snooze",
  Repeat: "Repeat",
  Volume: "Volume",
  Person: "Person",
  Today: "Today",
  "Next:": "Next:",
  Reset: "Reset",
  Since: "Since",
  Light: "Light",
  Music: "Music",
  Stop: "Stop",
  Started: "Started",
  "Ringing since": "Ringing since",
  h: "h",
  in: "in",
  ago: "ago",
  "Entity not found": "Entity not found",
  "Define an entity": "Define an entity",
  Time: "Time",
  "Use default time for": "Use default time for",
  "Action failed": "Action failed",
  "fading in since": "fading in since",
  Mo: "Mo",
  Tu: "Tu",
  We: "We",
  Th: "Th",
  Fr: "Fr",
  Sa: "Sa",
  Su: "Su",
  On: "On",
  Off: "Off",
  Armed: "Armed",
  Unavailable: "Unavailable",
  Unknown: "Unknown",
} as const;
export type TranslationKey = keyof typeof en;
const nb: Record<TranslationKey, string> = {
  "Snooze presets in minutes (optional, e.g. 5, 10, 15)":
    "Slumrevalg i minutter (valgfritt, f.eks. 5, 10, 15)",
  "Wakeup alarm entity": "Vekkerklokkeenhet",
  "Name (optional)": "Navn (valgfritt)",
  Appearance: "Utseende",
  Default: "Standard",
  Bubble: "Boble",
  "Multiple people, wake modes and daily times require Personal Wakeup integration 0.4.0.":
    "Flere personer, vekkemoduser og daglige tider krever Personal Wakeup-integrasjonen 0.4.0.",
  "At least one weekday must stay selected. Use Enabled to turn the alarm off.":
    "Minst én ukedag må være valgt. Bruk Aktivert for å slå av vekking.",
  "Mode, targets, people and daily schedule save together.":
    "Modus, enheter, personer og ukeplan lagres samlet.",
  "Choose a target for each enabled channel.":
    "Velg en enhet for hver aktivert kanal.",
  "No playlist configured": "Ingen spilleliste konfigurert",
  "People (anyone home)": "Personer (minst én hjemme)",
  "Save configuration": "Lagre innstillinger",
  "No upcoming alarm": "Ingen kommende vekking",
  "Lights and music": "Lys og musikk",
  "Discard changes": "Forkast endringer",
  "Light and music": "Lys og musikk",
  "Close settings": "Lukk innstillinger",
  "Only when home": "Bare når noen er hjemme",
  "Rings again at": "Ringer igjen kl.",
  "Wakeup alarm": "Vekkerklokke",
  "Wakeup light": "Vekkelys",
  "Music player": "Musikkspiller",
  "Someone home": "Noen er hjemme",
  "Alarm is off": "Vekking er slått av",
  "Lights only": "Bare lys",
  "Nobody home": "Ingen hjemme",
  "Music only": "Bare musikk",
  "Alarm time": "Vekketid",
  "Light fade": "Opptrapping av lys",
  "Music fade": "Opptrapping av musikk",
  Configure: "Konfigurer",
  "Skip next": "Hopp over neste",
  "(not set)": "(ikke angitt)",
  "Waking up": "Vekking pågår",
  "Wake mode": "Vekkemodus",
  "Test now": "Test nå",
  Tomorrow: "I morgen",
  settings: "innstillinger",
  Playlist: "Spilleliste",
  Enabled: "Aktivert",
  Ringing: "Ringer",
  Snoozed: "Slumrer",
  Snooze: "Slumre",
  Repeat: "Gjenta",
  Volume: "Volum",
  Person: "Person",
  Today: "I dag",
  "Next:": "Neste:",
  Reset: "Tilbakestill",
  Since: "Siden",
  Light: "Lys",
  Music: "Musikk",
  Stop: "Stopp",
  Started: "Startet",
  "Ringing since": "Ringer siden",
  h: "t",
  in: "om",
  ago: "siden",
  "Entity not found": "Fant ikke enheten",
  "Define an entity": "Du må angi en enhet",
  Time: "Tid",
  "Use default time for": "Bruk standardtid for",
  "Action failed": "Handlingen mislyktes",
  "fading in since": "trappes opp siden",
  Mo: "Ma",
  Tu: "Ti",
  We: "On",
  Th: "To",
  Fr: "Fr",
  Sa: "Lø",
  Su: "Sø",
  On: "På",
  Off: "Av",
  Armed: "Klar",
  Unavailable: "Utilgjengelig",
  Unknown: "Ukjent",
};
export function localize(
  hass: LanguageSource | undefined,
  key: TranslationKey,
): string {
  return (language(hass) === "nb" ? nb : en)[key];
}
