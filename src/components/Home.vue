<template>
  <div class="home">
    <el-container>
      <el-aside>
        <div class="setting">
          <el-form label-width="60px">
            <el-form-item label="宽度">
              <el-input
                v-model.number="form.w"
                placeholder="宽度"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="高度">
              <el-input
                v-model.number="form.h"
                placeholder="高度"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="比例">
              {{form.rw && form.rh ? form.rw / form.rh : ''}}
            </el-form-item>
            <el-form-item label=" ">
              <el-input
                v-model.number="form.rw"
                placeholder="比例的宽度"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label=" ">
              <el-input
                v-model.number="form.rh"
                placeholder="比例的高度"
                clearable>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        {{form}}
      </el-aside>
      <el-main></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      form: {
        w: '',
        h: '',
        rh: '',
        rw: '',
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  padding: 20px;
}
.el-main {
  padding: 0 0 0 20px;
}
</style>
