<template>
  <div class="home">
    <Search
      :service="service"
      @outputData="setOutputData"
      @playButton="imagePlayerTrigger">
    </Search>
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
      service,
      outputData: [],
      imagePlay: false,
    };
  },
  methods: {
    setOutputData (data) {
      this.outputData = data;
    },
    imagePlayerTrigger (flag) {
      this.imagePlay = flag;
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
