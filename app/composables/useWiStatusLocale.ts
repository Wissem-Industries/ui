import type { WStatusLocale } from '../utils/wi-status'

function detect(): WStatusLocale {
  const nuxtApp = useNuxtApp()
  const i18n: unknown = Reflect.get(nuxtApp, '$i18n')
  if (typeof i18n === 'object' && i18n !== null && 'locale' in i18n) {
    const current = unref(i18n.locale)
    if (typeof current === 'string') return wiStatusLocale(current)
  }
  const stored = useCookie<string | null>('wsm_locale').value
  if (stored) return wiStatusLocale(stored)
  const header = useRequestHeaders(['accept-language'])['accept-language']
  if (header) return wiStatusLocale(header.split(',')[0])
  return import.meta.client ? wiStatusLocale(navigator.language) : 'en'
}

/**
 * Language of the status screens: the i18n module when the application has one,
 * then the shared `wsm_locale` cookie, then the browser. Computed once on the
 * server and reused by the client so that hydration matches.
 */
export function useWiStatusLocale() {
  return useState<WStatusLocale>('wi-status-locale', detect)
}
