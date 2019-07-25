<template>
  <div class="workflow-node" :style="nodeStyle" @mousedown="handleMousedown" v-bind:class="{selected: options.selected === id}">
    <div class="node-port node-input"></div>
    <div class="node-m1ain">
      <div v-text="type" class="node-type"></div>
      <div v-text="label" class="node-label"></div>
    </div>
    <div class="node-port node-output"></div>
    <div v-show="show.delete" class="node-delete">&times;</div>
  </div>
</template>

<style scoped lang="scss">
$themeColor: rgb(255, 136, 85);
$portSize: 12;

.workflow-node {
  padding: 0.5em 1em;
  margin: 2em 0;
  font-weight: bold;
  border: solid 1px #000000;
  width: 80px;
  height: 80px;
  position: absolute;
  box-sizing: border-box;
  background: white;
  z-index: 1;
  opacity: 0.9;
  cursor: move;
  transform-origin: top left;
  .node-main {
    text-align: center;
    .node-type {
      background: $themeColor;
      color: white;
      font-size: 13px;
      padding: 6px;
    }
    .node-label {
      font-size: 13px;
    }
  }
  .node-port {
    position: absolute;
    width: #{$portSize}px;
    height: #{$portSize}px;
    left: 50%;
    transform: translate(-50%);
    border: 1px solid #ccc;
    border-radius: 100px;
    background: white;
    &:hover {
      background: $themeColor;
      border: 1px solid $themeColor;
    }
  }
  .node-input {
    top: #{-2 + $portSize/-2}px;
  }
  .node-output {
    bottom: #{-2 + $portSize/-2}px;
  }
  .node-delete {
    position: absolute;
    right: -6px;
    top: -6px;
    font-size: 12px;
    width: 12px;
    height: 12px;
    color: $themeColor;
    cursor: pointer;
    background: white;
    border: 1px solid $themeColor;
    border-radius: 100px;
    text-align: center;
    &:hover {
      background: $themeColor;
      color: white;
    }
  }
}
.selected {
  box-shadow: 0 0 0 2px $themeColor;
}
</style>

<script lang="ts">
import Vue, { PropType } from 'vue'
export default {
  name: 'workflow-node',
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    pos_x: {
      type: Number,
      default: 0
    },
    pos_y: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: '',
      required: true
    },
    label: {
      type: String,
      default: '',
      required: true
    },
    options: {
      type: Object as () => Options,
      default: () => ({ centerX: 1024, scale: 1, centerY: 140 })
    }
  },
  data () {
    return {
      show: { delete: false }
    }
  },
  computed: {
    nodeStyle(): Object {
      return {
        top: (this as any).options.centerY + (this as any).pos_y * (this as any).options.scale + 'px', // remove: this.options.offsetTop +
        left: (this as any).options.centerX + (this as any).pos_x * (this as any).options.scale + 'px', // remove: this.options.offsetLeft +
        transform: `scale(${(this as any).options.scale})`
      }
    }
  },
  mounted () {},
  created () {},
  methods: {
    handleMousedown(e: Event) {
      const target =<Element> e.target || e.srcElement;
      if (target.className.indexOf('node-input') < 0 && target.className.indexOf('node-output') < 0) {
        (this as any).$emit('nodeSelected', e)
      }
      e.preventDefault()
    }
  }
}


export interface Options{
  centerX: number
  scale: number
  centerY: number
}

</script>
