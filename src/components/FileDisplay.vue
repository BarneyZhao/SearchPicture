<template>
  <div class="fileDisplay">
    <div class="displaySetting">
      <el-radio v-model="displayType" label="tile">平铺</el-radio>
      <el-radio v-model="displayType" label="list">列表</el-radio>
    </div>
    <div class="line"></div>
    <div class="row" v-show="displayType === 'list'">
      <div class="window files col" ref="scrollBody">
        <div class="file" :class="{'selected': selectedIndex === index}"
          v-for="(file, index) in outputData" :key="index" @click="fileClick(index)"
          @contextmenu="fileClick(index, file)">
          {{getFilePath(file.n)}}
        </div>
      </div>
      <div class="window image col">
        <ImagePreview v-if="outputData && selectedIndex !== -1" :imgObj="outputData[selectedIndex]"></ImagePreview>
      </div>
    </div>
    <div class="row" v-show="displayType === 'tile'">
      <div class="window mini_files col row justify-content-between">
        <div class="mini_file col" :class="{'selected': selectedIndex === index}"
          v-for="(file, index) in outputData" :key="file.n" @click="fileClick(index)"
          @contextmenu="fileClick(index, file)">
          <img v-lazy="file.sn" draggable="false">
        </div>
        <div class="mini_file_placeholder col" v-for="i in placeholderCount" :key="'mfp'+i"></div>
      </div>
    </div>
    <div class="image_preview" v-show="isShowPreview" v-if="previewImage">
      <ImagePreview :imgObj="previewImage"></ImagePreview>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash';
import ImagePreview from '@/components/ImagePreview';
export default {
  name: 'FileDisplay',
  components: {
    ImagePreview,
  },
  props: ['searchFolder', 'outputData', 'selectedIndex'],
  data () {
    return {
      displayType: 'tile',
      scrollVal: 0,
      placeholderCount: 20,
      isShowPreview: false,
      previewImage: null,
    };
  },
  mounted () {
    let vm = this;
    document.addEventListener('keydown', (e) => {
      // let dir;
      // if (e.keyCode === 37 || e.keyCode === 38) dir = '-';
      // if (e.keyCode === 39 || e.keyCode === 40) dir = '+';
      // if (dir) {
      //   if (dir === '-' && vm.selectedIndex > 0) {
      //     vm.selectedIndex -= 1;
      //   }
      //   if (dir === '+' && vm.selectedIndex < vm.outputData.length - 1) {
      //     vm.selectedIndex += 1;
      //   }
      // }
      // vm.$nextTick(() => {
      //   let pos = document.getElementsByClassName('selected')[0].getBoundingClientRect();
      //   let viewWindow = window.innerHeight - 15;
      //   if (dir === '+' && pos.bottom > viewWindow) {
      //     vm.scrollVal += pos.bottom - viewWindow;
      //     vm.$refs.scrollBody.scrollTop = vm.scrollVal;
      //   }
      // });
      if (e.keyCode === 32 && vm.selectedIndex > -1) {
        console.log('show:', vm.outputData[vm.selectedIndex]);
        vm.isShowPreview = !vm.isShowPreview;
        if (vm.isShowPreview) {
          vm.previewImage = vm.outputData[vm.selectedIndex];
        } else {
          vm.previewImage = null;
        }
      }
      e.preventDefault();
      e.stopPropagation();
    });
    // this.$refs.scrollBody.addEventListener('scroll', _.debounce(() => {
    //   vm.scrollVal = document.getElementsByClassName('files')[0].scrollTop;
    // }, 300));
  },
  methods: {
    fileClick (index, item) {
      this.$emit('fileClick', index);
      if (item) this.$emit('contextMenuClick', item);
    },
    getFilePath (name) {
      return name.replace(this.searchFolder, '');
    },
    getFileName (name) {
      return name.slice(name.lastIndexOf('/') + 1);
    },
  },
};
</script>

<style scoped>
.displaySetting {
  background-color: #fff;
  padding: 5px 0;
  z-index: 2;
}
.window {
  height: calc(100vh - 184px);
}
.files {
  overflow-y: auto;
  -webkit-flex: 0 0 400px;
  -ms-flex: 0 0 400px;
  flex: 0 0 400px;
  width: 400px;
  max-width: 400px;
  margin-left: -15px;
}
.file {
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 2px;
}
.file:hover:not(.selected) {
  background-color: #f0fcff;
}
.image {
  padding-left: 10px;
  border-left: 1px solid #f0f0f0;
}

.mini_files {
  overflow-y: auto;
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
.mini_file img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
.mini_file:hover:not(.selected) {
  background-color: #f0fcff;
}
.selected {
  background-color: #e3f9fd;
}
.mini_file_placeholder {
  height: 1px;
  -webkit-flex: 0 0 150px;
  -ms-flex: 0 0 150px;
  flex: 0 0 150px;
  width: 150px;
  max-width: 150px;
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
</style>
