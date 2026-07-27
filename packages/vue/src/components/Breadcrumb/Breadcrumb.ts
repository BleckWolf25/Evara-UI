/**
 * @file Breadcrumb.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Breadcrumb navigation hierarchy UI component.
 *
 * @description
 * Renders ordered list links with configurable separators and active page ARIA indicators for site path navigation.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { BreadcrumbController } from '@evara-ui/core'
import type { BreadcrumbProps } from './Breadcrumb.types'
import './Breadcrumb.css'

// ---------- VUE BREADCRUMB COMPONENT
export const Breadcrumb = defineComponent({
   
  name: 'Breadcrumb',
  props: {
    items: {
      type: Array as PropType<BreadcrumbProps['items']>,
      required: true,
    },
    separator: {
      type: String,
      default: '/',
    },
  },
  setup(props, { attrs }) {
    return () => {
      // ---------- HEADLESS BREADCRUMB CONTROLLER INITIALIZATION
      const controller = new BreadcrumbController({
        items: props.items,
        separator: props.separator,
      })

      return h(
        'nav',
        {
          class: [controller.getBreadcrumbClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        [
          h(
            'ol',
            { class: controller.getListClasses() },
            controller.getItems().map((item, index) => {
              const isLast = index === controller.getItems().length - 1
              const isCurrent = item.current ?? isLast

              return h('li', { key: index, class: controller.getItemClasses(isCurrent) }, [
                item.href && !isCurrent
                  ? h('a', { href: item.href, class: controller.getLinkClasses() }, item.label)
                  : h('span', { class: controller.getCurrentClasses() }, item.label),
                !isLast ? h('span', { class: controller.getSeparatorClasses() }, controller.getSeparator()) : null,
              ])
            })
          ),
        ]
      )
    }
  },
})
