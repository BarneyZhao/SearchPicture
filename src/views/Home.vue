<template>
  <div class="home">
    <Search
      :searchFloder="searchFloder"
      :isLoading="isLoading"
      :canPlay="canPlay"
      @selectSearchFloder="selectSearchFloder"
      @search="search"
      @imagePlayerTrigger="imagePlayerTrigger"
      @setFullscreen="setFullscreen">
    </Search>
    <div class="line"></div>
    <FileDisplay :outputData="outputData"></FileDisplay>
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
      searchFloder: '',
      outputData: [],
      isLoading: false,
      canPlay: false,
      imagePlay: false,
    };
  },
  methods: {
    selectSearchFloder () {
      service.selectSearchFloder().then((data) => {
        this.searchFloder = '';
        if (data && data.length > 0) this.searchFloder = data[0];
      });
    },
    search (params) {
      this.isLoading = true;
      let temp = Object.assign({
        searchFloder: this.searchFloder
      }, params);
      service.search(temp).then((data) => {
        if (data && data.length) {
          this.outputData = data;
          if (data[0] !== 'msg') this.canPlay = true;
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
  },
};
</script>

<style scoped>
.home {
  padding: 15px;
  min-width: 900px;
}
.line {
  border-bottom: 1px solid #f3f4f6;
  box-shadow: 0 1px 5px #f1f1f1;
  margin: 0 -15px;
}
</style>
