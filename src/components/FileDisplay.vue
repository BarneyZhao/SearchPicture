<template>
  <div class="fileDisplay row">
    <div class="window files col">
      <div class="file" :class="{'selected': selectedIndex === index}"
        v-for="(file, index) in outputData" :key="index"
        @click="fileClick(index)" :alt="file.n">
        {{file.n}}
      </div>
    </div>
    <div class="window image col" >
      <img v-if="outputData && selectedIndex !== -1"
        :src="outputData[selectedIndex].n">
      <img v-else src="../assets/logo.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileDisplay',
  props: ['outputData'],
  data () {
    return {
      selectedIndex: -1,
    };
  },
  methods: {
    fileClick (index) {
      this.selectedIndex = index;
    },
  },
  watch: {
    //
  },
};
</script>

<style scoped>
.window {
  height: calc(100vh - 217px);
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
.selected {
  background-color: #e3f9fd;
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
</style>
