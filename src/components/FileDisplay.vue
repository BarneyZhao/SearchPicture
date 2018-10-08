<template>
  <div class="fileDisplay row">
    <!-- <div class="window files col" ref="scrollBody">
      <div class="file" :class="{'selected': selectedIndex === index}"
        v-for="(file, index) in outputData" :key="index" @click="fileClick(index)">
        {{file.n}}
      </div>
    </div>
    <div class="window image col" >
      <img v-if="outputData && selectedIndex !== -1"
        :src="outputData[selectedIndex].n">
      <img v-else src="../assets/logo.png">
    </div> -->
    <div class="window mini_files col row justify-content-between" ref="mfWindow">
      <div class="mini_file col" :class="{'selected': selectedIndex === index}"
        v-for="(file, index) in outputData" :key="index" @click="fileClick(index)">
        <img :src="file.n">
        <!-- <img src="../assets/logo.png"> -->
        <!-- <div>{{getFileName(file.n)}}</div> -->
      </div>
      <div class="mini_file_placeholder col" v-for="i in placeholderCount" :key="'mfp'+i"></div>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash';
export default {
  name: 'FileDisplay',
  props: ['outputData'],
  data () {
    return {
      selectedIndex: -1,
      // scrollVal: 0,
      placeholderCount: 0,
    };
  },
  mounted () {
    let vm = this;
    // document.addEventListener('keydown', (e) => {
    //   let dir;
    //   if (e.keyCode === 37 || e.keyCode === 38) dir = '-';
    //   if (e.keyCode === 39 || e.keyCode === 40) dir = '+';
    //   if (dir) {
    //     if (dir === '-' && vm.selectedIndex > 0) {
    //       vm.selectedIndex -= 1;
    //     }
    //     if (dir === '+' && vm.selectedIndex < vm.outputData.length - 1) {
    //       vm.selectedIndex += 1;
    //     }
    //     e.preventDefault();
    //     e.stopPropagation();
    //   }
    //   vm.$nextTick(() => {
    //     let pos = document.getElementsByClassName('selected')[0].getBoundingClientRect();
    //     let viewWindow = window.innerHeight - 15;
    //     if (dir === '+' && pos.bottom > viewWindow) {
    //       vm.scrollVal += pos.bottom - viewWindow;
    //       vm.$refs.scrollBody.scrollTop = vm.scrollVal;
    //     }
    //   });
    // });
    // this.$refs.scrollBody.addEventListener('scroll', _.debounce(() => {
    //   vm.scrollVal = document.getElementsByClassName('files')[0].scrollTop;
    // }, 300));
    //
    window.addEventListener('resize', () => {
      vm.checkPlaceholder();
    });
    vm.checkPlaceholder();
  },
  methods: {
    fileClick (index) {
      console.log('select', index);
      this.selectedIndex = index;
    },
    getFileName (name) {
      return name.slice(name.lastIndexOf('/') + 1);
    },
    checkPlaceholder () {
      this.placeholderCount = Math.ceil(this.$refs.mfWindow.getBoundingClientRect().width / 150);
    },
  },
};
</script>

<style scoped>
.window {
  height: calc(100vh - 156px);
  padding-top: 15px;
}
.files {
  overflow-y: auto;
  -webkit-flex: 0 0 750px;
  -ms-flex: 0 0 750px;
  flex: 0 0 750px;
  width: 750px;
  max-width: 750px;
}
.file {
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-user-select: none;
}
.file:hover:not(.selected) {
  background-color: #f0fcff;
}
.image {
  padding-left: 10px;
  border-left: 1px solid #f0f0f0;
}
.image img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.mini_files {
  overflow-y: auto;
}
.mini_file, .mini_file_placeholder {
  padding: 3px;
  height: 150px;
  -webkit-flex: 0 0 150px;
  -ms-flex: 0 0 150px;
  flex: 0 0 150px;
  width: 150px;
  max-width: 150px;
}
.mini_file img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.mini_file:hover:not(.selected) {
  background-color: #f0fcff;
}
.selected {
  background-color: #e3f9fd;
}
</style>
