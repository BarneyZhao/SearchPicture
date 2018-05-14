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
             &nbsp;
            <el-button
              class="playButton"
              @click="imagePlayAct(true)"
              :disabled="!outputData || outputData[0] === 'msg'"
            >播放图片</el-button>
          </el-form-item>
        </el-form>
        <div>查询结果:{{outputData ? outputData.length : ''}}</div>
        <div class="outputText">{{outputData}}</div>
      </el-main>
    </el-container>
    <div class="imagePlayer" v-show="imagePlay" @click="imagePlayAct(false)">
      <img class="image" :class="{'image_show': imageTransform}" :src="getImageSrc">
    </div>
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
      outputData: null,
      imagePlay: false,
      imageTransform: false,
      imagePlayIndex: 0,
      imagePlayInterval: null,
    };
  },
  methods: {
    search() {
      this.isLoading = true;
      this.outputData = null;
      const config = {
        params: this.form,
      };
      axios.get('/r/search', config).then((res) => {
        this.outputData = res.data;
        this.isLoading = false;
      });
    },
    imagePlayAct(flag) {
      this.imagePlay = flag;
      setTimeout(() => {
        this.imageTransform = flag;
      }, 100);
      if (flag) {
        this.imagePlayInterval = setInterval(() => {
          let tempIndex = this.imagePlayIndex + 1;
          if (tempIndex === this.outputData.length) {
            tempIndex = 0;
          } else {
            tempIndex += 1;
          }
          this.imageTransform = false;
          setTimeout(() => {
            this.imagePlayIndex = tempIndex;
            this.imageTransform = true;
          }, 500);
        }, 3000);
      } else {
        clearInterval(this.imagePlayInterval);
      }
    },
  },
  computed: {
    getImageSrc() {
      return this.outputData && this.imagePlayIndex > -1 ? `/r/image?fileName=${this.outputData[this.imagePlayIndex].n}` : '';
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
.playButton {
  width: 150px;
}
.outputText {
  height: calc(100vh - 250px);
  overflow-y: auto;
}
.imagePlayer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
}
.imagePlayer img {
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.image {
  transition: opacity 500ms;
  opacity: 0;
}
.image_show {
  opacity: 1;
}
</style>
