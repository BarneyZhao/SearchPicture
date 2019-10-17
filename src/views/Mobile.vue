<template>
  <div class="mobile">
    <div class="row">
        <div class="col-3" v-for="(item, index) in items" :key="index">
            <img class="thumbnails" v-lazy="item.src" @click="changeGallery(true, index)">
        </div>
    </div>
    <template v-if="items.length > 0">
      <PhotoSwipe
        :visible="psVisible"
        :items="items"
        :options="psOptions"
        @close-gallery="changeGallery(false)"
      ></PhotoSwipe>
    </template>
  </div>
</template>

<script>
import service from '../services/mobileService';
import PhotoSwipe from '../components/PhotoSwipe';

const getThumbBoundsFn = (index) => {
  const thumbnail = document.querySelectorAll('.thumbnails')[index];
  const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
  const rect = thumbnail.getBoundingClientRect();
  return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
};

export default {
  name: 'Mobile',
  components: { PhotoSwipe },
  data () {
    return {
      items: [],
      clickImgIndex: -1,
      psOptions: {
        index: 0,
        history: false,
        getThumbBoundsFn,
        showHideOpacity: true,
      },
      psVisible: false,
    };
  },
  created () {
    const min = 1;
    const max = 7942;
    const idIndex = parseInt(Math.random() * (max - min + 1) + min, 10);
    service.searchBySql({
      sql: `where ${idIndex} < id and id < ${idIndex + 30}`,
    }).then(data => {
      if (data && Array.isArray(data.images)) {
        this.items = data.images.map((d) => {
          return { src: this.$getImgPath(d.n), ...d };
        });
      }
    });
  },
  methods: {
    changeGallery (val, index = -1) {
      this.psOptions.index = index;
      this.$nextTick(() => {
        this.psVisible = val;
      });
    },
  },
};
</script>
<style scoped>
.mobile {
    background-color: black;
    min-height: 100vh;
}
.row {
    padding: 1px;
}
.col-3 {
    padding: 1px;
    height: calc(25vw - 0.5px);
}
.thumbnails {
    vertical-align: middle;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
