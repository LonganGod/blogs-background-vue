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
            :props="cateKey"
            :show-all-levels="false"
            placeholder="请选择文章分类">
          </el-cascader>
        </el-form-item>
        <el-form-item label="标签：" required>
          <el-tag
            :key="tag.labelId"
            v-for="tag in ruleForm.tags"
            closable
            :disable-transitions="false"
            type="warning"
            @close="tagClose(tag)">
            {{tag.labelName}}
          </el-tag>
          <el-select
            v-model="inputValue"
            v-if="inputVisible"
            class="input-new-tag"
            size="small"
            @change="addTagSave">
            <el-option v-for="tag in allTags" :label="tag.labelName" :value="tag.labelId" :key="tag.labelId">
            </el-option>
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
        <el-form-item label="配图：" prop="articleImg">
          <el-upload
            class="upload-demo"
            action="/api/imgUploads"
            :on-remove="updateImgRemove"
            :on-success="updateImgSuccess"
            :file-list="ruleForm.imgs"
            name="articleImg"
            list-type="picture">
            <el-button size="small" type="warning" plain>点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="正文：" prop="article">
          <Editor @input="editorChange"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm', 1)">立即发布</el-button>
          <el-button type="warning" @click="submitForm('ruleForm', 2)">保存草稿</el-button>
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
    created() {
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '文章管理'},
          {path: '', title: '发布文章'},
        ],
        ruleForm: {
          articleName: '',
          cate: '',
          tags: [],
          imgs: [],
          article: ''
        },
        rules: {
          articleName: [
            {required: true, message: '请输入文章标题', trigger: 'blur'},
            {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
          ],
          cate: [
            {required: true, message: '请选择文章分类', trigger: 'change'}
          ]
        },
        // 文章类别
        cateList: [],
        cateKey: {
          value: 'cateId',
          label: 'cateName',
          children: 'children'
        },
        // 所有标签
        allTags: [],
        // 添加新标签
        inputVisible: false,
        inputValue: '',
      }
    },
    methods: {
      getData() {
        this.getCate()
        this.getLabel()
      },
      async getLabel() {
        let {data} = await this.$axios.get('/api/article/articlePageGetLabel')
        if (data.code == 200) {
          this.allTags = data.result
        }
      },
      async getCate() {
        let {data} = await this.$axios.get('/api/article/articlePageGetCate')
        if (data.code == 200) {
          this.cateList = data.result
        }
      },
      // 提交表单
      submitForm(formName, status) {
        if (this.ruleForm.article == '') {
          this.$message({
            type: 'warning',
            message: '请填写文章内容'
          })
          return false
        }
        let params = {
          articleTitle: this.ruleForm.articleName,
          articleCate: this.ruleForm.cate[1],
          articleLabel: [],
          articleImg: [],
          articleContent: this.ruleForm.article,
          status: status
        }
        for (let i = 0; i < this.ruleForm.tags.length; i++) {
          params.articleLabel.push(this.ruleForm.tags[i].labelId)
        }
        for (let i = 0; i < this.ruleForm.imgs.length; i++) {
          params.articleImg.push(this.ruleForm.imgs[i].response.path)
        }

        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let {data} = await this.$axios.post('/api/article/addArticle', params)
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push('/article/articleList')
            }
          }
        });
      },
      // 标签系列方法
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
          return item.labelId === id;
        });
        if (obj) {
          this.ruleForm.tags.push(obj);
          let index = this.allTags.indexOf(obj)
          this.allTags.splice(index, 1);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 标签方法结束
      updateImgRemove(file, fileList) {
        for (let i = 0; i < this.ruleForm.imgs.length; i++) {
          if (this.ruleForm.imgs[i].uid == file.uid) {
            this.ruleForm.imgs.imgs.splice(i, 1)
          }
        }
      },
      updateImgSuccess(res, file) {
        this.ruleForm.imgs.push(file)
      },
      // 富文本编辑器
      editorChange(text) {
        this.ruleForm.article = text
      }
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
