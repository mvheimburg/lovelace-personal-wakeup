import { afterEach, expect, it } from "vitest";
import { PersonalWakeupCard } from "../src/lovelace-personal-wakeup-card";
afterEach(() => document.body.replaceChildren());
const base = {
  friendly_name: "Bedroom",
  enabled: true,
  time_of_day: "07:00",
  weekdays: ["mon"],
  light_entity: "light.bed",
  player_entity: "",
  person_entities: ["person.a"],
  wake_mode: "lights",
  day_times: {},
  volume: 0,
};
async function mount(attrs: Record<string, unknown> = base, fail = false) {
  const calls: unknown[] = [];
  const card = new PersonalWakeupCard();
  card.setConfig({
    type: "custom:lovelace-personal-wakeup-card",
    entity: "sensor.alarm",
  });
  card.hass = {
    states: {
      "sensor.alarm": {
        entity_id: "sensor.alarm",
        state: "rising",
        attributes: attrs,
      },
      "person.a": { entity_id: "person.a", state: "away", attributes: {} },
      "person.b": { entity_id: "person.b", state: "home", attributes: {} },
    },
    callService: async (...args) => {
      calls.push(args);
      if (fail) throw new Error("Invalid target");
    },
  };
  document.body.append(card);
  await card.updateComplete;
  const root = card.shadowRoot!;
  root.querySelector<HTMLButtonElement>('[aria-label="Configure"]')!.click();
  return { card, root, calls };
}
async function change(
  card: PersonalWakeupCard,
  element: Element | null,
  value: unknown,
  custom = false,
) {
  expect(element).not.toBeNull();
  if (custom)
    element!.dispatchEvent(
      new CustomEvent("value-changed", { detail: { value } }),
    );
  else {
    (element as HTMLInputElement).value = value as string;
    element!.dispatchEvent(new Event("change"));
  }
  await card.updateComplete;
}
it("stages mode and missing player atomically, retaining the choice across stale state updates", async () => {
  const { card, root, calls } = await mount();
  await change(card, root.querySelector('[aria-label="Wake mode"]'), "music");
  expect(calls).toEqual([]);
  await change(
    card,
    root.querySelector('ha-selector[data-key="ma_player_entity"]'),
    "media_player.bed",
    true,
  );
  card.hass = { ...card.hass };
  await card.updateComplete;
  expect(
    (root.querySelector('[aria-label="Wake mode"]') as HTMLSelectElement).value,
  ).toBe("music");
  root.querySelector<HTMLButtonElement>("[data-save]")!.click();
  await card.updateComplete;
  expect(calls).toEqual([
    [
      "personal_wakeup",
      "set_config",
      {
        entity_id: "sensor.alarm",
        wake_mode: "music",
        ma_player_entity: "media_player.bed",
      },
    ],
  ]);
  expect(root.querySelector('[aria-label="Light fade"]')).toBeNull();
  expect(
    (root.querySelector('[aria-label="Volume"]') as HTMLInputElement).value,
  ).toBe(0);
});
it("sends a person array including an explicit clear and shows any-home state", async () => {
  const { card, root, calls } = await mount({
    ...base,
    person_entities: ["person.a", "person.b"],
  });
  expect(root.textContent).toContain("Someone home");
  const people = root.querySelector('ha-selector[data-key="person_entities"]');
  expect((people as any).selector).toEqual({
    entity: { domain: "person", multiple: true },
  });
  await change(card, people, [], true);
  root.querySelector<HTMLButtonElement>("[data-save]")!.click();
  await card.updateComplete;
  expect(calls).toEqual([
    [
      "personal_wakeup",
      "set_config",
      { entity_id: "sensor.alarm", person_entities: [] },
    ],
  ]);
});
it("renders seven times with inheritance, saves overrides and guards the last enabled day", async () => {
  const { card, root, calls } = await mount({
    ...base,
    day_times: { tue: "09:00" },
  });
  expect(root.querySelectorAll("[data-day-time]")).toHaveLength(7);
  expect(
    (root.querySelector('[data-day-time="mon"]') as HTMLInputElement).value,
  ).toBe("07:00");
  root.querySelector<HTMLButtonElement>('[data-day="mon"]')!.click();
  await card.updateComplete;
  expect(
    root.querySelector('[data-day="mon"]')!.getAttribute("aria-pressed"),
  ).toBe("true");
  await change(card, root.querySelector('[data-day-time="mon"]'), "06:30");
  root.querySelector<HTMLButtonElement>("[data-save]")!.click();
  await card.updateComplete;
  expect(calls).toEqual([
    [
      "personal_wakeup",
      "set_config",
      { entity_id: "sensor.alarm", day_times: { tue: "09:00", mon: "06:30" } },
    ],
  ]);
});
it("keeps failed drafts visible and reports backend errors", async () => {
  const { card, root } = await mount(base, true);
  await change(card, root.querySelector('[aria-label="Wake mode"]'), "both");
  await change(
    card,
    root.querySelector('ha-selector[data-key="ma_player_entity"]'),
    "media_player.bed",
    true,
  );
  root.querySelector<HTMLButtonElement>("[data-save]")!.click();
  await card.updateComplete;
  await card.updateComplete;
  expect(root.textContent).toContain("Invalid target");
  card.hass = { ...card.hass };
  await card.updateComplete;
  expect(
    (root.querySelector('[aria-label="Wake mode"]') as HTMLSelectElement).value,
  ).toBe("both");
});
it("keeps legacy controls and title with an upgrade notice", async () => {
  const { card, root } = await mount({
    friendly_name: "Legacy bedroom",
    person_entity: "person.a",
    time_of_day: "08:00",
    weekdays: [],
  });
  expect(root.textContent).toContain("integration 0.4.0");
  expect(root.querySelector('[aria-label="Wake mode"]')).toBeNull();
  expect(root.querySelectorAll(".day.on")).toHaveLength(7);
  card.setConfig({
    type: "custom:lovelace-personal-wakeup-card",
    entity: "sensor.alarm",
    name: "My title",
    appearance: "bubble",
  });
  await card.updateComplete;
  expect(root.querySelector(".title")!.textContent).toBe("My title");
});
it("clears all daily overrides and accepts backend acknowledgement without hiding later updates", async () => {
  const { card, root, calls } = await mount({
    ...base,
    day_times: { mon: "06:00" },
  });
  root
    .querySelector<HTMLButtonElement>(
      '[aria-label="Use default time for mon"]',
    )!
    .click();
  await card.updateComplete;
  root.querySelector<HTMLButtonElement>("[data-save]")!.click();
  await card.updateComplete;
  await card.updateComplete;
  expect(calls).toEqual([
    [
      "personal_wakeup",
      "set_config",
      { entity_id: "sensor.alarm", day_times: {} },
    ],
  ]);
  card.hass = {
    ...card.hass,
    states: {
      ...card.hass.states,
      "sensor.alarm": {
        ...card.hass.states["sensor.alarm"],
        attributes: { ...base, day_times: {} },
      },
    },
  };
  await card.updateComplete;
  card.hass = {
    ...card.hass,
    states: {
      ...card.hass.states,
      "sensor.alarm": {
        ...card.hass.states["sensor.alarm"],
        attributes: { ...base, day_times: { mon: "09:30" } },
      },
    },
  };
  await card.updateComplete;
  expect(
    (root.querySelector('[data-day-time="mon"]') as HTMLInputElement).value,
  ).toBe("09:30");
});
it("accepts HA selector clear events and never leaks drafts into another alarm", async () => {
  const { card, root, calls } = await mount();
  await change(
    card,
    root.querySelector('ha-selector[data-key="person_entities"]'),
    undefined,
    true,
  );
  root.querySelector<HTMLButtonElement>("[data-save]")!.click();
  await card.updateComplete;
  expect(calls).toEqual([
    [
      "personal_wakeup",
      "set_config",
      { entity_id: "sensor.alarm", person_entities: [] },
    ],
  ]);
  await change(card, root.querySelector('[aria-label="Wake mode"]'), "music");
  card.hass = {
    ...card.hass,
    states: {
      ...card.hass.states,
      "sensor.other": {
        entity_id: "sensor.other",
        state: "armed",
        attributes: base,
      },
    },
  };
  card.setConfig({
    type: "custom:lovelace-personal-wakeup-card",
    entity: "sensor.other",
  });
  await card.updateComplete;
  expect(
    (root.querySelector('[aria-label="Wake mode"]') as HTMLSelectElement).value,
  ).toBe("lights");
});
it("selects multiple people in order and refuses a missing required target without a service call", async () => {
  const { card, root, calls } = await mount();
  await change(
    card,
    root.querySelector('ha-selector[data-key="person_entities"]'),
    ["person.a", "person.b", "person.a"],
    true,
  );
  await change(card, root.querySelector('[aria-label="Wake mode"]'), "music");
  root.querySelector<HTMLButtonElement>("[data-save]")!.click();
  await card.updateComplete;
  expect(calls).toEqual([]);
  expect(root.querySelector('[role="alert"]')!.textContent).toContain("target");
  await change(
    card,
    root.querySelector('ha-selector[data-key="ma_player_entity"]'),
    "media_player.bed",
    true,
  );
  root.querySelector<HTMLButtonElement>("[data-save]")!.click();
  await card.updateComplete;
  expect(calls).toEqual([
    [
      "personal_wakeup",
      "set_config",
      {
        entity_id: "sensor.alarm",
        person_entities: ["person.a", "person.b"],
        wake_mode: "music",
        ma_player_entity: "media_player.bed",
      },
    ],
  ]);
});
it.each(["lights", "music", "both"])(
  "shows only active channel controls and accurate hero for %s",
  async (mode) => {
    const { root } = await mount({ ...base, wake_mode: mode });
    expect(Boolean(root.querySelector('[aria-label="Light fade"]'))).toBe(
      mode !== "music",
    );
    expect(Boolean(root.querySelector('[aria-label="Music fade"]'))).toBe(
      mode !== "lights",
    );
    expect(Boolean(root.querySelector('[aria-label="Volume"]'))).toBe(
      mode !== "lights",
    );
    expect(root.querySelector(".hero-sub")!.textContent).toContain(
      mode === "lights"
        ? "Light fading"
        : mode === "music"
          ? "Music fading"
          : "Light and music fading",
    );
  },
);
it("preserves a failed zero slider value across state updates", async () => {
  const { card, root, calls } = await mount(
    { ...base, wake_mode: "both", volume: 0.5 },
    true,
  );
  const slider = root.querySelector('[aria-label="Volume"]')!;
  (slider as any).value = 0;
  slider.dispatchEvent(new Event("input"));
  slider.dispatchEvent(new Event("change"));
  await card.updateComplete;
  await card.updateComplete;
  card.hass = { ...card.hass };
  await card.updateComplete;
  expect((slider as any).value).toBe(0);
  expect(calls).toEqual([
    ["personal_wakeup", "set_config", { entity_id: "sensor.alarm", volume: 0 }],
  ]);
});
it("discards unsaved choices without calling services", async () => {
  const { card, root, calls } = await mount();
  await change(card, root.querySelector('[aria-label="Wake mode"]'), "music");
  root.querySelector<HTMLButtonElement>("[data-discard]")!.click();
  await card.updateComplete;
  expect(
    (root.querySelector('[aria-label="Wake mode"]') as HTMLSelectElement).value,
  ).toBe("lights");
  expect(calls).toEqual([]);
});
it("acknowledges day mappings regardless of backend key order", async () => {
  const { card, root } = await mount({ ...base, day_times: { tue: "08:00" } });
  await change(card, root.querySelector('[data-day-time="mon"]'), "06:00");
  root.querySelector<HTMLButtonElement>("[data-save]")!.click();
  await card.updateComplete;
  await card.updateComplete;
  card.hass = {
    ...card.hass,
    states: {
      ...card.hass.states,
      "sensor.alarm": {
        ...card.hass.states["sensor.alarm"],
        attributes: { ...base, day_times: { mon: "06:00", tue: "08:00" } },
      },
    },
  };
  await card.updateComplete;
  card.hass = {
    ...card.hass,
    states: {
      ...card.hass.states,
      "sensor.alarm": {
        ...card.hass.states["sensor.alarm"],
        attributes: { ...base, day_times: { mon: "10:00", tue: "08:00" } },
      },
    },
  };
  await card.updateComplete;
  expect(
    (root.querySelector('[data-day-time="mon"]') as HTMLInputElement).value,
  ).toBe("10:00");
});
