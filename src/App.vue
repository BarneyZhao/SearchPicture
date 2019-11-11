<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="Folder">
          <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'fold-left',
    };
  },
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
  watch: {
    '$route' (to, from) {
      if (from.path === '/') this.transitionName = '';
      else if (to.name === 'mobile') this.transitionName = 'fold-left';
      else if (to.name === 'folder') this.transitionName = 'fold-right';
    },
  },
};
</script>

<style>
#app {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.note-count-color p {
  color: #909399;
}
.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: .3s;
  position: absolute;
  top: 0;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: .3s;
}
.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: .3s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: .3s;
  position: absolute;
}
@keyframes fold-left-in {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes fold-right-in {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-right-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
