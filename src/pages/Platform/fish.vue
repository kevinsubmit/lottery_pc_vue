<template>
  <div>
    <component v-bind:is="currentFishComponent"></component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentFishComponent: this.$getApiName == "sd" ? "sd-fish-game" : "fish-game"
      //  currentFishComponent: "fish-game"
    };
  }
};
</script>

<style>

</style>
