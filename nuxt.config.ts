import { fileURLToPath } from 'node:url'

// Read at build time. Production images set `.wissem.pro` so that theme and language
// follow the visitor across subdomains; left empty, cookies stay on the current host
// (a browser refuses a `.wissem.pro` cookie on localhost).
const cookieDomain = process.env.WSM_COOKIE_DOMAIN || undefined
const oneYear = 60 * 60 * 24 * 365

// Only used by products that install @nuxtjs/i18n, hence unknown to the layer's own
// config type. A product that lacks the stored language falls back to its default.
const sharedLocale: Record<string, unknown> = {
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'wsm_locale',
      cookieDomain: cookieDomain ?? null,
    },
  },
}

export default defineNuxtConfig({
  compatibilityDate: '2026-09-19',
  modules: ['@nuxt/ui'],
  colorMode: {
    storage: 'cookie',
    storageKey: 'wsm_theme',
    cookieAttrs: { path: '/', maxAge: oneYear, sameSite: 'lax', domain: cookieDomain },
  },
  ...sharedLocale,
  // Fades between pages; skipped with prefers-reduced-motion.
  experimental: { viewTransition: true },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  css: [fileURLToPath(new URL('./app/assets/css/main.css', import.meta.url))],
  fonts: {
    providers: {
      adobe: false,
      bunny: false,
      fontshare: false,
      fontsource: false,
      google: false,
      googleicons: false,
    },
    families: [
      { name: 'Geist Variable', provider: 'none' },
      { name: 'Geist Mono Variable', provider: 'none' },
    ],
  },
})
