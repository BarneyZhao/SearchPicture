<template>
  <div class="imagePlayer" v-show="imagePlay" @click="clickAct">
    <img class="image" draggable="false"
      :style="{'transition': `opacity ${imageTransTime}ms`}"
      v-for="(image, index) in imageList"
      :class="{'image_show': image.isShow}"
      :src="image.src"
      :key="index">
  </div>
</template>

<script>
export default {
  name: 'ImagePlayer',
  props: ['imagePlay', 'outputData'],
  data () {
    return {
      imageList: [],
      imagePlayIndex: 1,
      imagePlayInterval: null,
      imageStayTime: 3000,
      imageTransTime: 500,
    };
  },
  methods: {
    clickAct () {
      this.$emit('imagePlayerTrigger', false);
    },
    intervalFun () {
      this.imagePlayIndex += 1;
      if (this.imagePlayIndex === this.outputData.length) {
        this.imagePlayIndex = 0;
      }
      let nowIndex;
      let nextIndex;
      this.imageList.forEach((image, index) => {
        const imageTemp = image;
        if (imageTemp.isShow) {
          imageTemp.isShow = false;
          nowIndex = index;
        } else {
          nextIndex = index;
        }
      });
      setTimeout(() => {
        this.imageList[nowIndex].src = this.outputData[this.imagePlayIndex].n;
        this.imageList[nextIndex].isShow = true;
      }, this.imageTransTime);
    },
  },
  watch: {
    imagePlay () {
      setTimeout(() => {
        this.imageList[0].isShow = this.imagePlay;
      }, 100);
      if (this.imagePlay) {
        this.imagePlayInterval = setInterval(
          this.intervalFun,
          this.imageStayTime + (this.imageTransTime * 2)
        );
      } else {
        clearInterval(this.imagePlayInterval);
      }
    },
    outputData () {
      this.imageList = [];
      if (this.outputData && Array.isArray(this.outputData)) {
        this.outputData.forEach((image, index) => {
          if (index < 2) {
            this.imageList.push({
              isShow: false,
              src: image.n,
            });
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.imagePlayer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
}
.imagePlayer img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.image {
  opacity: 0;
  z-index: 1;
}
.image_show {
  opacity: 1;
  z-index: 9;
}
</style>
