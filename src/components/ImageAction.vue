<template>
  <div class="image-action row align-items-center" :style="actionStyle">
    <img src="../assets/thumb-up-line.svg" class="col">
    <img src="../assets/thumb-down-line.svg" class="col">
  </div>
</template>

<script>
export default {
  name: 'ImageAction',
  props: {
    height: {
      type: Number,
      default: 30,
    },
    width: {
      type: String,
      default: '100%',
    },
    top: {
      type: [Number, null],
      default: null,
    },
    right: {
      type: [Number, null],
      default: null,
    },
    bottom: {
      type: [Number, null],
      default: null,
    },
    left: {
      type: [Number, null],
      default: null,
    }
  },
  computed: {
    actionStyle () {
      return {
        height: `${this.height}px`,
        width: this.width,
        top: this.top === null ? '' : `${this.top}px`,
        right: this.right === null ? '' : `${this.right}px`,
        bottom: this.bottom === null ? '' : `${this.bottom}px`,
        left: this.left === null ? '' : `${this.left}px`,
      };
    },
  },
};
</script>

<style>
.image-action {
  background-color: black;
  opacity: 0.4;
  position: absolute;
}
.image-action img {
  vertical-align: middle;
  width: 16px;
  height: 16px;
}
</style>