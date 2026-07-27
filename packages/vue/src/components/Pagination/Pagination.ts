/**
 * @file Pagination.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Pagination page navigation control component.
 *
 * @description
 * Renders pagination page buttons with previous/next controls, page number ranges, ellipsis truncated page ranges, and navigation ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { PaginationController } from '@bleckwolf25/core'
import type { PaginationProps } from './Pagination.types'
import './Pagination.css'

// ---------- COMPONENTS

// ---------- VUE PAGINATION COMPONENT
export const Pagination = defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: undefined,
    },
    totalItems: {
      type: Number,
      default: undefined,
    },
    size: {
      type: String as PropType<PaginationProps['size']>,
      default: 'md',
    },
  },
  emits: ['pageChange', 'update:currentPage', 'itemsPerPageChange'],
  setup(props, { emit, attrs }) {
    // ---------- PAGE CHANGE HANDLER
    const handlePageChange = (page: number) => {
      // Early return guard clause for invalid page range or duplicate selection
      if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
        emit('pageChange', page)
        emit('update:currentPage', page)
      }
    }

    return () => {
      // ---------- HEADLESS PAGINATION CONTROLLER INITIALIZATION
      const controller = new PaginationController({
        currentPage: props.currentPage,
        totalPages: props.totalPages,
        itemsPerPage: props.itemsPerPage,
        totalItems: props.totalItems,
        size: props.size,
      })

      // ---------- PREVIOUS PAGE HANDLER
      const handlePrev = () => {
        if (controller.canGoToPrev()) {
          handlePageChange(props.currentPage - 1)
        }
      }

      // ---------- NEXT PAGE HANDLER
      const handleNext = () => {
        if (controller.canGoToNext()) {
          handlePageChange(props.currentPage + 1)
        }
      }

      return h(
        'nav',
        {
          class: [controller.getPaginationClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        [
          h('ul', { class: controller.getListClasses() }, [
            h('li', { class: controller.getItemClasses(false, !controller.canGoToPrev()) }, [
              h(
                'button',
                {
                  type: 'button',
                  class: controller.getLinkClasses(),
                  onClick: handlePrev,
                  disabled: !controller.canGoToPrev(),
                  'aria-label': 'Previous page',
                },
                '‹'
              ),
            ]),
            ...controller.getVisiblePages().map((page, index) => {
              if (page === -1) {
                return h('li', { key: `ellipsis-${index}`, class: controller.getItemClasses(false, true) }, [
                  h('span', { class: controller.getLinkClasses() }, '...'),
                ])
              }

              return h('li', { key: page, class: controller.getItemClasses(page === props.currentPage, false) }, [
                h(
                  'button',
                  {
                    type: 'button',
                    class: controller.getLinkClasses(),
                    onClick: () => { handlePageChange(page); },
                    'aria-label': `Page ${page}`,
                    'aria-current': page === props.currentPage ? 'page' : undefined,
                  },
                  page
                ),
              ])
            }),
            h('li', { class: controller.getItemClasses(false, !controller.canGoToNext()) }, [
              h(
                'button',
                {
                  type: 'button',
                  class: controller.getLinkClasses(),
                  onClick: handleNext,
                  disabled: !controller.canGoToNext(),
                  'aria-label': 'Next page',
                },
                '›'
              ),
            ]),
          ]),
          props.totalItems && props.itemsPerPage
            ? h(
                'div',
                { class: controller.getInfoClasses() },
                `Showing ${(props.currentPage - 1) * props.itemsPerPage + 1} to ${Math.min(
                  props.currentPage * props.itemsPerPage,
                  props.totalItems
                )} of ${props.totalItems} items`
              )
            : null,
        ]
      )
    }
  },
})
