<template>
  <div class="row search">
    <div class="col conditions">
      <el-form>
        <el-form-item>
          <el-radio v-model="conditionType" label="pixel">像素</el-radio>
          <el-input
            v-model.number="form.w"
            placeholder="宽"
            class="conditionInput"
            :disabled="conditionType !== 'pixel'"
            clearable>
          </el-input>
          <el-input
            v-model.number="form.h"
            placeholder="高"
            class="conditionInput"
            :disabled="conditionType !== 'pixel'"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="conditionType" label="ratio">比例</el-radio>
          <el-input
            v-model.number="form.rw"
            placeholder="宽"
            class="conditionInput"
            :disabled="conditionType !== 'ratio'"
            clearable>
          </el-input>
          <el-input
            v-model.number="form.rh"
            placeholder="高"
            class="conditionInput"
            :disabled="conditionType !== 'ratio'"
            clearable>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="col options">
      <el-form label-width="100px">
        <el-form-item label="搜索文件夹">
          <el-button @click="selectSearchFolder" onfocus="blur()">选取文件夹</el-button>
          <span>&nbsp;{{this.searchFolder}}</span>
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
      conditionType: 'pixel',
      form: {
        w: '1920',
        h: '1080',
        rw: '1',
        rh: '1',
      },
      outputData: null,
    };
  },
  methods: {
    selectSearchFolder () {
      this.$emit('selectSearchFolder');
    },
    search () {
      if (!this.searchFolder) {
        this.$notify({
          title: '提示',
          message: '请选择要搜索的文件夹',
          duration: 1500,
        });
        return;
      }
      let formTemp = Object.assign({}, this.form);
      if (this.conditionType === 'pixel') {
        formTemp.rw = formTemp.rh = '';
      } else {
        formTemp.w = formTemp.h = '';
      }
      this.$emit('search', formTemp);
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
  -webkit-flex: 0 0 242px;
  -ms-flex: 0 0 242px;
  flex: 0 0 242px;
  width: 242px;
  max-width: 242px;
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
