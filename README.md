# Wissem UI

Shared design system for the `wissem.pro` applications, published as a Nuxt layer.

[![CI](https://ci.wissem.pro/api/badges/11/status.svg)](https://ci.wissem.pro/repos/11)
[![Release](https://img.shields.io/github/v/release/Wissem-Industries/ui?sort=semver)](https://github.com/Wissem-Industries/ui/releases)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

The layer brings the theme, design tokens, Nuxt UI defaults, local Geist fonts, Remix and Circle Flags icons, and a few shared components. Applications keep their own pages and logic.

Built with Nuxt 4, Vue 3, Nuxt UI 4 and Tailwind CSS 4.

## Usage

The package is published on GitHub Packages. Add a token with `read:packages` to your user `.npmrc`, then:

```bash
bun add --dev @wissem-industries/ui
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@wissem-industries/ui'],
})
```

```vue
<!-- app/app.vue -->
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

An application overrides the theme in its own `app/app.config.ts`. Priority: Nuxt UI defaults, then this layer, then the application.

### Shared theme and language

The theme is stored in the `wsm_theme` cookie. Applications that install `@nuxtjs/i18n` also inherit the `wsm_locale` language cookie; an application that does not offer the stored language keeps its default one.

Both cookies are written for the domain set in `WSM_COOKIE_DOMAIN` at build time. Release builds set `.wissem.pro` so that the choice follows the visitor across subdomains. Leave it empty locally: browsers reject a `.wissem.pro` cookie on `localhost`.

### Components

| Component              | Purpose                                                                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `WNavbar`              | Floating navigation bar. Icons only below 640 px, a sliding indicator on the active link. Keep the `#trailing` slot to icon buttons on phones. |
| `WColorModeButton`     | Light and dark toggle.                                                                                                                         |
| `WLocaleSelect`        | Language menu. Options can carry a `to` link.                                                                                                  |
| `WAmbient`             | Blurred copy of an image or of the primary color behind its content.                                                                           |
| `WGlassCard`           | Featured card on a glass surface.                                                                                                              |
| `WGridBackground`      | Background grid that fades downwards.                                                                                                          |
| `WStatusPage`          | Full-page status screen: 404, 401, 403, 429, 500, 503, offline, coming soon.                                                                   |
| `wi-enter`, `v-reveal` | Entrance and scroll reveal animations, disabled with reduced motion.                                                                           |

### Application components

Building blocks of the private applications (Stages, Housing): same header, figures, filters, pills and detail sections everywhere. They carry no business rule; texts come from props, built-in labels follow the language of the status screens.

| Component     | Purpose                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `WPageHeader` | Eyebrow, title, description and actions on the right.                                                                    |
| `WStatTiles`  | Row of key figures; a tile with `to` is a link to the matching list, a zero value is dimmed.                             |
| `WFilterBar`  | Search field, folding panel of filters with a counter of active filters, reset button. `leading` slot for a view switch. |
| `WSegmented`  | Switch between two to four views of a list (`v-model`).                                                                  |
| `WPill`       | Status pill with a tone (`primary`, `success`, `warning`, `error`, `info`, `neutral`), AA contrast in both themes.       |
| `WSection`    | Titled block of a detail page, with an `action` slot.                                                                    |
| `WActionBar`  | Main actions of a detail page: floating bar within thumb reach on phones, inline row from `md`.                          |
| `WEmptyState` | Empty list, missing item or failed load, with buttons in the default slot.                                               |
| `WAuthGate`   | Sign-in screen of a private application (Wissem SSO), with a denied state.                                               |

`wiToneSurface` and `wiToneFill` expose the tone classes for custom blocks.

### Error and status pages

The layer ships an `app/error.vue`: a missing route, a thrown `createError` or a server error renders `WStatusPage` with the right kind, in French or English (language of `@nuxtjs/i18n` when installed, then the `wsm_locale` cookie, then the browser). An application that defines its own `app/error.vue` replaces it and can still use the component:

```vue
<WStatusPage kind="maintenance" :until="new Date('2026-10-09T14:30:00')" />
<WStatusPage kind="coming-soon" as="section" :fullscreen="false" />
```

Kinds: `not-found`, `bad-request`, `unauthorized`, `forbidden`, `too-many-requests`, `server-error`, `maintenance`, `offline`, `coming-soon`. Props override the code, title, description, buttons and countdown (`retry-after`); the `home` and `retry` events replace the default actions. Motion stops with `prefers-reduced-motion`.

### Tokens and glass

The primary uses the dedicated `wsm-violet` palette, inspired by [Figma's violet reference](https://www.figma.com/colors/violet/): `#7F00FF` fills with white labels in both themes, and `#AA55FF` for text in dark mode. Primary text keeps at least 4.5:1 contrast on page and elevated card surfaces. Tailwind's built-in palettes and status colors are unchanged. Applications can still select another primary palette through `ui.colors.primary`.

For buttons, `color="secondary"` always renders the primary `subtle` style, regardless of the requested variant. It follows the current primary accent instead of introducing another color. Use `variant="subtle"` with the default color for the same appearance.

Tokens live in `app/assets/css/tokens.css` (surfaces, radii, durations, easings) and are not redefined by applications. Floating layers (menus, popovers, dialogs, toasts) use the `wi-glass` material, which turns opaque with reduced transparency, higher contrast or without `backdrop-filter`. Keep it off repeated list items.

## Development

```bash
bun install
bun run dev     # playground in .playground
bun run check   # lint, typecheck, build, package dry run
```

To try an unpublished version in an application, run `bun pm pack` here and `bun add --dev <path to the .tgz>` there.

## Release

Versions follow Semantic Versioning: a breaking change to a component, a token or a default is a major release. Changes are listed in [CHANGELOG.md](CHANGELOG.md).

```bash
bun run release 1.1.0   # updates package.json and the changelog
```

Merge the release pull request, then push the `v1.1.0` tag: the pipeline checks it against `package.json` and publishes the package.

## License

[MIT](LICENSE)
