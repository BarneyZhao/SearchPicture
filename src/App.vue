<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (this.$IS_TOUCH) {
      this.$router.push('/mobile');
    } else {
      this.$router.push('/home');
    }
  },
};
</script>
<style>

</style>
