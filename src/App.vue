<template>
  <div id="app">
    <workflow-node
      v-bind:id="node.id"
      v-bind:label="node.label"
      v-bind:x="node.x"
      v-bind:y="node.y"
      v-bind:type="node.type"
    ></workflow-node>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WorkflowNode from "./components/WorkflowNode.vue";

export default Vue.extend({
  name: "app",
  components: {
    WorkflowNode
  },
  data() {
    return {
      node: {
        id: "asaa",
        x: -700,
        y: -69,
        label: "test1",
        type: "transcode"
      },
      action: {
        linking: false,
        dragging: false,
        scrolling: false,
        selected: 0,
      },
      mouse: {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0,
      },
      draggingLink: {
        mx: 0,
        my: 0
      },
      rootDivOffset: {
        top: 0,
        left: 0
      },
    };
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.flowchart-container {
  margin: 0;
  background: #ddd;
  position: relative;
  overflow: hidden;
  svg {
    cursor: grab;
  }
}
</style>
