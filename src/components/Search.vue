<template>
  <div class="row">
    <div class="col conditions">
      <el-form label-width="60px">
        <el-form-item label="宽度">
          <el-input
            v-model.number="form.w"
            placeholder="宽度"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="高度">
          <el-input
            v-model.number="form.h"
            placeholder="高度"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="比例">
          <el-input
            v-model.number="form.rw"
            placeholder="比例的宽度"
            class="ratioInput"
            clearable>
          </el-input>
          <el-input
            v-model.number="form.rh"
            placeholder="比例的高度"
            class="ratioInput"
            clearable>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="col options">
      <el-form label-width="100px">
        <el-form-item label="搜索文件夹">
          <div tabindex="0" class="el-upload el-upload--text">
            <button type="button"
              class="el-button el-button--small"
              @click="triggerInput('inputFolder')">
              <span>选取文件夹</span>
            </button>
            <input id="inputFolder" type="file" name="file"
              class="el-upload__input" webkitdirectory
              @change="fileInputChange('inputFolder')">
          </div>
          <span>&nbsp;{{this.form.inputFolder}}</span>
        </el-form-item>
        <el-form-item label="输出文件夹">
          <div tabindex="0" class="el-upload el-upload--text">
            <button type="button"
              class="el-button el-button--small"
              @click="triggerInput('outputFolder')">
              <span>选取文件夹</span>
            </button>
            <input id="outputFolder" type="file" name="file"
              class="el-upload__input" webkitdirectory
              @change="fileInputChange('outputFolder')">
          </div>
          <span>&nbsp;{{this.form.outputFolder}}</span>
        </el-form-item>
        <el-form-item label="">
          <el-button class="submitButton" @click="search" :loading="isLoading">
            {{isLoading ? '运行中' : '开始'}}
          </el-button>
            &nbsp;
          <el-button
            class="playButton"
            @click="playButton"
            :disabled="!outputData || outputData[0] === 'msg'"
          >播放图片</el-button>
        </el-form-item>
      </el-form>
      <div>查询结果:{{outputData ? outputData.length : ''}}</div>
      <!-- <div>{{form}}</div> -->
      <!-- <div class="outputText">{{outputData}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['service'],
  data () {
    return {
      form: {
        inputFolder: '',
        outputFolder: '',
        w: '1920',
        h: '1080',
        rh: '',
        rw: '',
      },
      isLoading: false,
      outputData: null,
    };
  },
  methods: {
    triggerInput (inputId) {
      document.getElementById(inputId).click();
    },
    fileInputChange (inputId) {
      let el = document.getElementById(inputId);
      if (el.files && el.files[0]) {
        this.form[inputId] = el.files[0].path;
      } else {
        this.form[inputId] = '';
      }
    },
    search () {
      this.isLoading = true;
      this.service.search(this.form).then((data) => {
        if (data && data.length) {
          this.outputData = data;
          this.$emit('outputData', data);
        }
        this.isLoading = false;
      });
    },
    playButton () {
      this.$emit('playButton', true);
    },
  },
};
</script>

<style scoped>
.el-form {
  padding-bottom: 1px;
}
.conditions {
  -webkit-flex: 0 0 300px;
  -ms-flex: 0 0 300px;
  flex: 0 0 300px;
  width: 300px;
  max-width: 300px;
}
.options {
  /* min-width: 800px; */
}
.ratioInput {
  width: 50%;
}
.submitButton {
  width: 150px;;
}
.playButton {
  width: 150px;
}
.outputText {
  height: calc(100vh - 250px);
  overflow-y: auto;
}
</style>
