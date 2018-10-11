<template>
  <div class="home">
    <Search
      :searchFolder="searchFolder"
      :isLoading="isLoading"
      :canPlayOrExport="canPlayOrExport"
      @selectSearchFolder="selectSearchFolder"
      @search="search"
      @imagePlayerTrigger="imagePlayerTrigger"
      @setFullscreen="setFullscreen"
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
import service from '@/services/homeService.js';
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
    };
  },
  methods: {
    selectSearchFolder () {
      service.selectFolder('open').then((data) => {
        this.searchFolder = '';
        if (data && data.length > 0) this.searchFolder = data[0];
      });
    },
    search (params) {
      this.isLoading = true;
      this.selectedIndex = -1;
      let temp = Object.assign({
        searchFolder: this.searchFolder
      }, params);
      service.search(temp).then((data) => {
        if (data && Array.isArray(data)) {
          this.outputData = data.map((d) => {
            d.n = this.$getImgPath(d.n);
            return d;
          });
          if (data[0] !== 'msg') this.canPlayOrExport = true;
        }
        this.isLoading = false;
      }).catch(err => {
        console.log(err);
      });
    },
    setFullscreen (flag) {
      service.setFullscreen(flag);
    },
    exportTo () {
      service.selectFolder('save').then((data) => {
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
      service.showContextMenu(item);
    },
  },
};
</script>

<style scoped>
.home {
  padding: 15px;
  min-width: 900px;
}
</style>
