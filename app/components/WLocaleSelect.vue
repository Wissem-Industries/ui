<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

export interface WLocaleOption {
  code: string
  label: string
  /** Icon of the language, usually a Circle Flags icon. */
  icon: string
  /** Link to the same page in this language, used without JavaScript. */
  to?: string
}

const props = defineProps<{
  locales: WLocaleOption[]
  current: string
  label: string
}>()

const emit = defineEmits<{ select: [code: string] }>()

const currentLocale = computed(() => props.locales.find((locale) => locale.code === props.current))

const items = computed<DropdownMenuItem[]>(() =>
  props.locales.map((locale) => ({
    label: locale.label,
    icon: locale.icon,
    to: locale.to,
    trailingIcon: locale.code === props.current ? 'i-ri-check-line' : undefined,
    onSelect: () => {
      if (locale.code !== props.current) emit('select', locale.code)
    },
  })),
)
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end', sideOffset: 10 }"
    :ui="{ content: 'min-w-44', itemLeadingIcon: 'size-4' }"
  >
    <UButton
      :aria-label="label"
      color="neutral"
      variant="ghost"
      size="sm"
      class="h-11 justify-center gap-1.5 rounded-full px-2.5 font-mono text-[10px] sm:h-9"
    >
      <UIcon v-if="currentLocale" :name="currentLocale.icon" aria-hidden="true" class="size-3.5" />
      <span>{{ current.toUpperCase() }}</span>
      <UIcon name="i-ri-arrow-down-s-line" aria-hidden="true" class="size-3" />
    </UButton>
  </UDropdownMenu>
</template>
