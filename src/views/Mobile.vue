<template>
  <div class="mobile">
    <div class="header">
      <a href="javascript:null;" @click="picGrid(1)" :class="{'grid-selected': gridMode === 1}">
        <i class="el-icon-picture"></i>
      </a>
      <a href="javascript:null;" @click="picGrid(2)" :class="{'grid-selected': gridMode === 2}">
        <i class="el-icon-menu"></i>
      </a>
      <a href="javascript:null;" @click="picGrid(4)" :class="{'grid-selected': gridMode === 4}">
        <i class="el-icon-s-grid"></i>
      </a>
      <a href="javascript:null;" @click="loadPics">
        <i class="el-icon-refresh"></i>
      </a>
    </div>
    <div class="row container">
        <div :class="colClass" class="thumbnails" :style="colStyle" v-for="(item, index) in items" :key="index">
            <img v-lazy="item.src" @click="changeGallery(true, index)">
        </div>
    </div>
    <div class="refresh-link">
      <a href="javascript:null;" @click="loadPics"><i class="el-icon-refresh"></i>刷新</a>
    </div>
    <template v-if="items.length > 0">
      <PhotoSwipe
        :visible="psVisible"
        :items="items"
        :options="psOptions"
        @close-gallery="changeGallery(false)"
        @mark-pic="markPic"
      ></PhotoSwipe>
    </template>
  </div>
</template>

<script>
import service from '../services/mobileService';
import PhotoSwipe from '../components/PhotoSwipe';
import * as softTime from '../utils/softTime';
import storage from '../utils/storage';

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
      gridMode: storage.local.get('gridMode') || 4,
      items: storage.local.get('outputData') || [],
      clickImgIndex: -1,
      psOptions: {
        index: 0,
        history: false,
        loop: false,
        getThumbBoundsFn,
        showHideOpacity: true,
        shareEl: false,
        arrowEl: false,
      },
      psVisible: false,
    };
  },
  computed: {
    colClass () {
      let col = 12 / this.gridMode;
      return `col-${col}`;
    },
    colStyle () {
      let percent = 100 / this.gridMode;
      if (percent === 100) return '';
      return `height: ${percent}vw;`;
    },
  },
  created () {
    let that = this;
    this.$Lazyload.$on('loaded', ({ el }) => {
      const time = that.gridMode === 4 ? 10 : 30;
      softTime.addTimeQueue(() => { el.style.opacity = 1; }, time);
    });
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
      this.items = [];
      softTime.setSoftApply(loading, 'close', 500);
      service.searchByRandom({ limit: 40 }).then(data => {
        if (data && Array.isArray(data.images)) {
          this.items = data.images.map((d) => {
            return { src: this.$getImgPath(d.n), title: d.n, ...d };
          });
          storage.local.set('outputData', this.items);
        }
      }).finally(() => {
        loading.close();
      });
    },
    picGrid (mode) {
      storage.local.set('gridMode', mode);
      this.gridMode = mode;
    },
    changeGallery (val, index = -1) {
      this.psOptions.index = index;
      this.$nextTick(() => {
        this.psVisible = val;
      });
    },
    markPic (path, flag) {
      service.likeOrDislike({ path, flag }).then(data => {
        if (data && data.success) {
          this.$notify({
            offset: 80,
            message: flag === 1 ? 'Like it!' : 'Dislike it!',
            duration: 1500,
          });
        } else {
          this.$notify({
            offset: 80,
            message: 'something wrong!',
            duration: 1500,
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.header {
  text-align: center;
}
.header a {
  display: inline-block;
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  font-size: 15px;
}
.header a.grid-selected {
  color: #409EFF;
}
.container {
  min-height: 100vw;
}
.thumbnails {
  padding: 1px;
}
.thumbnails img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 500ms;
  opacity: .1;
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
