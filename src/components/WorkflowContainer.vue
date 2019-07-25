<template>
  <div class="workflow-container"
    @mousemove="handleMove"
    @mouseup="handleUp"
    @mousedown="handleDown"
  >
    <div v-for="(node, index) in scene.nodes" :key="index" :value="index">
      <workflow-node
        v-bind:id="node.id"
        v-bind:label="node.label"
        v-bind:pos_x="node.x"
        v-bind:pos_y="node.y"
        v-bind:type="node.type"
        :options="nodeOptions"
        @nodeSelected="nodeSelected(node.id, $event)"
      ></workflow-node>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.workflow-container {
  height: 800px;
  background-color: gray;
}
</style>

<script lang="ts">
import WorkflowNode from './WorkflowNode.vue'

export default {
  name: 'workflow-container',
  components: { WorkflowNode },
  props: {
    scene: {
      type: Object,
      default () {
        return {
          centerX: 1024,
          scale: 1,
          centerY: 140,
          nodes: [],
          links: []
        }
      }
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      action: {
        linking: false,
        dragging: false,
        scrolling: false,
        selected: 0
      },
      mouse: {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0
      },
      draggingLink: null,
      rootDivOffset: {
        top: 0,
        left: 0
      }
    }
  },
  computed: {
    nodeOptions() : Object {
      return {
        centerY: (this as any).scene.centerY,
        centerX: (this as any).scene.centerX,
        scale: (this as any).scene.scale,
        offsetTop: (this as any).rootDivOffset.top,
        offsetLeft: (this as any).rootDivOffset.left,
        selected: (this as any).action.selected
      }
    }
  },
  methods: {
    nodeSelected (id: String, e: any) {
      (this as any).action.dragging = id;
      (this as any).action.selected = id;
      (this as any).$emit('nodeClick', id);
      (this as any).mouse.lastX =
        e.pageX || e.clientX + document.documentElement.scrollLeft;
      (this as any).mouse.lastY =
        e.pageY || e.clientY + document.documentElement.scrollTop
    },
    handleMove (e: any) {
      if ((this as any).action.linking) {
        [(this as any).mouse.x, (this as any).mouse.y] = (this as any).$datagetMousePosition((this as any).$el, e);
        [(this as any).draggingLink.mx, (this as any).draggingLink.my] = [
          (this as any).mouse.x,
          (this as any).mouse.y
        ]
      }
      if ((this as any).action.dragging) {
        (this as any).mouse.x =
          e.pageX || e.clientX + document.documentElement.scrollLeft;
        (this as any).mouse.y =
          e.pageY || e.clientY + document.documentElement.scrollTop;
        let diffX = (this as any).mouse.x - (this as any).mouse.lastX;
        let diffY = (this as any).mouse.y - (this as any).mouse.lastY;

        ((this as any) as any).mouse.lastX = (this as any).mouse.x;
        (this as any).mouse.lastY = (this as any).mouse.y;
        (this as any).moveSelectedNode(diffX, diffY);
      }
      if ((this as any).action.scrolling) {
        [(this as any).mouse.x, (this as any).mouse.y] = (this as any).getMousePosition((this as any).$el, e);
        let diffX = (this as any).mouse.x - (this as any).mouse.lastX;
        let diffY = (this as any).mouse.y - (this as any).mouse.lastY;

        (this as any).mouse.lastX = (this as any).mouse.x;
        (this as any).mouse.lastY = (this as any).mouse.yl;

        (this as any).scene.centerX += diffX;
        (this as any).scene.centerY += diffY;

        // (this as any).hasDragged = true
      }
    },
    handleUp (e: any) {
      const target = e.target || e.srcElement
      if ((this as any).$el.contains(target)) {
        if (typeof target.className !== 'string' || target.className.indexOf('node-input') < 0) {
          (this as any).draggingLink = null
        }
        if (typeof target.className === 'string' && target.className.indexOf('node-delete') > -1) {
          // console.log('delete2', (this as any).action.dragging);
          (this as any).nodeDelete((this as any).action.dragging)
        }
      }
      (this as any).action.linking = false;
      (this as any).action.dragging = null;
      (this as any).action.scrolling = false;
    },
    handleDown (e: any) {
      const target = e.target || e.srcElement
      // console.log('for scroll', target, e.keyCode, e.which)
      if ((target === (this as any).$el || target.matches('svg, svg *')) && e.which === 1) {
        (this as any).action.scrolling = true;
        [(this as any).mouse.lastX, (this as any).mouse.lastY] = (this as any).getMousePosition((this as any).$el, e);
        (this as any).action.selected = null; // deselectAll
      }
      (this as any).$emit('canvasClick', e)
    },
    moveSelectedNode (dx: number, dy:  number) {
      let index = (this as any).scene.nodes.findIndex((item: any) => {
        return item.id === (this as any).action.dragging
      })
      let left = (this as any).scene.nodes[index].x + dx / (this as any).scene.scale;
      let top = (this as any).scene.nodes[index].y + dy / (this as any).scene.scale;
      (this as any).$set((this as any).scene.nodes, index, Object.assign((this as any).scene.nodes[index], {
        x: left,
        y: top
      }))
    },
    getOffsetRect (element: any) {
      let box = element.getBoundingClientRect()

      let scrollTop = window.pageYOffset
      let scrollLeft = window.pageXOffset

      let top = box.top + scrollTop
      let left = box.left + scrollLeft

      return { top: Math.round(top), left: Math.round(left) }
    },
    getMousePosition (element: any, event: any) {
      let mouseX =
        event.pageX || event.clientX + document.documentElement.scrollLeft
      let mouseY =
        event.pageY || event.clientY + document.documentElement.scrollTop

      let offset = (this as any).getOffsetRect(element)
      let x = mouseX - offset.left
      let y = mouseY - offset.top

      return [x, y]
    }
  }
}
</script>
