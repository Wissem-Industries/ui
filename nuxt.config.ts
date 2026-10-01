import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-19',
  modules: ['@nuxt/ui'],
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
