<template>
  <div class="releaseArticleBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="文章标题：" prop="articleName">
          <el-input placeholder="请输入文章标题" v-model="ruleForm.articleName"></el-input>
        </el-form-item>
        <el-form-item label="所属分类：" prop="cate">
          <el-cascader
            v-model="ruleForm.cate"
            :options="cateList"
            :show-all-levels="false"
            placeholder="请选择文章分类">
          </el-cascader>
        </el-form-item>
        <el-form-item label="标签：" required>
          <el-tag
            :key="tag.tagId"
            v-for="tag in ruleForm.tags"
            closable
            :disable-transitions="false"
            type="warning"
            @close="tagClose(tag)">
            {{tag.tagName}}
          </el-tag>
          <el-select
            v-model="inputValue"
            v-if="inputVisible"
            class="input-new-tag"
            size="small"
            @change="addTagSave">
            <el-option v-for="tag in allTags" :label="tag.tagName" :value="tag.tagId" :key="tag.tagId"></el-option>
          </el-select>
          <el-button
            v-else
            type="warning"
            plain
            class="button-new-tag"
            size="small"
            @click="addTag">
            + 添加新标签
          </el-button>
        </el-form-item>
        <el-form-item label="配图：" prop="delivery">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="updateImgRemove"
            :file-list="ruleForm.imgs"
            list-type="picture">
            <el-button size="small" type="warning" plain>点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="正文：" prop="type">
          <Editor v-model="ruleForm.article"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
          <el-button type="danger" @click="saveForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'
  import Editor from '../../component/editor/editor'

  export default {
    name: "releaseArticle",
    components: {
      'WSBreadcrumb': WSBreadcrumb,
      'Editor': Editor,
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '发布文章'}
        ],
        ruleForm: {
          articleName: '',
          cate: '',
          tags: [],
          imgs: [],
          article: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },
        // 文章类别
        cateList: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则'
              },
              {
                value: 'daohang',
                label: '导航'
              }
            ]
          },
          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic'
              },
              {
                value: 'form',
                label: 'Form'
              },
              {
                value: 'data',
                label: 'Data'
              },
              {
                value: 'notice',
                label: 'Notice'
              },
              {
                value: 'navigation',
                label: 'Navigation'
              },
              {
                value: 'others',
                label: 'Others'
              }
            ]
          },
          {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'jiaohu',
                label: '组件交互文档'
              }
            ]
          }
        ],
        // 所有标签
        allTags: [
          {tagId: 1, tagName: 'JavaScript'},
          {tagId: 2, tagName: 'HTML'},
          {tagId: 3, tagName: 'CSS'},
        ],
        // 添加新标签
        inputVisible: false,
        inputValue: '',
        // 富文本编辑器
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      saveForm(formName) {
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      tagClose(tag) {
        let obj = this.ruleForm.tags[this.ruleForm.tags.indexOf(tag)]
        this.allTags.push(obj);
        this.ruleForm.tags.splice(this.ruleForm.tags.indexOf(tag), 1);
      },
      addTag() {
        this.inputVisible = true;
      },
      addTagSave(id) {
        let obj = {};
        obj = this.allTags.find((item) => {
          return item.tagId === id;
        });
        if (obj) {
          this.ruleForm.tags.push(obj);
          let index = this.allTags.indexOf(obj)
          this.allTags.splice(index, 1);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      updateImgRemove(file, fileList) {
        console.log(file, fileList);
      },
    }
  }
</script>

<style scoped>
  .el-form {
    width: 1200px;
  }

  .el-cascader, .el-input {
    width: 1100px;
  }

  .el-tag {
    margin-right: 10px;
  }

  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 120px;
    vertical-align: bottom;
  }

  .quillWrapper /deep/ .ql-toolbar.ql-snow .ql-formats {
    vertical-align: middle;
  }
</style>
