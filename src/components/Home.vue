<template>
  <div class="home">
    <el-container>
      <el-aside>
        <div class="setting">
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
      </el-aside>
      <el-main>
        <el-form label-width="100px">
          <el-form-item label="搜索文件夹">
            <el-input
              v-model="form.inputFolder"
              placeholder="路径"
              class="folderInput"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="输出文件夹">
            <el-input
              v-model="form.outputFolder"
              placeholder="路径"
              class="folderInput"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button class="submitButton" @click="search" :loading="isLoading">
              {{isLoading ? '运行中' : '开始'}}
            </el-button>
          </el-form-item>
        </el-form>
        <div>查询结果:{{outputData.length}}</div>
        <div class="outputText">{{outputData}}</div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      form: {
        inputFolder: '/Users/barneyzhao/local-web-server',
        outputFolder: '',
        w: '',
        h: '',
        rh: '',
        rw: '',
      },
      isLoading: false,
      outputData: '',
    };
  },
  methods: {
    search() {
      this.isLoading = true;
      const config = {
        params: this.form,
      };
      axios.get('/search', config).then((res) => {
        this.outputData = res.data;
        this.isLoading = false;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  padding: 20px;
}
.el-main {
  padding: 0 0 0 20px;
}
.ratioInput {
  width: 45%;
}
.submitButton {
  width: 150px;;
}
.outputText {
  height: 600px;
  overflow-y: auto;
}
</style>
