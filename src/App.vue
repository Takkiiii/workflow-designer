<template>
  <div id="app">
    <workflow-container :scene="scene" @nodeClick="nodeClick" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WorkflowContainer from "./components/WorkflowContainer.vue";
import Node from './data/node';
export default Vue.extend({
  name: "HelloWorld",
  components: { WorkflowContainer },
  data() {
    return {
      scene: {
        centerX: 1024,
        centerY: 140,
        scale: 1,
        nodes: [
          {
            id: "aaaa",
            pos_x: -700,
            pos_y: -69,
            type: "Action",
            label: "test1"
          },
          {
            id: "bbbb",
            pos_x: -357,
            pos_y: 80,
            type: "Script",
            label: "test2"
          },
          {
            id: "cccc",
            pos_x: -557,
            pos_y: 80,
            type: "Rule",
            label: "test3"
          }
        ] as Node[],
        links: [
          {
            id: 3,
            from: 2, // node id the link start
            to: 4 // node id the link end
          }
        ]
      },
      newNodeType: 0,
      newNodeLabel: "",
      nodeCategory: ["rule", "action", "script", "decision", "fork", "join"]
    };
  },
  methods: {
    nodeClick(id: string) : void {
      console.log("node click", id);
    }
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
