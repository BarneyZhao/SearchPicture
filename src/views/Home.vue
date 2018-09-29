<template>
  <div class="home">
    <Search
      :service="service"
      @outputData="setOutputData"
      @playButton="imagePlayerTrigger">
    </Search>
    <ImagePlayer
      :imagePlay="imagePlay"
      :outputData="outputData"
      @imagePlayerTrigger="imagePlayerTrigger">
    </ImagePlayer>
  </div>
</template>

<script>
import service from '@/services/homeService.js';
import ImagePlayer from '@/components/ImagePlayer';
import Search from '@/components/Search';

export default {
  name: 'Home',
  components: {
    ImagePlayer,
    Search,
  },
  data () {
    return {
      service,
      outputData: null,
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
  min-width: 800px;
}
</style>
