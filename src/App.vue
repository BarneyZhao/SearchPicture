<template>
  <div id="app">
    <keep-alive include="Folder">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (
      window.location.hash.includes('folder') ||
      window.location.hash.includes('mode=1')
    ) {
      //
    } else if (this.$IS_TOUCH) {
      this.$router.push('/mobile');
    } else {
      this.$router.push('/home');
    }
  },
};
</script>

<style>
.note-count-color p {
  color: #909399;
}
</style>
