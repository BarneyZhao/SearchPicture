<template>
  <div class="folder">
    <div class="row" v-for="(folder, index) in folders" :key="index">
        <div class="col col-4" @click="goViewer(index)">
            <img v-lazy="folder.coverSrc" class="cover">
        </div>
        <div class="col col-8 desc">
          <div class="title">{{getPackName(folder.path)}}</div>
          <div>({{folder.pages}})</div>
          <div>{{folder.key_word}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import service from '../services/folderService';
import storage from '../utils/storage';

const storageData = storage.local.get('folderList') || [];

export default {
  name: 'Folder',
  data () {
    return {
      folders: [],
    };
  },
  async created () {
    let data = [];
    if (storageData.length !== 0) {
      data = storageData;
    } else {
      const res = await service.getFolderList();
      data = res.folders;
    }
    this.folders = data.map(f => {
      return { coverSrc: this.$getImgPath(f.cover), ...f };
    });
  },
  methods: {
    getPackName (path) {
      return path.slice(path.lastIndexOf('/') + 1);
    },
    async goViewer (index) {
      const id = this.folders[index].id;
      const data = await service.getFolderPics({ id });
      storage.local.set('gridMode', 1);
      storage.local.set('outputData', data.images.map(img => ({ n: img.path })));
      this.$router.push('/mobile?mode=1');
    },
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
.desc {
  padding: 10px 10px 10px 15px;
}
.title {
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 10px;
}
</style>
