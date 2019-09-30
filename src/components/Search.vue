<template>
  <div class="row search">
    <div class="col conditions">
      <el-form>
        <el-form-item>
          <el-radio v-model="form.conditionType" label="pixel">像素</el-radio>
          <el-input
            v-model.number="form.w"
            placeholder="宽"
            class="conditionInput"
            :disabled="form.conditionType !== 'pixel'"
            clearable>
          </el-input>
          <el-input
            v-model.number="form.h"
            placeholder="高"
            class="conditionInput"
            :disabled="form.conditionType !== 'pixel'"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="form.conditionType" label="ratio">比例</el-radio>
          <el-input
            v-model.number="form.rw"
            placeholder="宽"
            class="conditionInput"
            :disabled="form.conditionType !== 'ratio'"
            clearable>
          </el-input>
          <el-input
            v-model.number="form.rh"
            placeholder="高"
            class="conditionInput"
            :disabled="form.conditionType !== 'ratio'"
            clearable>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="col options">
      <el-form label-width="100px">
        <el-form-item label="搜索文件夹">
          <template v-if="isE">
            <el-button @click="selectSearchFolder" size="small" onfocus="blur()">选择</el-button>
            <span>&nbsp;{{this.searchFolder}}</span>
          </template>
          <el-input
            v-else
            v-model="searchFolderTemp"
            @blur="folderTempInputBlur"
            placeholder="文件夹路径"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button class="submitButton" @click="search" onfocus="blur()"
            :loading="isLoading">{{isLoading ? '运行中' : '开始'}}</el-button>
          &nbsp;
          <el-button class="fullscreenButton" onfocus="blur()"
            @click="toggleFullscreen">切换全屏</el-button>
          &nbsp;
          <el-button class="playButton" @click="imagePlayerTrigger" onfocus="blur()"
            :disabled="!canPlayOrExport">播放图片</el-button>
          &nbsp;
          <el-button class="exportButton" @click="exportTo" onfocus="blur()"
            :disabled="!canPlayOrExport">导出到文件夹</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['searchFolder', 'isLoading', 'canPlayOrExport'],
  data () {
    return {
      form: {
        conditionType: 'pixel',
        w: '1920',
        h: '1080',
        rw: '16',
        rh: '9',
      },
      searchFolderTemp: '',
      outputData: null,
    };
  },
  computed: {
    isE () {
      return this.$IS_E('slient');
    },
  },
  methods: {
    selectSearchFolder () {
      this.$emit('selectSearchFolder');
    },
    folderTempInputBlur () {
      this.$emit('inputSearchFolder', this.searchFolderTemp);
    },
    search () {
      if (!this.searchFolder) {
        this.$notify({
          title: '提示',
          message: `请${this.isE ? '选择' : '输入'}要搜索的文件夹`,
          duration: 1500,
        });
        return;
      }
      this.$emit('search', this.form);
    },
    imagePlayerTrigger () {
      this.$emit('imagePlayerTrigger', true);
    },
    toggleFullscreen () {
      this.$emit('toggleFullscreen');
    },
    exportTo () {
      this.$emit('exportTo');
    },
  },
};
</script>

<style scoped>
.el-form {
  padding-bottom: 1px;
}
.conditions {
  -webkit-flex: 0 0 290px;
  -ms-flex: 0 0 290px;
  flex: 0 0 290px;
  width: 290px;
  max-width: 290px;
}
.conditionInput {
  margin-left: 5px;
  width: 90px;
}
.submitButton,
.playButton,
.fullscreenButton {
  width: 100px;
}
</style>
