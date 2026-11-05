<script setup lang="ts">
/**
 * Sign-in screen of a private application, shown in place of its content without a session.
 * `denied` explains that the account is signed in but not allowed.
 */
withDefaults(
  defineProps<{
    title: string
    icon?: string
    description?: string
    denied?: boolean
    loginTo?: string
  }>(),
  { icon: 'i-ri-lock-line', description: undefined, denied: false, loginTo: '/auth/login' },
)
const copy = useWiAppCopy()
</script>

<template>
  <div class="relative flex flex-1 items-center justify-center overflow-hidden px-4 pt-24 pb-16">
    <WGridBackground />
    <div class="relative w-full max-w-sm rounded-2xl bg-elevated p-6 text-center shadow-sm ring ring-default/70 sm:p-8">
      <span class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <UIcon :name="denied ? 'i-ri-lock-line' : icon" class="size-6" aria-hidden="true" />
      </span>
      <h1 class="text-xl font-semibold tracking-tight text-highlighted">{{ title }}</h1>
      <p class="mt-2 text-pretty text-sm leading-6 text-muted">
        {{ denied ? copy.denied : (description ?? copy.signInRequired) }}
      </p>
      <UButton :to="loginTo" external :label="copy.signIn" icon="i-ri-login-box-line" block size="lg" class="mt-6" />
    </div>
  </div>
</template>
