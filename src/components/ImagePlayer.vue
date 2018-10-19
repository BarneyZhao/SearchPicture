<template>
  <div class="imagePlayer" v-show="imagePlay" @click="clickAct">
    <img class="image" draggable="false"
      :style="{'transition': `opacity ${imageTransTime}ms`}"
      v-for="(image, index) in imageList"
      :class="{'image_show': image.isShow}"
      :src="image.src"
      :key="index">
    <div class="playerController" :class="{'playerController_hover': isShowControllerByClick}">
      <div class="item">
        <i class="el-icon-setting" @click.stop="showSetting"></i>
      </div>
      <div class="item">
        <i class="el-icon-close" @click.stop="closePlayer"></i>
      </div>
    </div>
    <div class="playerSettings" :class="{'playerSetting_show': isShowSetting}">
      <div>
        <span>停留时间&nbsp;</span>
        <el-input-number v-model="imageStayTime"
          :min="1" size="mini" style="width:100px;">
        </el-input-number>
      </div>
      <div class="confirm-button">
        <el-button onfocus="blur()" @click="settingConfirm(true)" size="mini" type="text">确定</el-button>
        <el-button onfocus="blur()" @click="settingConfirm" size="mini" type="text">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePlayer',
  props: ['imagePlay', 'outputData'],
  data () {
    return {
      imageList: [],
      imagePlayIndex: 1,
      imagePlayInterval: null,
      imageStayTime: parseInt(window.localStorage.getItem('image_stay') || 3),
      imageTransTime: 500,
      isShowControllerByClick: false,
      autoFadeTimer: null,
      isShowSetting: false,
    };
  },
  methods: {
    clickAct () {
      let vm = this;
      this.isShowControllerByClick = true;
      clearTimeout(this.autoFadeTimer);
      this.autoFadeTimer = setTimeout(() => {
        vm.isShowControllerByClick = false;
      }, 2000);
    },
    showSetting () {
      this.isShowSetting = !this.isShowSetting;
    },
    closePlayer () {
      this.$emit('imagePlayerTrigger', false);
    },
    settingConfirm (ans) {
      if (ans) {
        window.localStorage.setItem('image_stay', this.imageStayTime);
        clearInterval(this.imagePlayInterval);
        this.imagePlayInterval = setInterval(
          this.intervalFun,
          this.getIntervalTime()
        );
      }
      this.isShowSetting = false;
    },
    intervalFun () {
      this.imagePlayIndex += 1;
      if (this.imagePlayIndex === this.outputData.length) {
        this.imagePlayIndex = 0;
      }
      let nowIndex;
      let nextIndex;
      this.imageList.forEach((image, index) => {
        const imageTemp = image;
        if (imageTemp.isShow) {
          imageTemp.isShow = false;
          nowIndex = index;
        } else {
          nextIndex = index;
        }
      });
      setTimeout(() => {
        this.imageList[nowIndex].src = this.outputData[this.imagePlayIndex].sn;
        this.imageList[nextIndex].isShow = true;
      }, this.imageTransTime);
    },
    getIntervalTime () {
      return this.imageStayTime * 1000 + (this.imageTransTime * 2);
    },
  },
  watch: {
    imagePlay () {
      setTimeout(() => {
        this.imageList[0].isShow = this.imagePlay;
      }, 100);
      if (this.imagePlay) {
        this.imagePlayInterval = setInterval(
          this.intervalFun,
          this.getIntervalTime()
        );
      } else {
        clearInterval(this.imagePlayInterval);
      }
    },
    outputData () {
      this.imageList = [];
      if (this.outputData && Array.isArray(this.outputData)) {
        this.outputData.forEach((image, index) => {
          if (index < 2) {
            this.imageList.push({
              isShow: false,
              src: image.sn,
            });
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.imagePlayer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
}
.imagePlayer img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
}
.image {
  opacity: 0;
  z-index: 1;
}
.image_show {
  opacity: 1;
  z-index: 9;
}
.playerController {
  z-index: 99;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 12px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50px;
  opacity: 0;
  transition: opacity 500ms;
}
.item {
  display: inline-block;
  color: white;
  font-size: 30px;
  margin-right: 25px;
  cursor: pointer;
}
.item:last-child {
  margin-right: 0;
}
.playerSettings {
  z-index: 99;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 12px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 130px;
  opacity: 0;
  transition: opacity 500ms;
  color: white;
  pointer-events: none;
}
.playerSettings >>> .el-input__inner,
.playerSettings >>> .el-input-number__decrease,
.playerSettings >>> .el-input-number__increase {
  background-color: transparent;
  color: white;
}
.playerSettings >>> .el-input__inner:focus,
.playerSettings >>> .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled),
.playerSettings >>> .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
  border-color: #dcdfe6;
}
.confirm-button {
  text-align: center;
  margin-top: 10px;
}
.confirm-button >>> .el-button--text {
  color: white;
  padding: 7px 15px;
}
.playerController:hover,
.playerController_hover,
.playerSetting_show {
  opacity: .8;
  pointer-events: initial;
}
</style>
