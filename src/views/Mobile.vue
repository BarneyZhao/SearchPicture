<template>
  <div class="mobile">
    <div class="header" v-if="!isComicMode">
      <div @click="picGrid(1)" :class="{'grid-selected': gridMode === 1}">
        <i class="el-icon-picture"></i>
      </div>
      <div @click="picGrid(2)" :class="{'grid-selected': gridMode === 2}">
        <i class="el-icon-menu"></i>
      </div>
      <div @click="picGrid(4)" :class="{'grid-selected': gridMode === 4}">
        <i class="el-icon-s-grid"></i>
      </div>
      <div @click="loadPics">
        <i class="el-icon-refresh"></i>
      </div>
    </div>
    <div class="row container">
        <div :class="colClass" class="thumbnails" :style="colStyle" v-for="(item, index) in items" :key="index">
            <img v-lazy="item.src" @click="changeGallery(true, index)">
        </div>
    </div>
    <div class="refresh-link" v-if="!isComicMode">
      <div @click="loadPics"><i class="el-icon-refresh"></i>刷新</div>
    </div>
    <div v-if="isComicMode" class="comic-mode-placeholder"></div>
    <!-- absolute doc -->
    <div class="gesture-zone" ref="gesture" v-if="isComicMode"></div>
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
import AlloyFinger from 'alloyfinger';
import service from '../services/mobileService';
import PhotoSwipe from '../components/PhotoSwipe';
import * as softTime from '../utils/softTime';
import storage from '../utils/storage';

let storageData = [];
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
      items: [],
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
      isComicMode: false,
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
    this.isComicMode = this.$route.query.mode === '1';
    const that = this;
    this.$Lazyload.$on('loaded', ({ el }) => {
      const time = that.gridMode === 4 ? 10 : 30;
      softTime.addTimeQueue(() => { el.style.opacity = 1; }, time);
    });
    storageData = storage.local.get('outputData') || [];
    if (
      storageData.length !== 0 &&
      (storageData.every(s => s.w && s.h) || this.isComicMode)
    ) {
      this.items = storageData.map((d) => {
        return { src: this.$getImgPath(d.n), title: d.n, ...d };
      });
    } else {
      this.loadPics();
    }
  },
  mounted () {
    if (this.isComicMode) {
      const that = this;
      new AlloyFinger(this.$refs.gesture, {
        swipe (evt) {
          if (evt.direction === 'Right') that.$router.back();
        }
      });
    }
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
          storage.local.set('outputData', data.images);
          this.items = data.images.map((d) => {
            return { src: this.$getImgPath(d.n), title: d.n, ...d };
          });
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
      if (this.isComicMode) {
        this.$message({
          message: `${index + 1}/${this.items.length}`,
          duration: 1000,
          center: true,
          iconClass: 'no-icon',
          customClass: 'note-count-color',
        });
        return;
      }
      this.psOptions.index = index;
      this.$nextTick(() => {
        this.psVisible = val;
      });
    },
    markPic (item, flag) {
      if (!item.id) return;
      const message = flag === 1 ? `Like` : `Dislike`;
      service.likeOrDislike({ id: item.id, flag }).then(data => {
        if (data && data.success) {
          this.$message({
            message,
            duration: 1000,
            center: true,
            iconClass: 'no-icon',
            customClass: 'note-count-color',
            offset: 40,
          });
        } else {
          this.$message.error('something wrong!');
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
.header div {
  display: inline-block;
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  font-size: 15px;
}
.header div.grid-selected {
  color: #409EFF;
}
.container {
  align-content: flex-start;
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
.refresh-link div {
  display: inline-block;
  text-decoration: none;
  color: #409EFF;
  padding: 15px 20px;
}
.comic-mode-placeholder {
  height: 40vh;
}
.gesture-zone {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 20vw;
  z-index: 2;
}
</style>
