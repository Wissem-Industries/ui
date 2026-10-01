# Wissem UI

<p align="center">
  <strong>The shared Nuxt design system for Wissem’s Industries.</strong><br />
  Reusable visual foundations for the applications in the <code>wissem.pro</code> ecosystem.
</p>

<p align="center">
  <a href="https://ci.wissem.pro/repos/1"><img alt="Woodpecker CI" src="https://ci.wissem.pro/api/badges/1/status.svg" /></a>
  <a href="https://github.com/Wissem-Industries/Wissem-UI/releases"><img alt="Latest version" src="https://img.shields.io/github/v/tag/Wissem-Industries/Wissem-UI?sort=semver&label=version" /></a>
  <a href="https://github.com/orgs/Wissem-Industries/packages/npm/package/ui"><img alt="GitHub Packages" src="https://img.shields.io/badge/GitHub%20Packages-@wissem--industries%2Fui-181717?logo=github&logoColor=white" /></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/github/license/Wissem-Industries/Wissem-UI" /></a>
</p>

<p align="center">
  <img alt="Nuxt 4" src="https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white" />
  <img alt="Vue 3" src="https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white" />
  <img alt="Bun 1.4" src="https://img.shields.io/badge/Bun-1.4-FBF0DF?logo=bun&logoColor=000" />
  <img alt="Biome" src="https://img.shields.io/badge/Biome-2-60A5FA?logo=biome&logoColor=white" />
</p>

Wissem UI is a Nuxt Layer built with Nuxt 4, Vue 3, Nuxt UI 4 and Tailwind CSS
4. Applications extend `@wissem-industries/ui` to inherit the shared theme and
component defaults while keeping their own pages and business logic. No
component wrappers are required.

## Requirements

- Node.js 22 or newer
- Bun 1.4 or newer
- A Nuxt 4 application

## Use in another project

### 1. Install the package

Install the Layer as a development dependency of the consuming application:

```bash
bun add --dev @wissem-industries/ui
```

`@nuxt/ui`, Tailwind CSS and the icon collections used by the theme are
dependencies of this package. A consuming application does not need to install
or register them again. Geist and Geist Mono are also bundled locally, so a
consumer build does not depend on Google Fonts being reachable.

The WissemHome favicon is included automatically at `/favicon.ico`. To use a
different favicon for one application, add its own `public/favicon.ico` to
override the design system asset.

### 2. Extend the Layer

Add `@wissem-industries/ui` to the application's `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['@wissem-industries/ui'],
})
```

### 3. Add the Nuxt UI provider

Keep the root structure inside the consuming application and wrap it with
`UApp` in `app/app.vue`:

```vue
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

Nuxt UI components are now auto-imported and use the shared Wissem theme:

```vue
<template>
  <UCard>
    <UBadge label="New" />
    <UButton label="Continue" />
  </UCard>
</template>
```

### 4. Override the theme for one application

The consuming application always has priority over the Layer. Add only the
exceptions that application needs to its own `app/app.config.ts`:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
    },
    button: {
      defaultVariants: {
        variant: 'solid',
      },
    },
  },
})
```

The configuration priority is:

```text
Nuxt UI defaults < @wissem-industries/ui defaults < application overrides
```

## Design tokens

The Layer defines its tokens in `app/assets/css/tokens.css`. Products use them
and never redefine them locally.

| Group | Tokens | Use |
| --- | --- | --- |
| Surfaces | `bg`, `bg-muted`, `bg-elevated`, `bg-accented` | Page, recessed areas, cards and panels, hover states. Cards stand out from the page by their surface, not only by their border. |
| Radii | `--wi-radius-control`, `--wi-radius-card`, `--wi-radius-panel`, `--wi-radius-pill` | `rounded-md`, `rounded-xl`, `rounded-2xl`, `rounded-full`. Nested elements use the step below their parent's. |
| Duration | `--wi-duration-instant`, `-fast`, `-base`, `-slow`, `-slower` | 80, 140, 220, 360 and 560 ms. They drop to near zero with `prefers-reduced-motion: reduce`. |
| Easing | `--wi-ease-standard`, `-out`, `-in-out`, `-spring` | Also available as `ease-wi-standard`, `ease-wi-out`, `ease-wi-in-out` and `ease-wi-spring` utilities. |

In light mode the primary color uses the 600 step so that violet text keeps a
4.5:1 contrast on the page background.

The playground (`bun run dev`) is the reference for these foundations in light
and dark mode.

## Liquid Glass

Floating layers use a translucent material: it blurs and saturates what is
behind it and catches light on its edge. Nuxt UI menus, popovers, tooltips,
dialogs, slideovers, drawers and toasts get it from the Layer configuration,
with no wrapper.

| Level | Class | Use |
| --- | --- | --- |
| Regular | `wi-glass` | Bars and menus |
| Clear | `wi-glass wi-glass--clear` | Small controls over an image |
| Thick | `wi-glass wi-glass--thick` | Dialogs and panels holding forms |

Rules:

- Real glass only on floating layers and on one to three featured cards per
  page. Never on repeated list items: blurring dozens of surfaces makes
  scrolling janky on phones.
- Surfaces become opaque with `prefers-reduced-transparency`,
  `prefers-contrast: more`, `forced-colors` and when `backdrop-filter` is
  missing.
- The refraction of Apple's version needs an SVG displacement filter, which
  only works in Chromium and costs a lot to render, so it is not reproduced.

## Shared components

| Component | Purpose |
| --- | --- |
| `WNavbar` | Floating glass pill at the top of the page. Links show their label from 640 px, and only their icon below, so the bar stays clear of the browser toolbars at the bottom of phones. A sliding indicator follows the active link. Keep about `pt-24` above the content on phones. |
| `WColorModeButton` | Light/dark toggle. The new theme is revealed by a circle growing from the button (View Transitions API, instant without it or with reduced motion). |
| `WLocaleSelect` | Language menu that closes on selection, outside click and Escape. Options can carry a `to` link so it works without JavaScript. |
| `WAmbient` | Blurred, saturated copy of an image (or of the primary color) behind its content, as album art in Apple Music. Pass a small image. |
| `WGlassCard` | Featured card: real glass over an ambient halo that follows the pointer. |
| `WGridBackground` | Background grid that fades downwards. |
| `wi-enter` | Class for the content visible at load: it fades in and settles. Set `--wi-enter-step` to stagger a group. Disabled with `prefers-reduced-motion`. |
| `v-reveal` | Fades an element in when it scrolls into view; the value staggers siblings. Content visible at load is left alone and nothing is hidden without JavaScript. |

```vue
<WNavbar :items="items" label="Primary navigation">
  <template #trailing>
    <WLocaleSelect :locales="locales" :current="locale" label="Language" @select="setLocale" />
    <WColorModeButton label="Toggle color mode" />
  </template>
</WNavbar>
```

Navigation between pages uses View Transitions (`experimental.viewTransition`
is enabled by the Layer): the old page fades out and the new one fades in.
Nuxt skips it with `prefers-reduced-motion`.

## Icons

Interface icons use Remix (`i-ri-*`) and flags use Circle Flags
(`i-circle-flags-*`). Lucide is no longer bundled: replace any `i-lucide-*`
icon of a product with its Remix equivalent when moving to 0.6.

## Test an unpublished version locally

Create an archive from this repository:

```bash
bun pm pack
```

The current package creates `wissem-industries-ui-0.7.0.tgz` in the repository
root. Install that archive from another Nuxt project (adjust the path if the
repositories are not siblings):

```bash
bun add --dev ../Wissem-UI/wissem-industries-ui-0.7.0.tgz
```

Use the same `extends: ['@wissem-industries/ui']` and `UApp` configuration shown above.
This reproduces how the Layer behaves after registry publication.

## Development

Install dependencies and start the playground:

```bash
bun install
bun run dev
```

The repository root is the distributable Layer. `.playground` is a small Nuxt
application that extends the root locally and is used only for visual and
integration checks.

## Quality checks

Run every publication check with one command:

```bash
bun run check
```

The command runs Biome, Nuxt type checking, the production build and a dry run
of the package archive. Individual commands remain available:

```bash
bun run lint
bun run typecheck
bun run build
bun run pack:check
```

Biome is a repository development tool and is not imposed on consuming
applications.

## Package contents

Only the files required by consumers are published:

```text
app/
public/
nuxt.config.ts
README.md
LICENSE
package.json
```

The playground, CI configuration, build output and local development files are
excluded from the package.

## Publication

The package is published to the GitHub Packages npm registry at
`https://npm.pkg.github.com`. Local consumers need a GitHub token with
`read:packages` access in their user-level `.npmrc`; CI uses the shared
`github_packages_token` Woodpecker secret.

Version tags matching `v*` run the Woodpecker pipeline. It verifies the tag
against `package.json`, runs all quality checks, publishes the package and
records the result in GitHub Deployments under `package-registry`. Release
titles follow the `Wissem UI vX.Y.Z` format.

## Project scope

This Layer shares the Wissem theme, tokens, Nuxt UI defaults and future
cross-application UI patterns. It must remain free of application-specific
content, authentication rules and other business logic.

## License

[MIT](./LICENSE)
