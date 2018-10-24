<template>
  <div class="row preview">
    <div class="image_pic col" @click="imgClick">
      <img :src="imgObj.sn" draggable="false">
    </div>
    <div class="image_desc col">
      <div>{{getFileName(imgObj.n)}}</div>
      <div>{{`${imgObj.w}x${imgObj.h}`}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: ['imgObj'],
  data () {
    return {
      //
    };
  },
  methods: {
    getFileName (name) {
      return name.slice(name.lastIndexOf('/') + 1);
    },
    imgClick () {
      this.$emit('imgClick');
    },
  },
};
</script>

<style scoped>
.preview {
  height: 100%;
  flex-direction: column;
}
.image_pic {
  padding: 10px 0;
}
.image_pic img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
.image_desc {
  -webkit-flex: 0 0 60px;
  -ms-flex: 0 0 60px;
  flex: 0 0 60px;
  height: 60px;
  max-height: 60px;
  line-height: 22px;
  text-align: center;
}
</style>
