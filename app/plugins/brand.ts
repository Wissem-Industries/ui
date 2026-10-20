export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()

  useHead(() => ({
    htmlAttrs: { 'data-wsm-primary': appConfig.ui.colors.primary },
  }))
})
