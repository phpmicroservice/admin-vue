<template>
  <!-- 频道管理 -->
  <div class="resoures-manage">
      <h2 class="title">BBS分类频道列表</h2>
      <Button type="success" size="large" icon="plus" @click="add">新增频道</Button>
      <div class="lv-catalog">
        <span v-for="item in titleArr">{{item+'/'}}</span>
      </div>
      <Table class="table" border stripe :columns="columns" :data="data"></Table>
      <Button v-if="pidArr.length>1" type="info" size="large" @click="seeBack">返回上一级</Button>
      <!-- 新增频道模态框 -->
      <form-modal v-model="addShow" :config="addModal" @success="addSuccess" @error="addError"></form-modal>
      <!-- 编辑频道模态框 -->
      <form-modal v-model="editShow" :config="editModal" @success="editSuccess" @error="editError"></form-modal>
      <!-- 删除频道模态框 -->
      <del-modal v-model="delShow" :config="delModal"  @success="delSuccess" @error="delError"></del-modal>
      <!-- 加载中 -->
      <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 加载中
      spinShow:false,
      // pid数组
      pidArr: ['0'],
      // 标题数组
      titleArr: [],
      //显示隐藏
      addShow: false,
      // 新增频道表单配置
      addModal: {
        //表单名
        formName:'add',
        //宽度
        width: 800,
        //标题
        title: "新增频道",
        //按钮名
        buttonName: "确认",
        //提交请求网址
        submit: "bbs@/forum/create",
        //获取信息请求网址和发送数据
        getInfo: {
          url: "",
          data: {}
        },
        //表单配置
        form: [
          {            
            //初始值
            value: "",
            //类型
            type: "select",
            //label
            label: "所属频道",
            //占位符
            placeholder: "选择所属频道",
            //字段名称
            name: "pid",
            //类型为选择框时传值
            selectList: [],
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          },
          {
            //初始值
            value: "",
            //类型
            type: "text",
            //label
            label: "标识",
            //占位符
            placeholder: "输入频道标识",
            //字段名称
            name: "name",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:{
              //正则
              reg:/^[A-Za-z]{2,50}$/,
              hint:"2-50位英文字符"
            }
          },
          {
            //初始值
            value: "",
            //类型
            type: "text",
            //label
            label: "标题",
            //占位符
            placeholder: "输入频道标题",
            //字段名称
            name: "title",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          },
          {
            //初始值
            value: "0",
            //类型
            type: "text",
            //label
            label: "排序",
            //占位符
            placeholder: "输入频道排序",
            //字段名称
            name: "sort",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:{
              reg: /^\d+$/,
              hint:"只能填写正整数"
            }
          },
          {
            //初始值
            value: "",
            //类型
            type: "text",
            //label
            label: "SEO标题",
            //占位符
            placeholder: "输入SEO标题",
            //字段名称
            name: "meta_title",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          },
          {
            //初始值
            value: "",
            //类型
            type: "text",
            //label
            label: "SEO关键字",
            //占位符
            placeholder: "输入SEO关键字",
            //字段名称
            name: "keywords",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          },
          {
            //初始值
            value: "1",
            //类型
            type: "switch",
            //label
            label: "是否可发布",
            //字段名称
            name: "allow_publish",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:false,
            //类型为开关时传值
            on:"1",
            off:"0"
          },
          {
            //初始值
            value: "1",
            //类型
            type: "switch",
            //label
            label: "是否展示",
            //字段名称
            name: "display",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:false,
            //类型为开关时传值
            on:"1",
            off:"0"
          },
          {
            //初始值
            value: "",
            //类型
            type: "textarea",
            //行数
            rows:4,
            //label
            label: "描述",
            //占位符
            placeholder: "输入频道描述",
            //字段名称
            name: "description",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          }
        ]
      },
      //显示隐藏
      editShow: false,
      // 编辑频道表单配置
      editModal: {
        //表单名
        formName:'edit',
        //宽度
        width: 800,
        //标题
        title: "编辑频道",
        //按钮名
        buttonName: "确认",
        //提交请求网址
        submit: "bbs@/forum/edit",
        //获取信息请求网址和发送数据
        getInfo: {
          url: "bbs@/forum/info",
          data: { id: "" }
        },
        //表单配置
        //表单配置
        form: [
          {            
            //初始值
            value: "0",
            //类型
            type: "select",
            //label
            label: "所属频道",
            //占位符
            placeholder: "选择所属频道",
            //字段名称
            name: "pid",
            //类型为选择框时传值
            selectList: [],
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          },
          {
            //初始值
            value: "",
            //类型
            type: "text",
            //label
            label: "标识",
            //占位符
            placeholder: "输入频道标识",
            //字段名称
            name: "name",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:{
              //正则
              reg:/^[A-Za-z]{2,50}$/,
              hint:"2-50位英文字符"
            }
          },
          {
            //初始值
            value: "",
            //类型
            type: "text",
            //label
            label: "标题",
            //占位符
            placeholder: "输入频道标题",
            //字段名称
            name: "title",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          },
          {
            //初始值
            value: "0",
            //类型
            type: "text",
            //label
            label: "排序",
            //占位符
            placeholder: "输入频道排序",
            //字段名称
            name: "sort",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:{
              reg: /^\d+$/,
              hint:"只能填写正整数"
            }
          },
          {
            //初始值
            value: "",
            //类型
            type: "text",
            //label
            label: "SEO标题",
            //占位符
            placeholder: "输入SEO标题",
            //字段名称
            name: "meta_title",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          },
          {
            //初始值
            value: "",
            //类型
            type: "text",
            //label
            label: "SEO关键字",
            //占位符
            placeholder: "输入SEO关键字",
            //字段名称
            name: "keywords",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          },
          {
            //初始值
            value: "1",
            //类型
            type: "switch",
            //label
            label: "是否可发布",
            //字段名称
            name: "allow_publish",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:false,
            //类型为开关时传值
            on:"1",
            off:"0"
          },
          {
            //初始值
            value: "1",
            //类型
            type: "switch",
            //label
            label: "是否展示",
            //字段名称
            name: "display",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:false,
            //类型为开关时传值
            on:"1",
            off:"0"
          },
          {
            //初始值
            value: "",
            //类型
            type: "textarea",
            //行数
            rows:4,
            //label
            label: "描述",
            //占位符
            placeholder: "输入频道描述",
            //字段名称
            name: "description",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          }
        ]
      },
      //显示隐藏
      delShow: false,
      // 删除频道表单配置
      delModal: {
        //宽度
        width: 300,
        // 头部标题
        head:'删除',
        //按钮名
        button:'删除',
        //信息
        info: [],
        //删除
        delInfo: {
          url: "bbs@/forum/dele",
          data: {id:''}
        }
      },
      columns: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "标识",
          key: "name"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title:"SEO标题",
          key:"meta_title"  
        },
        {
          title:"SEO关键字",
          key:"keywords"
        },
        {
          title:"是否可发布",
          key:"allow_publish"
        },
        {
          title:"是否展示",
          key:"display"
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "default"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.seeNext(params.index);
                    }
                  }
                },
                "查看频道"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "default"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.index);
                    }
                  }
                },
                "编辑频道"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "default"
                  },
                  on: {
                    click: () => {
                      this.del(params.index);
                    }
                  }
                },
                "删除频道"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  methods: {
    //渲染表格方法
    loading(pid) {
      this.data = [];
      this.spinShow=true;
      this.$socket("bbs@/forum/index", {}, res => {
        for (let i of res.d) {
          switch(i.allow_publish){
              case '0':
              i.allow_publish='否';
              break;
              case '1':
              i.allow_publish='是';
              break;
          }  
          switch(i.display){
              case '0':
              i.display='否';
              break;
              case '1':
              i.display='是';
              break;
          }
          switch(i.check){
              case '0':
              i.check='否';
              break;
              case '1':
              i.check='是';
              break;
          }
          if (i.pid == pid) {
            this.data.push(i);
          }
        }
        this.spinShow=false;
      });
    },
    //查看下一级
    seeNext(index) {
      this.pidArr.push(this.data[index].id);
      this.titleArr.push(this.data[index].title);
      this.loading(this.data[index].id);
    },
    //返回上一级
    seeBack() {
      this.pidArr.pop();
      this.titleArr.pop();
      this.loading(this.pidArr[this.pidArr.length - 1]);
    },
    // 新增频道
    add() {
      this.$socket("bbs@/forum/index", {}, res => {
        this.addModal.form[0].selectList = [];
        this.addModal.form[0].selectList.push({
            value:'0',
            label:'无所属频道'
        })
        for (let i of res.d) {
          this.addModal.form[0].value = this.pidArr[this.pidArr.length - 1];
          this.addModal.form[0].selectList.push({
            value: i.id,
            label: i.title
          });
          this.addShow = true;
        }
      });
    },
    // 增加成功
    addSuccess() {
      this.loading(this.pidArr[this.pidArr.length - 1]);
      this.addShow = false;
    },
    //增加失败
    addError(e) {

    },
    // 编辑频道
    edit(index) {
      this.$socket("bbs@/forum/index", {}, res => {
        this.editModal.getInfo.data.id = this.data[index].id;
        this.editModal.form[0].selectList = [];
        this.editModal.form[0].selectList.push({
            value:'0',
            label:'无所属频道'
        })
        for (let i of res.d) {
          this.editModal.form[0].value = this.pidArr[this.pidArr.length - 1];
          this.editModal.form[0].selectList.push({
            value: i.id,
            label: i.title
          });
          this.editShow = true;
        }
      });
    },
    // 编辑成功
    editSuccess() {
      this.loading(this.pidArr[this.pidArr.length - 1]);
      this.editShow = false;
    },
    //编辑失败
    editError(e) {

    },
    // 删除频道
    del(index) {
      let resources = this.data[index];
      this.delModal.info=[];
      this.delModal.info.push({title:"标识",value:resources.name});
      this.delModal.info.push({title:"标题",value:resources.title});
      this.delModal.delInfo.data.id=resources.id;
      this.delShow=true;     
    },
    //删除成功
    delSuccess(){
      this.loading(this.pidArr[this.pidArr.length - 1]);
      this.delShow = false;
    },
    //删除失败
    delError(e){
      
    }
  },
  created() {
    this.loading(0);
  }
};
</script>

