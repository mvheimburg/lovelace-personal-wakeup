# Lovelace Personal Wakeup Card

A dashboard card for the
[Personal Wakeup](https://github.com/mvheimburg/personal-wakeup)
integration.

![The card armed and ringing](images/screenshot.png)

- Big **Stop** button and one-tap **Snooze** presets while the alarm is
  rising, ringing or snoozed.
- Alarm time, weekday repeat, skip-next, light fade, music fade, volume and
  playlist, all editable in place.
- Enabled / only-when-home switches, next alarm countdown, a "Test now" button.
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
