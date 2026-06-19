# Breath

**A breathwork pacer that runs entirely in your browser. No app store, no account, no tracking.**

[Try it live](https://hoatscs-droid.github.io/breath/)

Breath is a single-file breathing companion for paced sessions. A central orb, procedural geometry, synthesized audio cues, and optional ambient sound all follow the same breath signal so the visual and audio pacing stay aligned.

## What it does

- Three practice categories: **Calm**, **Intimacy**, and **Energy**.
- Nine presets, including timed sessions and open-ended infinity mode.
- Procedural sacred-geometry visuals defaulting to **Full**, with **Minimal** and **Off** modes available.
- Synthesized ocean-wash breath cues, hold pips, and a quiet optional ambient bed.
- Haptic phase cues on browsers that support the Vibration API.
- Media Session support for compatible browser and lock-screen controls.
- Energy practices are protected by an in-app safety gate.

## Install on iPhone or Android

Breath is a Progressive Web App with a dedicated home-screen icon. To install it:

1. Open the live link in Safari on iPhone or Chrome on Android.
2. Use the browser share/menu button.
3. Choose **Add to Home Screen** or **Install app**.

It also runs directly in any modern desktop browser.

Haptics work where the browser exposes vibration controls, typically Android Chrome. iPhone Safari does not currently expose web haptics, so Breath hides that toggle on unsupported browsers.

## Privacy

Breath runs entirely on your device. There are no accounts, analytics, servers, or external network requests. Settings are stored only in your browser's local storage.

## Safety and scope

Breath is a pacing tool, not a medical device. It does not diagnose, treat, or promise health outcomes. Activating practices can cause lightheadedness, so the app keeps those behind a safety note and should only be used seated or lying down.

## Tech

A single `index.html` using plain HTML, CSS, JavaScript, Canvas, Web Audio, Media Session, a web app manifest, PNG icons, and local storage. No frameworks, no build step, no dependencies, and no external requests.

## License

[MIT](LICENSE) - free to use, modify, and build on. No warranty.

---

Made as a personal project, shared in case others find it useful. Feedback welcome via Issues.
