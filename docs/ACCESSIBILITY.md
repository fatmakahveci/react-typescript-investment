# Accessibility verification

CI checks the empty calculator and calculated results with axe-core against
WCAG 2 A/AA, 2.1 AA and 2.2 AA rules. JSON reports, including checks needing
manual review, are attached to the Playwright report. Automated checks do not
constitute a complete accessibility audit.

Keyboard tests cover the skip link, completing the form, focus after calculation
and reset, opening an example, and horizontally scrolling the results table at
320 CSS pixels. Tests run on Chromium, Firefox and WebKit; WebKit coverage is
not a test of the installed Safari application or VoiceOver.

## Manual VoiceOver check (not yet performed)

On macOS, open the calculator in Safari and enable VoiceOver with Command-F5.
Use Control-Option-Right Arrow to navigate and Control-Option-Space to activate.

1. Activate “Skip to calculator” and confirm navigation reaches the main content.
2. Navigate through inputs; verify each label, required state and inflation help.
3. Submit an empty form and confirm the invalid field and validation feedback.
4. Enter a projection and calculate. Confirm the result heading receives focus.
5. Navigate the summary, chart description and the table's row/column headers.
6. Activate Reset; confirm focus returns to Currency and results disappear.
7. Activate Try an example; confirm the result heading is announced.
8. Test at 200% browser zoom and with increased text size, ensuring controls
   remain usable and the table scrolls independently.

Record OS, Safari and VoiceOver versions and any issues before marking this
manual check complete. This environment did not expose VoiceOver controls.

## Refreshing the README demo

Build the app, copy `.next/static` to `.next/standalone/.next/static`, and run
`PORT=3100 HOSTNAME=127.0.0.1 node .next/standalone/server.js`. In another terminal,
run `node scripts/record-demo.mjs`. This records synthetic sample inputs and
replaces the root `demo.gif`; review the animation before committing it.
