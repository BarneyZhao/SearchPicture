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
          v-for="(file, index) in outputData" :key="index" @click="fileClick(index)">
          {{getFilePath(file.n)}}
        </div>
      </div>
      <div class="window image col row">
        <div class="image_pic col" v-if="outputData && selectedIndex !== -1">
          <img :src="outputData[selectedIndex].n" draggable="false">
        </div>
        <div class="image_desc col" v-if="outputData && selectedIndex !== -1">
          <div>{{getFileName(outputData[selectedIndex].n)}}</div>
          <div>{{`${outputData[selectedIndex].w}x${outputData[selectedIndex].h}`}}</div>
        </div>
      </div>
    </div>
    <div class="row" v-show="displayType === 'tile'">
      <div class="window mini_files col row justify-content-between">
        <div class="mini_file col" :class="{'selected': selectedIndex === index}"
          v-for="(file, index) in outputData" :key="file.n" @click="fileClick(index)"
          @contextmenu="fileClick(index, 'context')">
          <img v-lazy="file.n" draggable="false">
        </div>
        <div class="mini_file_placeholder col" v-for="i in placeholderCount" :key="'mfp'+i"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash';
export default {
  name: 'FileDisplay',
  props: ['searchFolder', 'outputData', 'selectedIndex'],
  data () {
    return {
      displayType: 'tile',
      scrollVal: 0,
      placeholderCount: 20,
    };
  },
  mounted () {
    // let vm = this;
    // document.addEventListener('keydown', (e) => {
    //   let dir;
    //   if (e.keyCode === 37 || e.keyCode === 38) dir = '-';
    //   if (e.keyCode === 39 || e.keyCode === 40) dir = '+';
    //   if (dir) {
    //     if (dir === '-' && vm.selectedIndex > 0) {
    //       vm.selectedIndex -= 1;
    //     }
    //     if (dir === '+' && vm.selectedIndex < vm.outputData.length - 1) {
    //       vm.selectedIndex += 1;
    //     }
    //     e.preventDefault();
    //     e.stopPropagation();
    //   }
    //   vm.$nextTick(() => {
    //     let pos = document.getElementsByClassName('selected')[0].getBoundingClientRect();
    //     let viewWindow = window.innerHeight - 15;
    //     if (dir === '+' && pos.bottom > viewWindow) {
    //       vm.scrollVal += pos.bottom - viewWindow;
    //       vm.$refs.scrollBody.scrollTop = vm.scrollVal;
    //     }
    //   });
    // });
    // this.$refs.scrollBody.addEventListener('scroll', _.debounce(() => {
    //   vm.scrollVal = document.getElementsByClassName('files')[0].scrollTop;
    // }, 300));
  },
  methods: {
    fileClick (index, isContext) {
      this.$emit('fileClick', index);
      if (isContext) this.$emit('contextMenuClick', index);
    },
    getFilePath (name) {
      return name.replace(`/api/image?f=${this.searchFolder}`, '');
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
  -webkit-flex: 0 0 750px;
  -ms-flex: 0 0 750px;
  flex: 0 0 750px;
  width: 750px;
  max-width: 750px;
}
.file {
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file:hover:not(.selected) {
  background-color: #f0fcff;
}
.image {
  padding-left: 10px;
  border-left: 1px solid #f0f0f0;
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
  -webkit-flex: 0 0 100px;
  -ms-flex: 0 0 100px;
  flex: 0 0 100px;
  height: 100px;
  max-height: 100px;
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
  max-width: 150px;
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
</style>
