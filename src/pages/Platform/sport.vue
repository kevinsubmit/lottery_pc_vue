<template>
  <div>
    <component v-bind:is="currentSportComponent"></component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSportComponent: this.$getApiName == "sd" ? "sd-sport-game" : "sport-game"
      // currentSportComponent: "sport-game"
    };
  }
};
</script>

<style>

</style>
