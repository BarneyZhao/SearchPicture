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
    <FileDisplay :searchFolder="searchFolder" :outputData="outputData"></FileDisplay>
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
      let temp = Object.assign({
        searchFolder: this.searchFolder
      }, params);
      service.search(temp).then((data) => {
        if (data && data.length) {
          this.outputData = data;
          if (data[0] !== 'msg') this.canPlayOrExport = true;
        }
        this.isLoading = false;
      });
    },
    imagePlayerTrigger (flag) {
      this.imagePlay = flag;
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
  },
};
</script>

<style scoped>
.home {
  padding: 15px;
  min-width: 900px;
}
</style>
