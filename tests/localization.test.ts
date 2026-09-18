import { afterEach, expect, it } from "vitest";
import { PersonalWakeupCard } from "../src/lovelace-personal-wakeup-card";
afterEach(() => document.body.replaceChildren());
it.each(["nb", "NB_no", "no", "nn-NO"])(
  "localizes rendered settings and keeps service payloads for %s",
  async (language) => {
    const calls: unknown[] = [];
    const card = new PersonalWakeupCard();
    card.setConfig({
      type: "custom:lovelace-personal-wakeup-card",
      entity: "sensor.test",
    });
    card.hass = {
      language,
      states: {
        "sensor.test": {
          entity_id: "sensor.test",
          state: "armed",
          attributes: {
            enabled: true,
            wake_mode: "both",
            person_entities: [],
            day_times: {},
            schedule: { mon: { enabled: true, time: "07:00" } },
          },
        },
      },
      callService: async (...args) => {
        calls.push(args);
      },
    };
    document.body.append(card);
    await card.updateComplete;
    const root = card.shadowRoot!;
    expect(root.textContent).toContain("Vekkemodus");
    expect(root.querySelector('[aria-label="Konfigurer"]')).not.toBeNull();
    const control = root.querySelector("ha-switch")! as HTMLElement & {
      checked: boolean;
    };
    control.checked = false;
    control.dispatchEvent(new Event("change"));
    await card.updateComplete;
    expect(calls).toEqual([
      [
        "personal_wakeup",
        "set_config",
        { entity_id: "sensor.test", enabled: false },
      ],
    ]);
    card.hass = { ...card.hass, language: "fr", locale: { language: "nb" } };
    await card.updateComplete;
    expect(root.querySelector('[aria-label="Configure"]')).not.toBeNull();
    card.hass = { ...card.hass, language: undefined };
    await card.updateComplete;
    expect(root.querySelector('[aria-label="Konfigurer"]')).not.toBeNull();
  },
);
it("localizes editor labels without changing configuration values", async () => {
  const editor = PersonalWakeupCard.getConfigElement() as any;
  editor.setConfig({
    type: "custom:lovelace-personal-wakeup-card",
    entity: "sensor.test",
    name: "My name",
  });
  editor.hass = { language: "nb", states: {} };
  document.body.append(editor);
  await editor.updateComplete;
  const form = editor.shadowRoot.querySelector("ha-form");
  expect(form.computeLabel({ name: "appearance" })).toBe("Utseende");
  expect(form.schema[0].selector.select.options[0]).toEqual({
    value: "default",
    label: "Standard",
  });
  expect(form.data.name).toBe("My name");
  editor.hass = { language: "en", states: {} };
  await editor.updateComplete;
  expect(form.computeLabel({ name: "appearance" })).toBe("Appearance");
});
it("translates active states, daily controls, relative dates and failures", async () => {
  const card = new PersonalWakeupCard();
  const calls: unknown[] = [];
  card.setConfig({
    type: "custom:lovelace-personal-wakeup-card",
    entity: "sensor.test",
    name: "My alarm",
  });
  card.hass = {
    language: "nb",
    states: {
      "sensor.test": {
        entity_id: "sensor.test",
        state: "rising",
        attributes: {
          wake_mode: "both",
          person_entities: [],
          day_times: {},
          light_entity: "light.bed",
          player_entity: "media_player.bed",
          next_fire: new Date(Date.now() + 600_000).toISOString(),
        },
      },
    },
    callService: async (...args) => {
      calls.push(args);
      throw new Error("Backend detail");
    },
  };
  document.body.append(card);
  await card.updateComplete;
  const root = card.shadowRoot!;
  expect(root.querySelectorAll(".settings")).toHaveLength(2);
  expect(root.querySelector(".hero-title")!.textContent).toBe("Vekking pågår");
  expect(root.textContent).toMatch(/I dag|I morgen/);
  expect(root.querySelector('[data-day="mon"]')!.textContent).toContain("Ma");
  expect(root.querySelector(".title")!.textContent).toBe("My alarm");
  let notification = "";
  card.addEventListener("hass-notification", (event) => {
    notification = (event as CustomEvent).detail.message;
  });
  root.querySelector<HTMLButtonElement>(".stop")!.click();
  await card.updateComplete;
  await card.updateComplete;
  expect(calls).toEqual([
    ["personal_wakeup", "stop", { entity_id: "sensor.test" }],
  ]);
  expect(notification).toBe(
    "Vekkerklokke: Handlingen mislyktes (Backend detail)",
  );
  card.hass = {
    ...card.hass,
    states: {
      "sensor.test": { ...card.hass.states["sensor.test"], state: "armed" },
    },
  };
  await card.updateComplete;
  expect(root.querySelector(".subtitle")!.textContent).toContain("om 10 min");
});
it("updates an existing validation error when the language changes", async () => {
  const card = new PersonalWakeupCard();
  card.setConfig({
    type: "custom:lovelace-personal-wakeup-card",
    entity: "sensor.test",
  });
  card.hass = {
    language: "en",
    states: {
      "sensor.test": {
        entity_id: "sensor.test",
        state: "armed",
        attributes: {
          wake_mode: "lights",
          light_entity: "light.test",
          person_entities: [],
          day_times: {},
        },
      },
    },
    callService: async () => {},
  };
  document.body.append(card);
  await card.updateComplete;
  const root = card.shadowRoot!;
  const select = root.querySelector<HTMLSelectElement>("#wake-mode")!;
  select.value = "music";
  select.dispatchEvent(new Event("change"));
  await card.updateComplete;
  root.querySelector<HTMLButtonElement>("[data-save]")!.click();
  await card.updateComplete;
  expect(root.querySelector('[role="alert"]')!.textContent).toContain(
    "Choose a target",
  );
  card.hass = { ...card.hass, language: "nb" };
  await card.updateComplete;
  expect(root.querySelector('[role="alert"]')!.textContent).toContain(
    "Velg en enhet",
  );
});

it.each([
  ["disarmed", "Av"],
  ["armed", "Aktivert"],
  ["rising", "Vekking pågår"],
  ["ringing", "Ringer"],
  ["snoozed", "Slumrer"],
  ["unavailable", "Utilgjengelig"],
  ["unknown", "Ukjent"],
])("localizes the %s status", async (state, label) => {
  const card = new PersonalWakeupCard();
  card.setConfig({
    type: "custom:lovelace-personal-wakeup-card",
    entity: "sensor.test",
  });
  card.hass = {
    language: "nb-NO",
    states: {
      "sensor.test": { entity_id: "sensor.test", state, attributes: {} },
    },
    callService: async () => {},
  };
  document.body.append(card);
  await card.updateComplete;
  expect(card.shadowRoot!.querySelector(".pill")!.textContent).toBe(label);
});
it("localizes missing entities while preserving their IDs", async () => {
  const card = new PersonalWakeupCard();
  card.setConfig({
    type: "custom:lovelace-personal-wakeup-card",
    entity: "sensor.missing",
  });
  card.hass = { language: "nb", states: {}, callService: async () => {} };
  document.body.append(card);
  await card.updateComplete;
  expect(card.shadowRoot!.textContent).toContain(
    "Fant ikke enheten: sensor.missing",
  );
});
