<template>
  <div class="home">
    <Search
      :searchFolder="searchFolder"
      :isLoading="isLoading"
      :canPlayOrExport="canPlayOrExport"
      @selectSearchFolder="selectSearchFolder"
      @inputSearchFolder="inputSearchFolder"
      @search="search"
      @imagePlayerTrigger="imagePlayerTrigger"
      @toggleFullscreen="toggleFullscreen"
      @exportTo="exportTo">
    </Search>
    <div class="line"></div>
    <FileDisplay
      :searchFolder="searchFolder"
      :outputData="outputData"
      :selectedIndex="selectedIndex"
      @fileClick="fileClick"
      @contextMenuClick="contextMenuClick">
    </FileDisplay>
    <ImagePlayer
      :imagePlay="imagePlay"
      :outputData="outputData"
      @imagePlayerTrigger="imagePlayerTrigger">
    </ImagePlayer>
  </div>
</template>

<script>
import service from '@/services/homeService';
import Search from '@/components/Search';
import ImagePlayer from '@/components/ImagePlayer';
import FileDisplay from '@/components/FileDisplay';

export default {
  name: 'Home',
  components: {
    ImagePlayer,
    Search,
    FileDisplay,
  },
  data () {
    return {
      searchFolder: '',
      outputData: [],
      selectedIndex: -1,
      isLoading: false,
      canPlayOrExport: false,
      imagePlay: false,
      nowConditions: {},
    };
  },
  methods: {
    selectSearchFolder () {
      if (!this.$IS_E_NOTIFY()) return;
      service.selectFolder('open').then((data) => {
        this.searchFolder = '';
        if (data && data.length > 0) this.searchFolder = data[0];
      });
    },
    inputSearchFolder (path) {
      this.searchFolder = path;
    },
    search (params) {
      this.isLoading = true;
      this.selectedIndex = -1;
      this.nowConditions = { ...params };
      let temp = Object.assign({
        searchFolder: this.searchFolder
      }, params);
      service.search(temp).then((data) => {
        let msg = data.msg || data;
        if (data && Array.isArray(data.images)) {
          this.outputData = data.images.map((d) => {
            return { sn: this.$getImgPath(d.n), ...d };
          });
          if (this.outputData.length > 0) this.canPlayOrExport = true;
          else msg = data.msg || '查询结果为空';
        } else {
          msg = msg || '未知错误';
        }
        if (msg !== 'success') {
          this.$notify({
            title: '提示',
            message: msg,
            duration: 1500,
          });
        }
        this.isLoading = false;
      }).catch(err => {
        console.log(err);
      });
    },
    toggleFullscreen () {
      if (!this.$IS_E_NOTIFY()) return;
      service.toggleFullscreen();
    },
    exportTo () {
      if (!this.$IS_E_NOTIFY()) return;
      let conditionStr = this.nowConditions.w
        ? this.nowConditions.w + '-' + this.nowConditions.h
        : this.nowConditions.rw + '-' + this.nowConditions.rh;
      service.selectFolder('save', conditionStr).then((data) => {
        if (data && data.length > 0) {
          let params = {
            data: this.outputData,
            folderPath: data,
          };
          service.exportToFolder(params).then(() => {
            this.$notify({
              title: '提示',
              message: '导出成功',
              duration: 1500,
            });
          });
        }
      });
    },
    imagePlayerTrigger (flag) {
      this.imagePlay = flag;
    },
    fileClick (index) {
      this.selectedIndex = index;
    },
    contextMenuClick (item) {
      if (!this.$IS_E) return;
      service.showContextMenu(item);
    },
  },
};
</script>

<style scoped>
.home {
  padding: 15px;
  /* background: linear-gradient(#c9d6ff,#e2e2e2); */
}
</style>
