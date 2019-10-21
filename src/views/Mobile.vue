<template>
  <div class="mobile">
    <div class="row">
        <div class="col-3" v-for="(item, index) in items" :key="index">
            <img class="thumbnails" v-lazy="item.src" @click="changeGallery(true, index)">
        </div>
    </div>
    <div class="refresh-link">
      <a href="javascript:null;" @click="loadPics">刷新</a>
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
import * as softTime from '../utils/softTime';

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
        shareEl: false,
        arrowEl: false,
      },
      psVisible: false,
    };
  },
  created () {
    this.loadPics();
  },
  methods: {
    loadPics () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      softTime.setSoftApply(loading, 'close', 500);
      service.searchByRandom({ limit: 40 }).then(data => {
        if (data && Array.isArray(data.images)) {
          this.items = data.images.map((d) => {
            return { src: this.$getImgPath(d.n), title: d.n, ...d };
          });
        }
      }).finally(() => {
        loading.close();
      });
    },
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
.refresh-link {
  text-align: center;
  padding: 10px 0;
}
.refresh-link a {
  display: inline-block;
  text-decoration: none;
  color: #409EFF;
  padding: 15px 20px;
}
</style>
