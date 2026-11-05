<script setup lang="ts">
/**
 * Search field and a folding panel of secondary filters. The `leading` slot takes a view switch
 * (`WSegmented`), the default slot the filters. `active` counts the filters that differ from
 * their default; the reset button shows as soon as one does or the search is filled.
 */
const props = withDefaults(
  defineProps<{ placeholder?: string; active?: number; searchLabel?: string }>(),
  { placeholder: undefined, active: 0, searchLabel: undefined },
)
const emit = defineEmits<{ reset: [] }>()
const search = defineModel<string>('search', { default: '' })
const open = defineModel<boolean>('open', { default: false })

const copy = useWiAppCopy()
const panel = useId()
const filtering = computed(() => props.active > 0 || !!search.value.trim())
</script>

<template>
  <section :aria-label="copy.filters" class="space-y-3">
    <div class="flex flex-wrap items-center gap-2">
      <slot name="leading" />
      <UInput
        v-model="search"
        type="search"
        icon="i-ri-search-line"
        :placeholder="placeholder"
        :aria-label="searchLabel ?? copy.search"
        class="min-w-0 flex-1 basis-56"
        :ui="{ base: 'text-base sm:text-sm' }"
      />
      <UButton
        v-if="$slots.default"
        class="shrink-0"
        color="neutral"
        variant="outline"
        icon="i-ri-equalizer-line"
        :label="copy.filters"
        :aria-expanded="open"
        :aria-controls="panel"
        @click="open = !open"
      >
        <template v-if="active" #trailing>
          <span
            class="flex size-5 items-center justify-center rounded-full bg-primary text-[0.7rem] font-semibold text-inverted"
          >
            {{ active }}
          </span>
        </template>
      </UButton>
    </div>
    <div v-if="$slots.default" v-show="open" :id="panel" class="space-y-3">
      <slot />
    </div>
    <div v-if="filtering" class="flex justify-end">
      <UButton :label="copy.reset" icon="i-ri-close-line" color="neutral" variant="link" size="sm" @click="emit('reset')" />
    </div>
  </section>
</template>
