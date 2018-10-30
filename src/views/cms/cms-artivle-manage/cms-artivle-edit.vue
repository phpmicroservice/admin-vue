<template>
    <div>
        <h2 class="title">编辑文章</h2>
        <Form ref="data" :model="data" :rules="ruleValidate">
            <FormItem prop="category_id" label="文章分类">
                <Select class="form-select" v-model="data.category_id">
                    <Option :value="item.id" v-for="item in cmsList">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="title" label="文章标题">
                <Input v-model="data.title" placeholder="请输入文章标题"></Input>
            </FormItem>     
            <FormItem prop="description" label="文章描述">
                <Input v-model="data.description" type="textarea" :rows="4" placeholder="请输入文章描述"></Input>
            </FormItem>  
            <FormItem prop="content" label="文章内容">
                <editor type="cms" :article_id="data.content" :saveKey="saveKey" @save="save"></editor>
            </FormItem>   
            <FormItem prop="view" label="文章初始浏览量">
                <Input v-model="data.view" placeholder="请输入文章初始浏览量"></Input>
            </FormItem>      
            <FormItem prop="level" label="文章等级">
                <Input v-model="data.level" placeholder="请输入文章等级"></Input>
            </FormItem> 
            <FormItem prop="can_reply" label="是否可回复">
                <RadioGroup v-model="data.can_reply">
                    <Radio label="1">是</Radio>
                    <Radio label="0">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="success" size="large" @click="handleSubmit('data')">提交</Button>
                <Button type="info" size="large" @click="back">返回</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
  //新建配置组件
  data() {
    return {
      data: {
        id:this.$route.params.artivle_id,  
        title: "",
		category_id: "",
		description: "",
		view: "",
		level: "",
		can_reply: "1"
      },
      //编辑器保存草稿触发锁
      saveKey:false,
      //cms列表
      cmsList: [],
      //文章id
      article_id:this.$route.params.artivle_id,  
      //验证信息
      ruleValidate: {
        category_id:[
          { required: true, message: "必须选择分类", trigger: "blur" },
        ],
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "描述不能为空", trigger: "blur" },
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" },
        ],
        view: [
            { required: true, message: "初始浏览量不能为空", trigger: "blur" },
            { validator: this.validateInt, trigger: "blur" }
        ],
        level: [
            { required: true, message: "等级不能为空", trigger: "blur" },
            { validator: this.validateInt, trigger: "blur" }
        ],
        can_reply:[
            { required: true, message: "必须选择", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //提交方法
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.saveKey=true;  
          this.$socket("cms@/Article/edit",this.data,(res)=>{
              if(res.d){
                  this.$Notice.success({
                    title: '成功',
                    desc: '编辑成功',
                    duration: 5
                  });
                  this.$router.go(-1);
              }else{
                  this.$Notice.error({
                    title: '失败',
                    desc: '编辑失败',
                    duration: 5
                  });
              }
          },error=>{
              this.$Notice.error({
                title: '失败',
                desc: error.m,
                duration: 5
              });
          })
        } else {
          this.$Notice.error({
            title: '失败',
            desc: "表单验证失败!",
            duration: 5
          });
        }
      });
    },
    save(){
        this.saveKey=false;
    },
    //正整数验证方法
    validateInt(rule, value, callback) {
      let reg = /^\d+$/;
      if (!value) {
        this.data.sort = 0;
        callback();
      } else if (!reg.test(value)) {
        return callback(new Error("只能填写正整数"));
      } else {
        callback();
      }
    },
    back(){
        this.$router.go(-1);
    }
  },
  created() {      
    //获取cms列表
    this.$socket("cms@/cate/index",{},res=>{
        this.cmsList=res.d;                    
    })
    this.$socket("cms@/Article/info",{"id": this.$route.params.artivle_id},(res)=>{
        this.data=res.d;
    })
  }
};
</script>

<style>
</style>


