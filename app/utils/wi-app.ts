export type WTone = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'

/**
 * Tinted surfaces for pills and highlighted blocks. Full class names, so that Tailwind finds
 * them, with at least 4.5:1 text contrast in light and dark mode.
 */
export const wiToneSurface: Record<WTone, string> = {
  primary: 'bg-primary/10 text-primary ring-primary/25',
  success:
    'bg-green-600/10 text-green-800 ring-green-700/25 dark:bg-green-400/10 dark:text-green-300 dark:ring-green-400/25',
  warning:
    'bg-amber-500/12 text-amber-900 ring-amber-700/30 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/25',
  error:
    'bg-red-600/10 text-red-800 ring-red-700/25 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/25',
  info: 'bg-sky-600/10 text-sky-800 ring-sky-700/25 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/25',
  neutral:
    'bg-neutral-500/10 text-neutral-700 ring-neutral-600/20 dark:bg-neutral-400/10 dark:text-neutral-300 dark:ring-neutral-400/20',
}

/** Solid dot or bar of a tone. */
export const wiToneFill: Record<WTone, string> = {
  primary: 'bg-primary',
  success: 'bg-green-600 dark:bg-green-400',
  warning: 'bg-amber-600 dark:bg-amber-400',
  error: 'bg-red-600 dark:bg-red-400',
  info: 'bg-sky-600 dark:bg-sky-400',
  neutral: 'bg-neutral-500 dark:bg-neutral-400',
}

export interface WAppCopy {
  filters: string
  reset: string
  search: string
  signIn: string
  signInRequired: string
  denied: string
}

export const wiAppCopy: Record<'fr' | 'en', WAppCopy> = {
  fr: {
    filters: 'Filtres',
    reset: 'Réinitialiser',
    search: 'Rechercher',
    signIn: 'Se connecter avec Wissem SSO',
    signInRequired: 'Connexion requise pour continuer.',
    denied: 'Ce compte n’a pas accès à l’application.',
  },
  en: {
    filters: 'Filters',
    reset: 'Reset',
    search: 'Search',
    signIn: 'Sign in with Wissem SSO',
    signInRequired: 'Sign in to continue.',
    denied: 'This account has no access to the application.',
  },
}
