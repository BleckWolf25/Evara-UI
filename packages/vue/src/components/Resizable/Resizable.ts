/**
 * @file Resizable.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Resizable drag handle panel layout component.
 *
 * @description
 * Renders resizable containers with interactive drag handles (n, s, e, w, ne, nw, se, sw) and min/max width/height constraints.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, ref, type PropType } from 'vue'
import { ResizableController, type ResizeHandle } from '@evara-ui/core'
import './Resizable.css'

// ---------- COMPONENTS

// ---------- VUE RESIZABLE COMPONENT
export const Resizable = defineComponent({
  name: 'Resizable',
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 200,
    },
    minWidth: {
      type: Number,
      default: undefined,
    },
    maxWidth: {
      type: Number,
      default: undefined,
    },
    minHeight: {
      type: Number,
      default: undefined,
    },
    maxHeight: {
      type: Number,
      default: undefined,
    },
    handles: {
      type: Array as PropType<ResizeHandle[]>,
      default: () => ['se'],
    },
  },
  emits: ['resize', 'resizeStart', 'resizeEnd', 'update:width', 'update:height'],
  setup(props, { slots, emit, attrs }) {
    // ---------- REACTIVE STATE AND REFS
    const currentWidth = ref(props.width)
    const currentHeight = ref(props.height)
    const startPos = ref({ x: 0, y: 0 })
    const startSize = ref({ width: 0, height: 0 })

    // ---------- MOUSE DOWN DRAG INITIATION HANDLER
    const handleMouseDown = (handle: ResizeHandle, e: MouseEvent, controller: ResizableController) => {
      e.preventDefault()
      e.stopPropagation()

      startPos.value = { x: e.clientX, y: e.clientY }
      startSize.value = { width: currentWidth.value, height: currentHeight.value }

      emit('resizeStart')

      // ---------- MOUSE MOVE DRAG HANDLER
      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startPos.value.x
        const deltaY = moveEvent.clientY - startPos.value.y

        let newWidth = startSize.value.width
        let newHeight = startSize.value.height

        if (handle.includes('e')) newWidth += deltaX
        if (handle.includes('w')) newWidth -= deltaX
        if (handle.includes('s')) newHeight += deltaY
        if (handle.includes('n')) newHeight -= deltaY

        newWidth = controller.constrainWidth(newWidth)
        newHeight = controller.constrainHeight(newHeight)

        currentWidth.value = newWidth
        currentHeight.value = newHeight

        emit('resize', { width: newWidth, height: newHeight })
        emit('update:width', newWidth)
        emit('update:height', newHeight)
      }

      // ---------- MOUSE UP DRAG END HANDLER
      const handleMouseUp = () => {
        emit('resizeEnd')
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      // ---------- HEADLESS RESIZABLE CONTROLLER INITIALIZATION
      const controller = new ResizableController({
        width: props.width,
        height: props.height,
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
        minHeight: props.minHeight,
        maxHeight: props.maxHeight,
        handles: props.handles,
      })

      return h(
        'div',
        {
          class: [controller.getResizableClasses(), attrs.class],
          style: {
            width: `${currentWidth.value}px`,
            height: `${currentHeight.value}px`,
            position: 'relative',
          },
          ...controller.getAriaAttributes(),
        },
        [
          slots.default?.(),
          ...controller.getHandles().map((handle) =>
            h('div', {
              key: handle,
              class: controller.getHandleClasses(handle),
              onMousedown: (e: MouseEvent) => { handleMouseDown(handle, e, controller); },
              style: { cursor: `${handle}-resize` },
            })
          ),
        ]
      )
    }
  },
})
