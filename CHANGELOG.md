# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Four accent palettes available at runtime: Electric (`wsm-electric`, the former `#7F00FF`), Amethyst (`wsm-amethyst`), Dusk (`wsm-dusk`) and Plum (`wsm-plum`). An application switches with `useAppConfig().ui.colors.primary`.

### Changed

- Plum is the default accent. `wsm-violet` stays as an alias of Plum for existing consumers.
- Buttons, controls, selection and progress bars read the current primary palette (`--ui-color-primary-*`); violet labels on a tint use shade 800 in light mode so that every palette keeps 4.5:1.

## [1.4.0] - 2026-11-18

### Changed

- Saturated violet accent from the family of the decorative shapes (`wsm-violet`: 600 `#7b1ff5` in light mode, 400 `#a05cff` in dark mode) instead of the pure electric `#7F00FF`.
- Funnel Display for headings and Funnel Sans for text, served locally; Geist Mono stays for labels and code.
- No solid fill: the primary button is violet glass, the secondary one a violet outline; checked checkboxes, radios, switches, solid badges, pill tabs and the active view of `WSegmented` take a violet tint with a violet edge. Violet labels keep a 4.5:1 contrast on the tint.
- `WStatTiles`, `WSection` and `WAuthGate` use the glass material; key figures that lead to a list lift and take a violet edge. Progress bars use the violet range.

### Fixed

- Selected text is visible again: the selection used colour variables that Nuxt UI does not define.

## [1.3.0] - 2026-11-18

### Added

- `WGlassCard` takes an `interactive` prop for cards that lead somewhere or hold the actions of an item: a short lift and a violet edge on hover and keyboard focus, without the pointer halo. Static cards keep the halo.

### Fixed

- A `WGlassCard` with `v-reveal` or `wi-enter` slides in and fades its glass surface instead of the whole card, so what sits behind it stays blurred during the entrance.

### Changed

- Update Nuxt layer dependencies: Tailwind CSS 4.3.5, Vue 3.5.45, Golar 0.1.11 and Biome 2.6.8. Development tooling only; the published layer is unchanged.
- The package is public on GitHub Packages; the README explains the token GitHub's npm registry still asks for.

## [1.2.0] - 2026-11-05

### Added

- Application components shared by the private applications: `WPageHeader`, `WStatTiles`, `WFilterBar`, `WSegmented`, `WPill`, `WSection`, `WActionBar`, `WEmptyState` and `WAuthGate`, with tone classes `wiToneSurface` and `wiToneFill`. Playground page `/application`.

### Changed

- Use a vivid, blue-leaning electric violet primary inspired by Figma's `#7F00FF`. Brand fills keep white labels in both themes; text uses `#AA55FF` in dark mode. Keep the brand ramp in a dedicated `wsm-violet` namespace, leaving Tailwind's palettes and status colors unchanged.
- Secondary buttons always use the primary subtle style, including when another variant is requested.
- Added a playground preview of primary text, buttons and switches on cards.

### Fixed

- Move the fallback focus outline into the base layer: it no longer overrides component focus styles, which drew a second outline inside inputs and chat prompts.
- Keep the full violet ramp in generated CSS so Nuxt UI resolves the brand shades even when no utility refers to them directly.
- Enforce LF line endings for source files on Windows as well as CI.

## [1.1.1] - 2026-10-22

### Fixed

- Include the visible language code in the language selector accessible name.

### Changed

- Use Golar for Vue type checking with TypeScript 7; keep Node available in the validation image.

## [1.1.0] - 2026-10-08

### Added

- `WStatusPage`: full-page status screens for 404, 400, 401, 403, 429, 500, 503, offline and coming soon, with a large icon lit by the pointer, the code in a badge, a perspective floor and an accent color per kind. Text in French and English, replaceable prop by prop.
- `app/error.vue` in the layer: every application that extends it gets the 404 and error pages. An application's own `app/error.vue` still wins.
- `useWiStatusLocale`, `wiStatusKind` and `wiStatusCopy` helpers.

## [1.0.1] - 2026-10-02

### Changed

- Package published from the `Wissem-Industries/ui` repository. The layer itself is unchanged.

## [1.0.0] - 2026-10-02

First stable release.

- Nuxt layer with the Wissem theme: violet primary, neutral palette, design tokens, local Geist fonts, Remix and Circle Flags icons.
- Glass material for menus, popovers, dialogs and toasts, opaque with reduced transparency or higher contrast.
- Components: `WNavbar`, `WColorModeButton`, `WLocaleSelect`, `WAmbient`, `WGlassCard`, `WGridBackground`, entrance and scroll reveal animations.
- Theme and language cookies (`wsm_theme`, `wsm_locale`) shared across subdomains through `WSM_COOKIE_DOMAIN`.
