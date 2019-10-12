<template>
  <div class="home">
    <Search
      :searchFolder="searchFolder"
      :isLoading="isLoading"
      :canPlayOrExport="canPlayOrExport"
      @selectSearchFolder="selectSearchFolder"
      @inputSearchFolder="inputSearchFolder"
      @search="search"
      @searchBySql="searchBySql"
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

const handleRespose = (that) => {
  return (data) => {
    let msg = data.msg || data;
    if (data && Array.isArray(data.images)) {
      that.outputData = data.images.map((d) => {
        return { sn: that.$getImgPath(d.n), ...d };
      });
      if (that.outputData.length > 0) that.canPlayOrExport = true;
      else msg = data.msg + '查询结果为空';
    } else {
      msg = msg || '未知错误';
    }
    if (msg !== 'success') {
      that.$notify({
        title: '提示',
        message: msg,
        duration: 1500,
      });
    }
    that.isLoading = false;
  };
};

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
      const thenFunc = handleRespose(this);
      service.search(temp).then(thenFunc).catch(err => {
        console.log(err);
      });
    },
    searchBySql (sql) {
      this.isLoading = true;
      this.selectedIndex = -1;
      const thenFunc = handleRespose(this);
      service.searchBySql({ sql }).then(thenFunc).catch(err => {
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
