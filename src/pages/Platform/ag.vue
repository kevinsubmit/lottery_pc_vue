<template>
  <div>
    <component v-bind:is="currentAgComponent"></component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 咱不上线，注释掉
      currentAgComponent: this.$getApiName == "sd" ? "sd-ag-game" : "ag-game"
      // currentAgComponent: "ag-game"
    };
  }
};
</script>

<style>

</style>
