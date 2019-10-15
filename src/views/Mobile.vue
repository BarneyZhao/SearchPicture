<template>
  <div class="mobile">
    <div class="row">
        <div class="col-3" v-for="(item, index) in items" :key="index">
            <img v-lazy="item.src" draggable="false" @click="changeGallery(true)">
        </div>
    </div>
    <template v-if="items.length > 0">
      <PhotoSwipe
        :visible="psVisible"
        :items="items"
        @close-gallery="changeGallery(false)"
      ></PhotoSwipe>
    </template>
  </div>
</template>

<script>
import service from '../services/mobileService';
import PhotoSwipe from '../components/PhotoSwipe';

export default {
  name: 'Mobile',
  components: { PhotoSwipe },
  data () {
    return {
      items: [],
      psOptions: {},
      psVisible: false,
    };
  },
  created () {
    service.searchBySql({
      sql: 'limit 50',
    }).then(data => {
      if (data && Array.isArray(data.images)) {
        this.items = data.images.map((d) => {
          return { src: this.$getImgPath(d.n), ...d };
        });
      }
    });
  },
  methods: {
    changeGallery (val) {
      console.log('change', val);
      this.psVisible = val;
    },
  },
};
</script>
<style scoped>
.mobile {
    background-color: black;
    min-height: 100vh;
}
.row {
    padding: 1px;
}
.col-3 {
    padding: 1px;
    height: calc(25vw - 0.5px);
}
.col-3 img {
    vertical-align: middle;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
