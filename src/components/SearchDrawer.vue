<template>
  <div class="searchDrawer">
    <div class="form-container">
      <div class="form-line">
        <el-radio-group v-model="form.conditionType" size="medium">
          <el-radio-button label="pixel" >像素</el-radio-button>
          <el-radio-button label="ratio">比例</el-radio-button>
        </el-radio-group>
        <div class="form-sub-line">
          <el-input
            v-model.number="form.width"
            class="wh-input"
            placeholder="宽"
            clearable
          ></el-input>
          <el-input
            v-model.number="form.height"
            class="wh-input"
            placeholder="高"
            clearable
            style="margin-left:10px;"
          ></el-input>
        </div>
      </div>
      <div class="form-line">
        <template v-if="$IS_E">
          <el-button @click="selectSearchFolder" onfocus="blur()" size="medium">选择文件夹</el-button>
          <div class="folder-path-wrap">&nbsp;{{this.searchFolder}}</div>
        </template>
        <el-radio-group v-model="form.searchFolderType" size="medium" v-else>
          <el-radio-button label="db" >数据库</el-radio-button>
          <el-radio-button label="folder">文件夹路径</el-radio-button>
        </el-radio-group>
        <div class="form-sub-line">
          <transition name="folder-input">
            <div style="overflow:hidden;" v-show="form.searchFolderType === 'folder'">
              <el-input
                v-model="searchFolderTemp"
                @blur="folderTempInputBlur"
                type="textarea"
                placeholder="文件夹路径"
                :autosize="{ minRows: 2}"
                clearable
              ></el-input>
            </div>
          </transition>
        </div>
      </div>
      <div class="form-line" style="text-align:right;">
        <el-button @click="search" onfocus="blur()" icon="el-icon-search" :loading="isLoading" size="medium">
          {{isLoading ? '运行中' : '搜索'}}
        </el-button>
      </div>
    </div>
    <div v-for="(icon, index) in iconList" :key="index" class="icon-line" @click="iconClick(icon.func)">
      <i :class="icon.class"></i><span>{{icon.desc}}</span>
    </div>
  </div>
</template>

<script>
import storage from '../utils/storage';

export default {
  name: 'Search',
  props: ['searchFolder', 'isLoading', 'iconList'],
  data () {
    const {
      conditionType,
      width, height,
    } = storage.local.get('search_form') || {};
    return {
      form: {
        conditionType: conditionType || 'pixel',
        width,
        height,
        searchFolderType: '',
      },
      searchFolderTemp: storage.local.get('searchFolderTemp') || '',
    };
  },
  mounted () {
    if (!this.$IS_E) this.form.searchFolderType = 'db';
  },
  methods: {
    selectSearchFolder () {
      this.$emit('selectSearchFolder');
    },
    folderTempInputBlur () {
      this.$emit('inputSearchFolder', this.searchFolderTemp);
    },
    search () {
      if (this.form.searchFolderType !== 'db' && !this.searchFolder) {
        this.$notify({
          title: '提示',
          message: `请${this.$IS_E ? '选择' : '输入'}要搜索的文件夹`,
          duration: 1500,
        });
        return;
      }
      storage.local.set('search_form', this.form);
      storage.local.set('searchFolderTemp', this.searchFolderTemp);
      this.$emit('search', this.form);
    },
    iconClick (func) {
      this.$emit('barIconClick', func);
    },
  },
};
</script>

<style scoped>
.searchDrawer {
  padding: 0 15px;
}
.form-container {
  margin-bottom: 10px;
}
.form-line:not(:first-child) {
  margin-top: 25px;
}
.folder-path-wrap {
  padding-top: 4px;
  word-wrap: break-word;
}
.form-sub-line {
  padding-top: 15px;
}
.wh-input {
  width: 90px;
}
.folder-input-enter-active {
  animation-name: folder-input-in;
  animation-duration: .3s;
}
.folder-input-leave-active {
  animation-name: folder-input-out;
  animation-duration: .3s;
}
@keyframes folder-input-in {
  0% {
    height: 0;
  }
  100% {
    height: 54px;
  }
}
@keyframes folder-input-out {
  0% {
    height: 54px;
  }
  100% {
    height: 0;
  }
}
.icon-line {
  font-size: 16px;
  padding: 20px 15px;
  margin: 0 -15px;
  cursor: pointer;
}
.icon-line:hover {
  background-color: #f0fcff;
}
.icon-line i {
  font-size: 20px;
  margin-right: 10px;
}
</style>
