<script setup lang="ts">
/** Titled block of a detail page. The `action` slot sits on the right of the title. */
withDefaults(defineProps<{ id: string; title: string; icon?: string }>(), { icon: undefined })
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="`${id}-title`"
    class="scroll-mt-24 rounded-2xl bg-elevated shadow-sm ring ring-default/70"
  >
    <header class="flex items-center justify-between gap-3 border-b border-default/70 px-5 py-3.5 sm:px-6">
      <h2 :id="`${id}-title`" class="flex items-center gap-2 text-sm font-semibold text-highlighted">
        <UIcon v-if="icon" :name="icon" class="size-4.5 text-primary" aria-hidden="true" />
        {{ title }}
      </h2>
      <slot name="action" />
    </header>
    <div class="px-5 py-5 sm:px-6">
      <slot />
    </div>
  </section>
</template>
