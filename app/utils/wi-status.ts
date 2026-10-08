export type WStatusKind =
  | 'not-found'
  | 'bad-request'
  | 'unauthorized'
  | 'forbidden'
  | 'too-many-requests'
  | 'server-error'
  | 'maintenance'
  | 'offline'
  | 'coming-soon'

export type WStatusLocale = 'fr' | 'en'

export interface WStatusCopy {
  /** Short label above the title, without the status code. */
  eyebrow: string
  title: string
  description: string
}

export interface WStatusUi {
  home: string
  back: string
  retry: string
  retryIn: (seconds: number) => string
  requested: string
  until: (when: string, today: boolean) => string
  theme: string
  backOnline: string
  code: (code: string) => string
}

interface WStatusKindMeta {
  /** Code displayed when none is given. Kinds without a code show the icon instead. */
  code?: number
  icon: string
  /** Surface color of the page, one of the Nuxt UI semantic colors. */
  accent: 'primary' | 'warning' | 'error' | 'info' | 'neutral'
  retry: boolean
}

export const wiStatusKinds: Record<WStatusKind, WStatusKindMeta> = {
  'not-found': { code: 404, icon: 'i-ri-compass-3-line', accent: 'primary', retry: false },
  'bad-request': { code: 400, icon: 'i-ri-error-warning-line', accent: 'warning', retry: false },
  unauthorized: { code: 401, icon: 'i-ri-key-2-line', accent: 'warning', retry: false },
  forbidden: { code: 403, icon: 'i-ri-forbid-2-line', accent: 'error', retry: false },
  'too-many-requests': { code: 429, icon: 'i-ri-timer-line', accent: 'warning', retry: true },
  'server-error': { code: 500, icon: 'i-ri-bug-line', accent: 'error', retry: true },
  maintenance: { code: 503, icon: 'i-ri-tools-line', accent: 'info', retry: true },
  offline: { icon: 'i-ri-wifi-off-line', accent: 'neutral', retry: true },
  'coming-soon': { icon: 'i-ri-rocket-2-line', accent: 'primary', retry: false },
}

const copy: Record<WStatusLocale, Record<WStatusKind, WStatusCopy>> = {
  fr: {
    'not-found': {
      eyebrow: 'Page introuvable',
      title: 'Cette page n’existe pas',
      description:
        'L’adresse ne mène nulle part. La page a pu être déplacée ou supprimée, ou le lien contient une faute de frappe.',
    },
    'bad-request': {
      eyebrow: 'Requête invalide',
      title: 'Cette demande ne peut pas aboutir',
      description:
        'Le serveur n’a pas pu comprendre la demande. Revenez en arrière et recommencez depuis le début.',
    },
    unauthorized: {
      eyebrow: 'Connexion requise',
      title: 'Identifiez-vous pour continuer',
      description:
        'Cette page demande une session valide. Connectez-vous, puis revenez à l’adresse demandée.',
    },
    forbidden: {
      eyebrow: 'Accès refusé',
      title: 'Cette page vous est fermée',
      description:
        'Votre compte n’a pas les droits nécessaires pour la consulter. Si vous pensez que c’est une erreur, contactez le responsable du service.',
    },
    'too-many-requests': {
      eyebrow: 'Trop de requêtes',
      title: 'Doucement, une chose à la fois',
      description:
        'Vous avez envoyé trop de demandes en peu de temps. Patientez un instant avant de réessayer.',
    },
    'server-error': {
      eyebrow: 'Erreur du serveur',
      title: 'Quelque chose s’est mal passé',
      description:
        'Le serveur a rencontré un problème, qui ne vient pas de vous. Réessayez dans quelques instants.',
    },
    maintenance: {
      eyebrow: 'Maintenance en cours',
      title: 'Le service revient bientôt',
      description:
        'Une intervention est en cours ou le service redémarre. Il devrait être de nouveau disponible dans quelques instants.',
    },
    offline: {
      eyebrow: 'Hors ligne',
      title: 'Plus de connexion',
      description:
        'Votre appareil n’a plus accès à Internet. La page reprendra d’elle-même quand le réseau sera de retour.',
    },
    'coming-soon': {
      eyebrow: 'En préparation',
      title: 'Bientôt disponible',
      description: 'Cette page n’est pas encore ouverte. Elle arrive.',
    },
  },
  en: {
    'not-found': {
      eyebrow: 'Page not found',
      title: 'This page does not exist',
      description:
        'The address leads nowhere. The page may have been moved or removed, or the link has a typo.',
    },
    'bad-request': {
      eyebrow: 'Invalid request',
      title: 'This request cannot be completed',
      description:
        'The server could not understand the request. Go back and start again from the beginning.',
    },
    unauthorized: {
      eyebrow: 'Sign-in required',
      title: 'Sign in to continue',
      description:
        'This page needs a valid session. Sign in, then come back to the requested address.',
    },
    forbidden: {
      eyebrow: 'Access denied',
      title: 'This page is closed to you',
      description:
        'Your account does not have the rights to view it. If you think this is a mistake, contact the owner of the service.',
    },
    'too-many-requests': {
      eyebrow: 'Too many requests',
      title: 'Easy, one thing at a time',
      description: 'You sent too many requests in a short time. Wait a moment before trying again.',
    },
    'server-error': {
      eyebrow: 'Server error',
      title: 'Something went wrong',
      description:
        'The server ran into a problem, and it is not your fault. Try again in a moment.',
    },
    maintenance: {
      eyebrow: 'Maintenance in progress',
      title: 'The service will be back soon',
      description:
        'Work is under way or the service is restarting. It should be available again in a moment.',
    },
    offline: {
      eyebrow: 'Offline',
      title: 'No connection',
      description:
        'Your device has lost its Internet access. The page picks up by itself once the network is back.',
    },
    'coming-soon': {
      eyebrow: 'In preparation',
      title: 'Coming soon',
      description: 'This page is not open yet. It is on its way.',
    },
  },
}

const ui: Record<WStatusLocale, WStatusUi> = {
  fr: {
    home: 'Retour à l’accueil',
    back: 'Page précédente',
    retry: 'Réessayer',
    retryIn: (seconds) => `Réessayer dans ${seconds} s`,
    requested: 'Adresse demandée',
    until: (when, today) => `Retour prévu ${today ? 'à' : 'le'} ${when}`,
    theme: 'Changer de thème',
    backOnline: 'Connexion rétablie',
    code: (code) => `Erreur ${code}`,
  },
  en: {
    home: 'Back to home',
    back: 'Previous page',
    retry: 'Try again',
    retryIn: (seconds) => `Try again in ${seconds} s`,
    requested: 'Requested address',
    until: (when, today) => `Back ${today ? 'at' : 'on'} ${when}`,
    theme: 'Toggle color mode',
    backOnline: 'Back online',
    code: (code) => `Error ${code}`,
  },
}

/** Language of a locale code such as `fr`, `fr-FR` or `en_GB`; English when unsupported. */
export function wiStatusLocale(code: string | null | undefined): WStatusLocale {
  return code?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function wiStatusCopy(kind: WStatusKind, locale: WStatusLocale): WStatusCopy {
  return copy[locale][kind]
}

export function wiStatusUi(locale: WStatusLocale): WStatusUi {
  return ui[locale]
}

/** Kind of page that fits an HTTP status code. */
export function wiStatusKind(statusCode: number | undefined): WStatusKind {
  switch (statusCode) {
    case 401:
      return 'unauthorized'
    case 403:
      return 'forbidden'
    case 404:
    case 410:
      return 'not-found'
    case 429:
      return 'too-many-requests'
    case 502:
    case 503:
    case 504:
      return 'maintenance'
    default:
      if (statusCode !== undefined && statusCode >= 400 && statusCode < 500) return 'bad-request'
      return 'server-error'
  }
}
