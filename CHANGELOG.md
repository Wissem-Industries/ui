# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

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
