import { wiAppCopy } from '../utils/wi-app'

/** Built-in text of the application components, in the language of the status screens. */
export function useWiAppCopy() {
  const locale = useWiStatusLocale()
  return computed(() => wiAppCopy[locale.value])
}
