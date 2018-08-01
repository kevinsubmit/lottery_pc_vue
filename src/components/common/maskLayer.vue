<template>
  <div class="overlay">
    <slot></slot>
  </div>
</template>


<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 66;
  left: 0;
  top: 0;
  transition: all ease 0.8s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}
</style>
