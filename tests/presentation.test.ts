import { afterEach, expect, it } from "vitest";
import { PersonalWakeupCard } from "../src/lovelace-personal-wakeup-card";
afterEach(() => document.body.replaceChildren());

async function mount(
  state: string,
  attributes: Record<string, unknown>,
  language = "en",
  fail = false,
) {
  const calls: unknown[] = [];
  const card = new PersonalWakeupCard();
  card.setConfig({
    type: "custom:lovelace-personal-wakeup-card",
    entity: "sensor.alarm",
  });
  card.hass = {
    language,
    states: {
      "sensor.alarm": { entity_id: "sensor.alarm", state, attributes },
    },
    callService: async (...args) => {
      calls.push(args);
      if (fail) throw new Error("Rejected");
    },
  };
  document.body.append(card);
  await card.updateComplete;
  return { card, root: card.shadowRoot!, calls };
}

it("headlines the next alarm time with its status and countdown", async () => {
  const next = new Date(Date.now() + 90 * 60_000);
  const { root } = await mount(
    "armed",
    { enabled: true, next_fire: next.toISOString() },
    "nb",
  );
  expect(root.querySelector(".hero [data-status]")!.textContent).toBe("Klar");
  expect(root.querySelector(".hero .current")!.textContent).toBe(
    next.toLocaleTimeString("nb", { hour: "2-digit", minute: "2-digit" }),
  );
  expect(root.querySelector(".hero .context")!.textContent).toContain(
    "om 1 t 30 min",
  );
  expect(
    root.querySelector('[data-setting="enabled"]')!.closest(".row")!
      .textContent,
  ).toContain("På");
});

it("shows the configured time dimmed when the alarm is off", async () => {
  const { root } = await mount(
    "disarmed",
    { enabled: false, time_of_day: "06:45:00" },
    "en-GB",
  );
  expect(root.querySelector(".hero .current.dim")!.textContent).toBe("06:45");
  expect(root.querySelector(".hero .context")!.textContent).toBe(
    "Alarm is off",
  );
  expect(
    (root.querySelector('[data-setting="skip_next"]') as HTMLInputElement)
      .disabled,
  ).toBe(true);
});

it("restores the authoritative switch after a rejected request", async () => {
  const { card, root, calls } = await mount(
    "armed",
    { enabled: true },
    "en",
    true,
  );
  const toggle = root.querySelector<HTMLInputElement>(
    '[data-setting="enabled"]',
  )!;
  toggle.checked = false;
  toggle.dispatchEvent(new Event("change"));
  await card.updateComplete;
  await card.updateComplete;
  expect(calls).toEqual([
    [
      "personal_wakeup",
      "set_config",
      { entity_id: "sensor.alarm", enabled: false },
    ],
  ]);
  expect(toggle.checked).toBe(true);
});

it("disables alarm actions while the entity is unavailable", async () => {
  const { root } = await mount("unavailable", { enabled: true });
  expect(
    (root.querySelector('[data-setting="enabled"]') as HTMLInputElement)
      .disabled,
  ).toBe(true);
  expect(root.querySelector('[aria-label="Configure"]')).not.toBeNull();
});

it("takes over the card while ringing with Stop and the snooze presets", async () => {
  const { card, root, calls } = await mount(
    "ringing",
    { snooze_minutes: 10 },
    "nb",
  );
  const takeover = root.querySelector(".takeover.is-ringing")!;
  expect(takeover.querySelector("[data-status]")!.textContent).toBe("Ringer");
  expect(takeover.querySelector(".stop")!.textContent).toBe("Stopp");
  const presets = [...takeover.querySelectorAll<HTMLButtonElement>(".preset")];
  expect(presets.map((p) => p.textContent)).toEqual([
    "5 min",
    "10 min",
    "15 min",
  ]);
  expect(presets[1].classList.contains("primary")).toBe(true);
  presets[0].click();
  await card.updateComplete;
  expect(calls).toEqual([
    [
      "personal_wakeup",
      "snooze",
      { entity_id: "sensor.alarm", duration_minutes: 5 },
    ],
  ]);
  expect(root.querySelector(".hero")).toBeNull();
});

it("offers only Stop during a lights-only sunrise and says when the light is fully up", async () => {
  const wake = new Date(Date.now() + 10 * 60_000);
  const { card, root, calls } = await mount("rising", {
    enabled: true,
    wake_mode: "lights",
    run_started: new Date(Date.now() - 5 * 60_000).toISOString(),
    wake_at: wake.toISOString(),
    can_stop: true,
    can_snooze: false,
  });
  expect(root.querySelector(".takeover .stop")).not.toBeNull();
  expect(root.querySelector(".snooze-row")).toBeNull();
  expect(root.querySelector(".takeover .hero-sub")!.textContent).toContain(
    `Fully up at ${wake.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}`,
  );
  root.querySelector<HTMLButtonElement>(".takeover .stop")!.click();
  await card.updateComplete;
  expect(calls).toEqual([
    ["personal_wakeup", "stop", { entity_id: "sensor.alarm" }],
  ]);
});

it("shows no takeover once a lights-only alarm is up, and names the sunrise start in Bokmål", async () => {
  const next = new Date(Date.now() + 24 * 3_600_000);
  const start = new Date(next.getTime() - 15 * 60_000);
  const { root } = await mount(
    "armed",
    {
      enabled: true,
      wake_mode: "lights",
      next_fire: next.toISOString(),
      fade_start: start.toISOString(),
      can_stop: false,
      can_snooze: false,
    },
    "nb",
  );
  expect(root.querySelector(".takeover")).toBeNull();
  expect(root.querySelector(".hero .context")!.textContent).toContain(
    `Soloppgang fra ${start.toLocaleTimeString("nb", { hour: "2-digit", minute: "2-digit" })}`,
  );
});

it("keeps Stop and snooze for an integration that does not report them", async () => {
  const { root } = await mount("ringing", { enabled: true, wake_mode: "both" });
  expect(root.querySelector(".takeover .stop")).not.toBeNull();
  expect(root.querySelector(".snooze-row")).not.toBeNull();
});

it("sets the brightness at wake-up from the settings", async () => {
  const { card, root, calls } = await mount("armed", {
    enabled: true,
    wake_mode: "lights",
    wake_brightness: 100,
  });
  root.querySelector<HTMLButtonElement>('[aria-label="Configure"]')!.click();
  await card.updateComplete;
  const slider = root.querySelector(
    'ha-slider[aria-label="Brightness at wake-up"]',
  ) as HTMLInputElement;
  expect(slider).not.toBeNull();
  slider.value = "70" as never;
  slider.dispatchEvent(new Event("change"));
  await card.updateComplete;
  expect(calls).toContainEqual([
    "personal_wakeup",
    "set_config",
    { entity_id: "sensor.alarm", wake_brightness: 70 },
  ]);
});
