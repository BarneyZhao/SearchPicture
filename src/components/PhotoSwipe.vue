<template>
  <div class="photoSwipe">
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" ref="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- Background of PhotoSwipe.
      It's a separate element as animating opacity is faster than rgba().-->
      <div class="pswp__bg"></div>

      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
        <!-- Container that holds slides.
                PhotoSwipe keeps only 3 of them in the DOM to save memory.
        Don't modify these 3 pswp__item elements, data is added later on.-->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  Controls are self-explanatory. Order can be changed. -->

            <div class="pswp__counter"></div>

            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

            <button class="pswp__button pswp__button--share" title="Share"></button>

            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

            <button class="pswp__button pswp__button--customer" title="Like" @click="markPic(1)">
              <!-- <i class="el-icon-circle-check customer"></i> -->
              <img src="../assets/thumb-up-line.svg" class="customer">
            </button>
            <button class="pswp__button pswp__button--customer" title="Dislike" @click="markPic(0)">
              <!-- <i class="el-icon-circle-close customer"></i> -->
              <img src="../assets/thumb-down-line.svg" class="customer">
            </button>

            <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../libs/photoswipe/photoswipe.css';
import '../libs/photoswipe/default-skin/default-skin.css';
import PhotoSwipe from '../libs/photoswipe/photoswipe';
import PSUI from '../libs/photoswipe/photoswipe-ui-default';

export default {
  name: 'PhotoSwipe',
  props: ['visible', 'items', 'options'],
  data () {
    return {
      gallery: null,
    };
  },
  watch: {
    visible (newVal) {
      if (newVal) {
        const that = this;
        this.gallery = new PhotoSwipe(this.$refs.pswp, PSUI, this.items, this.options);
        this.gallery.listen('close', function () {
          that.$emit('close-gallery');
        });
        this.gallery.init();
      }
    },
  },
  methods: {
    markPic (flag) {
      this.$emit('mark-pic', this.gallery.currItem.n, flag);
    },
  },
};
</script>
<style>
.pswp__button--customer {
  background: none!important;
  color: white;
}
.pswp__button--customer img {
  width: 16px;
  height: 16px;
}
</style>
