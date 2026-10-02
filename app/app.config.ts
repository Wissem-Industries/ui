// Floating layers use the glass material (see glass.css) and a short
// spring entrance. Content stays on the default Nuxt UI structure.
const glassPanel = 'wi-glass rounded-xl'
const glassEnter =
  'data-[state=open]:animate-[wi-glass-in_260ms_var(--wi-ease-spring)] data-[state=closed]:animate-[wi-glass-out_120ms_var(--wi-ease-standard)]'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'violet',
      neutral: 'neutral',
    },
    icons: {
      arrowDown: 'i-ri-arrow-down-line',
      arrowLeft: 'i-ri-arrow-left-line',
      arrowRight: 'i-ri-arrow-right-line',
      arrowUp: 'i-ri-arrow-up-line',
      caution: 'i-ri-error-warning-line',
      check: 'i-ri-check-line',
      chevronDoubleLeft: 'i-ri-arrow-left-double-line',
      chevronDoubleRight: 'i-ri-arrow-right-double-line',
      chevronDown: 'i-ri-arrow-down-s-line',
      chevronLeft: 'i-ri-arrow-left-s-line',
      chevronRight: 'i-ri-arrow-right-s-line',
      chevronUp: 'i-ri-arrow-up-s-line',
      close: 'i-ri-close-line',
      copy: 'i-ri-file-copy-line',
      copyCheck: 'i-ri-checkbox-multiple-line',
      dark: 'i-ri-moon-line',
      drag: 'i-ri-draggable',
      ellipsis: 'i-ri-more-line',
      error: 'i-ri-close-circle-line',
      external: 'i-ri-external-link-line',
      eye: 'i-ri-eye-line',
      eyeOff: 'i-ri-eye-off-line',
      file: 'i-ri-file-line',
      folder: 'i-ri-folder-line',
      folderOpen: 'i-ri-folder-open-line',
      hash: 'i-ri-hashtag',
      info: 'i-ri-information-line',
      light: 'i-ri-sun-line',
      loading: 'i-ri-loader-4-line',
      menu: 'i-ri-menu-line',
      minus: 'i-ri-subtract-line',
      panelClose: 'i-ri-sidebar-fold-line',
      panelOpen: 'i-ri-sidebar-unfold-line',
      plus: 'i-ri-add-line',
      reload: 'i-ri-arrow-go-back-line',
      search: 'i-ri-search-line',
      stop: 'i-ri-stop-line',
      star: 'i-ri-star-line',
      success: 'i-ri-checkbox-circle-line',
      system: 'i-ri-computer-line',
      tip: 'i-ri-lightbulb-line',
      upload: 'i-ri-upload-2-line',
      warning: 'i-ri-alert-line',
    },
    button: {
      slots: {
        base: 'font-medium',
      },
      defaultVariants: {
        variant: 'subtle',
      },
    },
    badge: {
      slots: {
        base: 'rounded-full',
      },
      defaultVariants: {
        variant: 'subtle',
        size: 'lg',
      },
    },
    input: {
      defaultVariants: {
        variant: 'soft',
      },
    },
    textarea: {
      defaultVariants: {
        variant: 'soft',
      },
    },
    inputNumber: {
      defaultVariants: {
        variant: 'soft',
      },
    },
    inputTags: {
      defaultVariants: {
        variant: 'soft',
      },
    },
    inputDate: {
      defaultVariants: {
        variant: 'soft',
      },
    },
    inputTime: {
      defaultVariants: {
        variant: 'soft',
      },
    },
    pinInput: {
      defaultVariants: {
        variant: 'soft',
      },
    },
    dropdownMenu: {
      slots: {
        content: `${glassPanel} ${glassEnter}`,
        item: 'before:rounded-lg',
      },
    },
    contextMenu: {
      slots: {
        content: `${glassPanel} ${glassEnter}`,
        item: 'before:rounded-lg',
      },
    },
    popover: {
      slots: {
        content: `${glassPanel} ${glassEnter}`,
      },
    },
    select: {
      slots: {
        content: `${glassPanel} ${glassEnter}`,
      },
      defaultVariants: {
        variant: 'soft',
      },
    },
    selectMenu: {
      slots: {
        content: `${glassPanel} ${glassEnter}`,
      },
      defaultVariants: {
        variant: 'soft',
      },
    },
    inputMenu: {
      slots: {
        content: `${glassPanel} ${glassEnter}`,
      },
      defaultVariants: {
        variant: 'soft',
      },
    },
    tooltip: {
      slots: {
        content:
          'wi-glass wi-glass--clear rounded-lg data-[state=delayed-open]:animate-[wi-glass-in_220ms_var(--wi-ease-spring)] data-[state=closed]:animate-[wi-glass-out_100ms_var(--wi-ease-standard)]',
      },
    },
    modal: {
      slots: {
        content: 'wi-glass wi-glass--thick',
      },
    },
    slideover: {
      slots: {
        content: 'wi-glass wi-glass--thick',
      },
    },
    drawer: {
      slots: {
        content: 'wi-glass wi-glass--thick',
      },
    },
    toast: {
      slots: {
        root: 'wi-glass rounded-xl',
      },
    },
    card: {
      slots: {
        root: 'rounded-xl ring-default/70 shadow-sm',
      },
    },
    navigationMenu: {
      slots: {
        link: 'font-medium',
      },
      defaultVariants: {
        color: 'neutral',
        variant: 'link',
      },
    },
    pageHero: {
      slots: {
        title: 'text-pretty tracking-tight',
        description: 'text-pretty leading-7',
      },
    },
    pageSection: {
      slots: {
        title: 'text-pretty tracking-tight',
        description: 'text-pretty leading-7',
      },
    },
  },
})
