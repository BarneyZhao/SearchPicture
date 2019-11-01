<template>
  <div class="folder">
    <template v-for="(folder, index) in folders">
      <div class="row" :key="index">
          <div class="col col-4" @click="goViewer(index)">
              <img v-lazy="folder.coverSrc" class="cover">
          </div>
          <div class="col col-8 desc-block">
            <div class="desc title" @click="goViewer(index)">
              {{getPackName(folder.path)}}
            </div>
            <div class="desc">
              <span>({{folder.pages}})&nbsp;</span>
              <span v-show="folder.keyword">{{folder.keyword}}&nbsp;</span>
              <i class="icon el-icon-edit-outline" @click="editKeyword(index, folder.keyword)"></i>
            </div>
            <div class="folder-action">
              <img src="../assets/thumb-down-line.svg">
              <img src="../assets/thumb-up-line.svg">
            </div>
          </div>
      </div>
      <div class="divider" :key="`${index}-divider`"></div>
    </template>
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
    async editKeyword (index, keyword) {
      const { value: inputVal } = await this.$msgbox.prompt('请输入关键词', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: keyword,
        showClose: false,
        customClass: 'promptClass',
      }).catch(() => ({}));
      if (inputVal) {
        const res = await service.setFolderKeyword({ id: this.folders[index].id, keyword: inputVal });
        if (res && res.success) {
          this.folders[index].keyword = inputVal;
        }
      }
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
.desc-block {
  padding: 0 10px 0 15px;
}
.desc:not(.title) {
  margin-top: 8px;
}
.title {
  font-size: 16px;
  font-weight: bold;
}
.icon {
  font-size: 18px;
}
.divider:not(:last-child) {
  margin: 10px 0;
  height: 1px;
  background-color: azure;
  opacity: .5;
}
.folder-action {
  position: absolute;
  right: 0;
  bottom: 0;
}
.folder-action img {
  vertical-align: middle;
  width: 26px;
  height: 26px;
  margin-right: 10px;
}
</style>
<style>
.promptClass {
  width: 90%;
}
</style>
