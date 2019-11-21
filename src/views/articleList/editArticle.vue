<template>
  <div class="editArticleBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="文章标题：" prop="articleTitle">
          <el-input placeholder="请输入文章标题" v-model="formData.articleTitle"></el-input>
        </el-form-item>
        <el-form-item label="所属分类：" prop="articleCate">
          <el-cascader
            v-model="formData.articleCate"
            :options="cateList"
            :props="cateKey"
            :show-all-levels="false"
            placeholder="请选择文章分类">
          </el-cascader>
        </el-form-item>
        <el-form-item label="标签：" required>
          <el-tag
            :key="tag.labelId"
            v-for="tag in formData.labelsList"
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
            <el-option v-for="tag in allTags" :label="tag.labelName" :value="tag.labelId"
                       :key="tag.labelId"></el-option>
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="updateImgRemove"
            :file-list="formData.articleImg"
            list-type="picture">
            <el-button size="small" type="warning" plain>点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="正文：" prop="articleContent">
          <Editor @input="editorChange" :articleContent="formData.articleContent"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm', 1)">立即发布</el-button>
          <el-button type="warning" @click="submitForm('ruleForm', 2)">保存草稿</el-button>
          <el-button @click="goBack()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'
  import Editor from '../../component/editor/editor'

  export default {
    name: "editArticleBox",
    components: {
      'WSBreadcrumb': WSBreadcrumb,
      'Editor': Editor,
    },
    created() {
      this.articleId = location.href.split('=')[1]
      this.getCate();
      this.getData();
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '文章管理'},
          {path: '/article/articleList', title: '文章列表'},
          {path: '', title: '编辑'},
        ],
        formData: {},
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
        cateList: [],
        cateKey: {
          value: 'cateId',
          label: 'cateName',
          children: 'children'
        },
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
        articleId: ''
      }
    },
    methods: {
      async getData() {
        let {data} = await this.$axios.get("/api/article/getEditArticle", {
          params: {
            id: this.articleId,
          }
        });
        if (data.code == 200) {
          this.formData = data.result
          this.getLabel(data.result.articleLabel)
        }
      },
      async getLabel(labels) {
        let {data} = await this.$axios.get('/api/article/articlePageGetLabel', {
          params: {
            labelIds: labels
          }
        })
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
      submitForm(formName, status) {
        if (this.formData.article == '') {
          this.$message({
            type: 'warning',
            message: '请填写文章内容'
          })
          return false
        }
        let params = {
          articleId: this.articleId,
          articleTitle: this.formData.articleTitle,
          articleCate: this.formData.articleCate[1],
          articleLabel: [],
          articleImg: [],
          articleContent: this.formData.articleContent,
          status: status
        }
        for (let i = 0; i < this.formData.labelsList.length; i++) {
          params.articleLabel.push(this.formData.labelsList[i].labelId)
        }
        for (let i = 0; i < this.formData.articleImg.length; i++) {
          params.articleImg.push(this.formData.articleImg[i].url)
        }

        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let {data} = await this.$axios.post('/api/article/editArticle', params)
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.$router.push('/article/articleList')
            }
          }
        });
      },
      goBack() {
        history.go(-1)
      },
      // 标签系列方法
      tagClose(tag) {
        let obj = this.formData.labelsList[this.formData.labelsList.indexOf(tag)]
        this.allTags.push(obj);
        this.formData.labelsList.splice(this.formData.labelsList.indexOf(tag), 1);
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
          this.formData.labelsList.push(obj);
          let index = this.allTags.indexOf(obj)
          this.allTags.splice(index, 1);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 标签方法结束
      updateImgRemove(file, fileList) {
        for (let i = 0; i < this.formData.articleImg.length; i++) {
          if (this.formData.articleImg[i].uid == file.uid) {
            this.formData.articleImg.pop(this.formData.articleImg[i])
          }
        }
      },
      updateImgSuccess(res, file) {
        this.formData.articleImg.push(file)
      },
      // 富文本编辑器
      editorChange(text) {
        this.formData.articleContent = text
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
