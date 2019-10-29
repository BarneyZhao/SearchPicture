<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (window.location.hash.includes('folder')) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
      this.$router.push('/folder');
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
