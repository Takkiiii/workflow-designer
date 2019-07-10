<template>
  <div
    class="recipe-node"
    :style="nodeStyle"
    @onmousedown="onMousedown"
    @onmouseover="onMouseOver"
    @onmouseleave="onMouseLeave"
    v-bind:class="{selected: options.selected === id}"
  >
    <div class="node-port node-input" @onmousedown="onInputMouseDown" @mouseup="onInputMouseUp"></div>
    <div class="node-main">
      <div v-text="type" class="node-type"></div>
      <div v-text="label" class="node-label"></div>
    </div>
    <div class="node-port node-output" @onmousedown="onOutputMouseDown"></div>
    <div v-show="show.delete" class="node-delete">&times;</div>
  </div>
</template>

<style <style lang="scss">
$themeColor: rgb(255, 136, 85);
$portSize: 12;
.recipe-node {
  margin: 0;
  width: 80px;
  height: 80px;
  position: absolute;
  box-sizing: border-box;
  border: none;
  background: white;
  z-index: 1;
  opacity: .9;
  transform-origin: top left;
  .node-main {
    text-align: center;
    .node-type {
      cursor: move;
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
    top: #{-2+$portSize/-2}px;
  }
  .node-output {
    bottom: #{-2+$portSize/-2}px;
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
    &:hover{
      background: $themeColor;
      color: white;
    }
  }
}
</style>>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "recipe-node",
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'Default'
    },
    options: {
      type: Object,
      default: () => ({ centerX: 1024, scale: 1, centerY: 140 })
    }
  },
  computed: {
    nodeStyle(): Object {
      return {
        top: this.options.centerY + this.y * this.options.scale + "px",
        left: this.options.centerX + this.x * this.options.scale + "px",
        transform: `scale(${this.options.scale})`
      };
    }
  },
  data() {
    return {
      show: {
        delete: false,
      }
    }
  },
  methods: {
    onMousedown() {
    },
    onMouseOver() {
    },
    onMouseLeave() {
    },
    outputMouseDown() {
    },
    onInputMouseDown() {
    },
    onInputMouseUp() {
    },
    onOutputMouseDown() {}
  }
});
</script>
