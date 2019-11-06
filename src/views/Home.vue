<template>
  <div class="home row">
    <div class="stick-left-bar">
      <div class="bar">
        <div class="icon" @click="openDrawer">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <template v-for="(icon, index) in iconList">
          <div class="icon" :key="index" @click="barIconClick(icon.func)">
            <i :class="icon.class"></i>
          </div>
        </template>
      </div>
    </div>
    <div class="flex-1">
      <FileDisplay
        :outputData="outputData"
        @contextMenuClick="contextMenuClick"
        @toggleActBar="toggleActBar"
      ></FileDisplay>
    </div>
    <el-drawer
      :visible.sync="drawerVisible"
      :show-close="false"
      size="320px"
      direction="ltr"
    >
      <div class="drawer-close" @click="drawerVisible = false;">
        <i class="el-icon-d-arrow-left"></i>
      </div>
      <SearchDrawer
        :searchFolder="searchFolder"
        :isLoading="isLoading"
        :iconList="iconList"
        @selectSearchFolder="selectSearchFolder"
        @inputSearchFolder="inputSearchFolder"
        @barIconClick="barIconClick"
        @search="search"
      ></SearchDrawer>
    </el-drawer>
    <el-dialog title="自定义查询" :visible.sync="dialogSqlVisible">
      <div class="row align-items-center">
        <el-radio v-model="dialogSqlForm.customerQuery" label="1">输入</el-radio>
        <el-input
          v-model="dialogSqlForm.sqlCondition"
          placeholder="输入sql条件"
          class="flex-1"
          :disabled="dialogSqlForm.customerQuery === '2'"
          clearable
        ></el-input>
      </div>
      <br>
      <div class="row align-items-center">
        <el-radio v-model="dialogSqlForm.customerQuery" label="2">随机</el-radio>
        <el-input
          v-model.number="dialogSqlForm.sqlLimit"
          placeholder="输入随机数量"
          class="flex-1"
          :disabled="dialogSqlForm.customerQuery === '1'"
          clearable
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSqlVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSqlVisible = false;customerSearch()">确 定</el-button>
      </div>
    </el-dialog>
    <ImagePlayer
      :imagePlay="imagePlay"
      :outputData="outputData"
      @imagePlayerTrigger="imagePlayerTrigger"
    ></ImagePlayer>
  </div>
</template>

<script>
import service from '@/services/homeService';
import SearchDrawer from '@/components/SearchDrawer';
import ImagePlayer from '@/components/ImagePlayer';
import FileDisplay from '@/components/FileDisplay';
import storage from '../utils/storage';

const storageData = storage.local.get('outputData') || [];
const {
  customerQuery = '1',
  sqlCondition = '',
  sqlLimit = 40,
} = storage.local.get('outputData') || {};
const handleRespose = (that) => {
  return (data) => {
    let msg = data.msg || data;
    if (data && Array.isArray(data.images)) {
      storage.local.set('outputData', data.images);
      that.outputData = data.images.map((d) => {
        return { src: that.$getImgPath(d.n), showActionBar: false, ...d };
      });
      if (that.outputData.length === 0) msg = data.msg + '查询结果为空';
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
    that.drawerVisible = false;
  };
};

export default {
  name: 'Home',
  components: {
    ImagePlayer,
    SearchDrawer,
    FileDisplay,
  },
  data () {
    const {
      conditionType,
      width, height,
    } = storage.local.get('search_form') || {};
    return {
      searchFolder: storage.local.get('searchFolder') || '',
      outputData: [],
      isLoading: false,
      drawerVisible: false,
      imagePlay: false,
      nowConditions: {
        conditionType,
        width,
        height,
      }, // for export folder name
      iconList: [
        {
          class: 'el-icon-edit',
          desc: '自定义sql',
          func: 'openSqlDialog',
        },
        {
          class: 'el-icon-full-screen',
          desc: '切换全屏',
          func: 'toggleFullscreen',
        },
        {
          class: 'el-icon-video-play',
          desc: '播放图片',
          func: 'imagePlayerTrigger',
        },
        {
          class: 'el-icon-folder-opened',
          desc: '导出到文件夹',
          func: 'exportTo',
        }
      ],
      dialogSqlVisible: false,
      dialogSqlForm: {
        customerQuery,
        sqlCondition,
        sqlLimit,
      },
    };
  },
  computed: {
    canPlayOrExport () {
      return this.outputData.length > 0;
    },
  },
  created () {
    if (storageData.length !== 0 && storageData.every(s => s.w && s.h)) {
      this.outputData = storageData.map((d) => {
        return { src: this.$getImgPath(d.n), ...d };
      });
    }
  },
  methods: {
    openDrawer () {
      this.drawerVisible = true;
    },
    barIconClick (func) {
      this[func]() && (this.drawerVisible = false);
    },
    openSqlDialog () {
      this.dialogSqlVisible = true;
    },
    toggleFullscreen () {
      if (!this.$IS_E_NOTIFY()) return;
      service.toggleFullscreen();
    },
    imagePlayerTrigger () {
      if (!this.canPlayOrExport) return;
      this.imagePlay = !this.imagePlay;
      return true;
    },
    exportTo () {
      if (!this.canPlayOrExport || !this.$IS_E_NOTIFY()) return;
      const conditions = Object.entries(this.nowConditions).map(([k, v]) => v || 0);
      service.selectFolder('save', conditions.join('-')).then((data) => {
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
      const {
        conditionType,
        width,
        height,
      } = params;
      this.nowConditions = {
        conditionType,
        width,
        height,
      };
      let temp = Object.assign({
        searchFolder: this.searchFolder
      }, params);
      const thenFunc = handleRespose(this);
      storage.local.set('searchFolder', this.searchFolder);
      service.search(temp).then(thenFunc).catch(console.log);
    },
    customerSearch () {
      this.isLoading = true;
      const thenFunc = handleRespose(this);
      storage.local.set('dialogSqlForm', this.dialogSqlForm);
      const { sqlCondition: sql, sqlLimit: limit } = this.dialogSqlForm;
      if (this.dialogSqlForm.customerQuery === '1') {
        service.searchBySql({ sql }).then(thenFunc).catch(console.log);
      } else {
        service.searchByRandom({ limit }).then(thenFunc).catch(console.log);
      }
    },
    // FileDisplay.vue emit
    contextMenuClick (item) {
      if (!this.$IS_E) return;
      service.showContextMenu(item);
    },
    toggleActBar (index, flag) {
      const newObj = this.outputData[index];
      newObj.showActionBar = flag;
      this.outputData.splice(index, 1, newObj);
    },
  },
};
</script>

<style scoped>
.stick-left-bar {
  width: 40px;
}
.stick-left-bar .bar {
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 40px;
  text-align: center;
  border-right: 1px solid #F2F6FC;
}
.stick-left-bar .bar .icon {
  font-size: 18px;
  font-weight: bold;
  padding: 12px 0;
  color: #C0C4CC;
  cursor: pointer;
}
.stick-left-bar .bar .icon:hover {
  background-color: #f0fcff;
}
.drawer-close {
  position: absolute;
  right: 20px;
  top: 12px;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  color: #C0C4CC;
}
</style>
