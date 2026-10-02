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

| Component | Purpose |
| --- | --- |
| `WNavbar` | Floating navigation bar. Icons only below 640 px, a sliding indicator on the active link. Keep the `#trailing` slot to icon buttons on phones. |
| `WColorModeButton` | Light and dark toggle. |
| `WLocaleSelect` | Language menu. Options can carry a `to` link. |
| `WAmbient` | Blurred copy of an image or of the primary color behind its content. |
| `WGlassCard` | Featured card on a glass surface. |
| `WGridBackground` | Background grid that fades downwards. |
| `wi-enter`, `v-reveal` | Entrance and scroll reveal animations, disabled with reduced motion. |

### Tokens and glass

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
