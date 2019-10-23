<template>
  <div class="row search">
    <div class="col conditions">
      <el-form>
        <el-form-item>
          <el-radio v-model="form.conditionType" label="pixel">像素</el-radio>
          <el-input
            v-model.number="form.w"
            placeholder="宽"
            class="conditionInput"
            :disabled="form.conditionType !== 'pixel'"
            clearable>
          </el-input>
          <el-input
            v-model.number="form.h"
            placeholder="高"
            class="conditionInput"
            :disabled="form.conditionType !== 'pixel'"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="form.conditionType" label="ratio">比例</el-radio>
          <el-input
            v-model.number="form.rw"
            placeholder="宽"
            class="conditionInput"
            :disabled="form.conditionType !== 'ratio'"
            clearable>
          </el-input>
          <el-input
            v-model.number="form.rh"
            placeholder="高"
            class="conditionInput"
            :disabled="form.conditionType !== 'ratio'"
            clearable>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="col options">
      <el-form label-width="100px">
        <el-form-item label="搜索文件夹">
          <template v-if="$IS_E">
            <el-button @click="selectSearchFolder" size="small" onfocus="blur()">选择</el-button>
            <span>&nbsp;{{this.searchFolder}}</span>
          </template>
          <div class="row align-items-center" v-else>
            <el-radio v-model="form.searchFolderType" label="db">数据库</el-radio>
            <el-radio v-model="form.searchFolderType" label="input">输入</el-radio>
            <div class="flex-1">
              <el-input
                v-model="searchFolderTemp"
                @blur="folderTempInputBlur"
                placeholder="文件夹路径"
                :disabled="form.searchFolderType === 'db'"
                clearable>
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-button
            class="submitButton"
            @click="search"
            onfocus="blur()"
            :loading="isLoading"
          >{{isLoading ? '运行中' : '开始'}}</el-button>
          &nbsp;
          <el-button
            class="sqlButton"
            @click="dialogSqlVisible = true"
            onfocus="blur()"
            :disabled="form.searchFolderType !== 'db'"
          >自定义sql</el-button>
          &nbsp;
          <el-button
            class="fullscreenButton"
            onfocus="blur()"
            @click="toggleFullscreen"
          >切换全屏</el-button>
          &nbsp;
          <el-button
            class="playButton"
            @click="imagePlayerTrigger"
            onfocus="blur()"
            :disabled="!canPlayOrExport"
          >播放图片</el-button>
          &nbsp;
          <el-button
            class="exportButton"
            @click="exportTo"
            onfocus="blur()"
            :disabled="!canPlayOrExport"
          >导出到文件夹</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="自定义查询" :visible.sync="dialogSqlVisible">
        <div class="row align-items-center">
          <el-radio v-model="customerQuery" label="1">输入</el-radio>
          <el-input
            v-model="sqlCondition"
            placeholder="输入sql条件"
            class="flex-1"
            :disabled="customerQuery === '2'"
            clearable
          ></el-input>
        </div>
        <br>
        <div class="row align-items-center">
          <el-radio v-model="customerQuery" label="2">随机</el-radio>
          <el-input
            v-model.number="sqlLimit"
            placeholder="输入随机数量"
            class="flex-1"
            :disabled="customerQuery === '1'"
            clearable
          ></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSqlVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogSqlVisible = false;customerSearch()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['searchFolder', 'isLoading', 'canPlayOrExport'],
  data () {
    return {
      form: {
        conditionType: 'pixel',
        w: '1920',
        h: '1080',
        rw: '16',
        rh: '9',
        searchFolderType: '',
      },
      searchFolderTemp: '',
      outputData: null,
      dialogSqlVisible: false,
      customerQuery: '1',
      sqlCondition: '',
      sqlLimit: 40,
    };
  },
  mounted () {
    if (!this.$IS_E) this.form.searchFolderType = 'db';
  },
  methods: {
    selectSearchFolder () {
      this.$emit('selectSearchFolder');
    },
    folderTempInputBlur () {
      this.$emit('inputSearchFolder', this.searchFolderTemp);
    },
    search () {
      if (this.form.searchFolderType !== 'db' && !this.searchFolder) {
        this.$notify({
          title: '提示',
          message: `请${this.$IS_E ? '选择' : '输入'}要搜索的文件夹`,
          duration: 1500,
        });
        return;
      }
      this.$emit('search', this.form);
    },
    imagePlayerTrigger () {
      this.$emit('imagePlayerTrigger', true);
    },
    toggleFullscreen () {
      this.$emit('toggleFullscreen');
    },
    exportTo () {
      this.$emit('exportTo');
    },
    customerSearch () {
      if (this.customerQuery === '1') this.$emit('searchBySql', this.sqlCondition);
      else this.$emit('searchByLimit', this.sqlLimit);
    },
  },
};
</script>

<style scoped>
.el-form {
  padding-bottom: 1px;
}
.conditions {
  -webkit-flex: 0 0 290px;
  -ms-flex: 0 0 290px;
  flex: 0 0 290px;
  width: 290px;
  max-width: 290px;
}
.conditionInput {
  margin-left: 5px;
  width: 90px;
}
.submitButton,
.playButton,
.fullscreenButton {
  width: 100px;
}
</style>
