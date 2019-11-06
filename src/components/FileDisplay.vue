<template>
  <div class="fileDisplay">
    <el-tabs v-model="displayType" @tab-click="tabChange" type="card">
      <el-tab-pane name="tile">
        <span slot="label"><i class="el-icon-s-grid"></i>&nbsp;平铺</span>
        <div class="row justify-content-between scroll-window">
          <div class="mini_file col" :class="{'selected': selectedIndex === index}"
            v-for="(file, index) in outputData" :key="file.n"
            @click="selectedIndex = index;"
            @dblclick="togglePreview"
            @contextmenu="fileContextMenu(file)"
            @mouseenter="toggleImageActionBar(index, true)"
            @mouseleave="toggleImageActionBar(index, false)"
          >
            <img v-lazy="file.src" class="tile-img" draggable="false">
            <ImageAction
              v-show="file.showActionBar"
              :id="file.id"
              :height="30"
              :left="0"
              :bottom="0"
            ></ImageAction>
          </div>
          <div class="mini_file_placeholder col" v-for="i in placeholderCount" :key="'mfp'+i"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="list">
        <span slot="label"><i class="el-icon-tickets"></i>&nbsp;列表</span>
        <div class="row">
          <div class="list-files col scroll-window">
            <div class="file" :class="{'selected': selectedIndex === index}"
              v-for="(file, index) in outputData" :key="index"
              @click="selectedIndex = index;"
              @dblclick="togglePreview"
              @contextmenu="fileContextMenu(file)"
            >{{file.n}}</div>
          </div>
          <div class="list-preview col">
            <ImagePreview v-if="outputData && selectedIndex !== -1" :imgObj="outputData[selectedIndex]"></ImagePreview>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="waterfall">
        <span slot="label"><i class="el-icon-picture-outline"></i>&nbsp;瀑布流</span>
        <div class="scroll-window">
          <Waterfall
            ref="waterfallCom"
            :line-gap="200"
            :min-line-gap="200"
            :max-line-gap="300"
          >
            <WaterfallSlot
              class="waterfall-box"
              move-class="waterfall_move-class"
              v-for="(file, index) in outputData" :key="file.n"
              :order="index"
              :width="file.w"
              :height="file.h"
            >
              <img v-lazy="file.src" @click="togglePreview(index)" class="waterfall-img" draggable="false">
            </WaterfallSlot>
          </Waterfall>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 原来的preview -->
    <!-- <div class="image_preview" v-show="isShowPreview" v-if="previewImage">
      <ImagePreview :imgObj="previewImage" @imgClick="togglePreview"></ImagePreview>
    </div> -->
    <div class="el-previewer">
      <el-image
        ref="elpreviewer"
        :preview-src-list="[previewImage && previewImage.src]"
      ></el-image>
    </div>
  </div>
</template>

<script>
import { Waterfall, WaterfallSlot } from 'vue-waterfall';
import ImagePreview from '@/components/ImagePreview';
import ImageAction from '@/components/ImageAction';
import * as softTime from '../utils/softTime';
import storage from '../utils/storage';

export default {
  name: 'FileDisplay',
  components: {
    Waterfall,
    WaterfallSlot,
    ImagePreview,
    ImageAction,
  },
  props: ['outputData'],
  data () {
    return {
      displayType: storage.local.get('displayType') || 'waterfall',
      selectedIndex: -1,
      placeholderCount: 20,
      isShowPreview: false,
      previewImage: null,
    };
  },
  mounted () {
    this.$Lazyload.$on('loaded', ({ el }) => {
      softTime.addTimeQueue(() => { el.style.opacity = 1; }, 1);
    });
    let vm = this;
    document.addEventListener('keydown', (e) => {
      // console.log(e.keyCode);
      switch (e.keyCode) {
        case 32: // 空格键预览
          if (vm.selectedIndex > -1) {
            vm.togglePreview();
            e.preventDefault();
            e.stopPropagation();
          }
          break;
        case 27: // esc键退出预览
          if (vm.isShowPreview) vm.togglePreview();
          break;
      }
    });
  },
  methods: {
    tabChange (tab) {
      storage.local.set('displayType', this.displayType);
      if (this.displayType === 'waterfall') {
        this.$refs.waterfallCom.reflowHandler();
      }
    },
    fileContextMenu (item) {
      this.$emit('contextMenuClick', item);
    },
    togglePreview (index) {
      // 原来的preview
      // this.isShowPreview = !this.isShowPreview;
      // if (this.isShowPreview) {
      //   this.previewImage = this.outputData[this.selectedIndex];
      // } else {
      //   this.previewImage = null;
      // }
      if (index > -1) { // 兼容瀑布流模式下单击事件触发此方法
        this.selectedIndex = index;
      }
      if (!this.$refs.elpreviewer.showViewer) {
        this.previewImage = this.outputData[this.selectedIndex];
        this.$nextTick(() => {
          this.$refs.elpreviewer.clickHandler();
        });
      } else {
        this.$refs.elpreviewer.closeViewer();
        this.previewImage = null;
      }
    },
    toggleImageActionBar (index, flag) {
      this.$emit('toggleActBar', index, flag);
    },
  },
  watch: {
    outputData () {
      this.selectedIndex = -1;
    },
  },
};
</script>

<style>
.el-tabs__header {
  margin-bottom: 4px;
}
</style>
<style scoped>
.scroll-window {
  overflow-y: auto;
  height: calc(100vh - 45px);
  padding-bottom: 10px;
}
.scroll-window::-webkit-scrollbar {
  width: 4px;
  background-color: transparent;
}
.scroll-window::-webkit-scrollbar-button {
  display: none;
}
.scroll-window::-webkit-scrollbar-track {
  display: none;
}
.scroll-window::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color:rgba(0,0,0,.2);
}

.selected {
  background-color: #e3f9fd;
}

.mini_file {
  margin-top: 15px;
  padding: 3px;
  height: 150px;
  -webkit-flex: 0 0 150px;
  -ms-flex: 0 0 150px;
  flex: 0 0 150px;
  width: 150px;
  border-radius: 2px;
}
.mini_file .tile-img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
  transition: opacity 500ms;
  opacity: .1;
}
.mini_file:hover:not(.selected) {
  background-color: #f0fcff;
}
.mini_file_placeholder {
  height: 1px;
  -webkit-flex: 0 0 150px;
  -ms-flex: 0 0 150px;
  flex: 0 0 150px;
  width: 150px;
  max-width: 150px;
}

.list-files {
  -webkit-flex: 0 0 400px;
  -ms-flex: 0 0 400px;
  flex: 0 0 400px;
  width: 400px;
  max-width: 400px;
}
.list-files .file {
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 2px;
}
.list-files .file:hover:not(.selected) {
  background-color: #f0fcff;
}
.list-preview {
  padding-left: 10px;
  border-left: 1px solid #f0f0f0;
}

.waterfall_move-class {
  transition: transform .5s cubic-bezier(.55,0,.1,1);
}
.waterfall-box {
  padding: 1px;
}
.waterfall-img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  transition: opacity 500ms;
  opacity: .1;
}
.image_preview {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  z-index: 9;
  color: white;
}
.el-previewer {
  position: absolute;
  bottom: 0;
  left: -100%;
}
</style>
