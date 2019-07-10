<template>
  <div id="app">
    <recipe-node
      v-bind:id="node.id"
      v-bind:label="node.label"
      v-bind:x="node.x"
      v-bind:y="node.y"
      v-bind:type="node.type"
    ></recipe-node>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RecipeNode from "./components/RecipeNode.vue";

export default Vue.extend({
  name: "app",
  components: {
    RecipeNode
  },
  data() {
    return {
      node: {
        id: "asaa",
        x: -700,
        y: -69,
        label: "test1",
        type: "transcode"
      }
    };
  }
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
