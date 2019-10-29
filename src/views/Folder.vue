<template>
  <div class="folder">
    <div class="row" v-for="(folder, index) in folders" :key="index">
        <div class="col col-4">
            <img v-lazy="folder.coverSrc" class="cover">
        </div>
        <div class="col col-8"></div>
    </div>
  </div>
</template>

<script>
import service from '../services/folderService';

export default {
  name: 'Folder',
  data () {
    return {
      folders: [],
    };
  },
  async created () {
    const data = await service.getFolderList();
    console.log(data);
    this.folders = data.folders.map(f => {
      return { coverSrc: this.$getImgPath(f.cover), ...f };
    });
  },
};
</script>
<style scoped>
.folder .row {
    height: 40vw;
}
.cover {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
</style>
