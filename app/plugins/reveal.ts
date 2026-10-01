import type { Directive } from 'vue'

const STAGGER_MS = 55
const MAX_STAGGER_STEPS = 6

interface RevealElement extends HTMLElement {
  __wiReveal?: IntersectionObserver
}

/**
 * `v-reveal` fades an element in when it scrolls into view. The optional
 * value is the position in a group, used to stagger siblings.
 *
 * Content that is already on screen at hydration is left alone: it never
 * flashes hidden, and the largest paint is not delayed. Without JavaScript
 * every element stays visible.
 */
const reveal: Directive<RevealElement, number | undefined> = {
  mounted(el, { value = 0 }) {
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const { top } = el.getBoundingClientRect()
    if (top < window.innerHeight * 0.92) return

    const step = Math.min(Math.max(value, 0), MAX_STAGGER_STEPS)
    el.style.setProperty('--wi-reveal-delay', `${step * STAGGER_MS}ms`)
    el.classList.add('wi-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        el.classList.add('wi-reveal--visible')
        observer.disconnect()
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    el.__wiReveal = observer
  },
  unmounted(el) {
    el.__wiReveal?.disconnect()
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})
