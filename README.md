# Lovelace Personal Wakeup Card

A dashboard card for the
[Personal Wakeup](https://github.com/mvheimburg/personal-wakeup)
integration.

![The card armed and ringing](images/screenshot.png)

- Big **Stop** button and one-tap **Snooze** presets while the alarm is
  rising, ringing or snoozed.
- Compact main card with status, next alarm countdown, Enabled and Skip next.
- Gear button opens settings for alarm time, weekdays, fades, volume, playlist,
  presence checking, and **Test now**. Changes apply immediately.
- Select the wakeup light, music player, and optional person in the modal.
  These selections persist in the integration options. Changing a selection
  stops an active alarm or snooze before applying it.
- Close settings with the close button, Escape, or a click outside the modal.
- Failed service calls show a Home Assistant toast instead of failing silently.

On a phone the card stacks into a single column, with the Stop button and the
snooze presets sized for a half-asleep thumb:

<img src="images/ringing-phone.png" alt="The card ringing at phone width" width="320">

## Install

### HACS
Add this repository as a custom repository (category *Dashboard*) and install
**Personal Wakeup Card**. HACS registers the resource for you.

### Manual
1. Copy `dist/lovelace-personal-wakeup-card.js` to `config/www/`.
2. Add `/local/lovelace-personal-wakeup-card.js` as a *JavaScript module*
   resource under **Settings → Dashboards → Resources**.

## Card config

```yaml
type: custom:lovelace-personal-wakeup-card
entity: sensor.matilde_wakeup
name: Matilde           # optional, defaults to the entity's friendly name
snooze_presets: [5, 10, 15]   # optional, minutes; the entity's default snooze is always included
```

The visual editor offers the same options.

## Appearance

Choose **Default** or **Bubble** in the dashboard card editor, or add
`appearance: bubble` to the card YAML. Omitting it keeps the default appearance.
The Bubble preset styles both the compact card and its settings modal; it does
not require Bubble Card to be installed.

The preset inherits these shared CSS variables from your Home Assistant theme:
`--bubble-main-background-color`, `--bubble-secondary-background-color`,
`--bubble-accent-color`, `--bubble-border-radius`, `--bubble-icon-border-radius`,
`--bubble-icon-background-color`, `--bubble-sub-button-border-radius`,
`--bubble-sub-button-background-color`, `--bubble-border`, and
`--bubble-box-shadow`. Without overrides it uses the current HA theme colors
and rounded Bubble-style defaults. Alarm warning and stop colors stay distinct.

For example, in an HA theme (theme keys omit the leading `--`):

```yaml
bubble-border-radius: 28px
bubble-accent-color: "#009688"
```

CSS applied locally inside another Bubble Card does not carry over. This is
a visual preset, not support for Bubble Card modules or its pop-up engine.

## Build

```bash
npm ci
npm run lint
npm run typecheck
npm run build      # writes dist/lovelace-personal-wakeup-card.js
```

CI checks that `dist/` is committed up to date. Releases are automatic: bump
`version` in `package.json`, merge to `main`, and the release workflow tags
`v<version>` and attaches the built card to a GitHub release.
