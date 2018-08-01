<template>
  <div>
    <input type="text" v-model="number" @keyup="handleKeyUp" :class="className" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: ''
    }
  },
  /* 最小值，最大值，是否允许小数，允许小数的话 */
  props: ['min', 'max', 'className'],
  methods: {
    handleKeyUp() {
      let regExpNumber = /^([0-9])n+/
      console.log(this.number.match(regExpNumber))
    }
  }
}
</script>


<style scoped>
.input-number {
  border: solid thin #ddd;
  line-height: 20px;
  width: 93px;
  outline: none;
}
</style>

