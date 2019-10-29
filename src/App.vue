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
    if (window.location.hash.includes('folder')) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else if (this.$IS_TOUCH) {
      document.body.style.backgroundColor = 'black';
      this.$router.push('/mobile');
    } else {
      this.$router.push('/home');
    }
  },
};
</script>
<style>

</style>
