<template>
  <div class="image-action row align-items-center" :style="actionStyle">
    <div class="col"><img src="../assets/thumb-down-line.svg" @click="markPic(0)"></div>
    <div class="col"><img src="../assets/thumb-up-line.svg" @click="markPic(1)"></div>
  </div>
</template>

<script>
import service from '../services/componentService';

export default {
  name: 'ImageAction',
  props: {
    path: String,
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
  methods: {
    markPic (flag) {
      service.likeOrDislike({ path: this.path, flag }).then(data => {
        if (data && data.success) {
          this.$notify({
            message: flag === 1 ? 'Like it!' : 'Dislike it!',
            duration: 1500,
          });
        } else {
          this.$notify({
            message: 'something wrong!',
            duration: 1500,
          });
        }
      });
    },
  },
};
</script>

<style>
.image-action {
  background-color: black;
  opacity: 0.6;
  position: absolute;
  text-align: center;
}
.image-action img {
  vertical-align: middle;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>