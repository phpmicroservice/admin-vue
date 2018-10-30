<template>
  <!-- 用户的角色管理 -->
  <div>
      <h2 class="title">用户角色列表</h2>
      <Button type="success" size="large" icon="plus" @click="add">新增角色</Button>
      <Table class="table" border stripe :columns="columns" :data="data"></Table>
      <Button type="info" size="large" @click="back">返回</Button>
      <!-- 新增角色模态框 -->
      <form-modal v-model="addShow" :config="addModal" @success="addSuccess" @error="addError"></form-modal>
      <!-- 删除角色模态框 -->
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
      columns: [
        {
          title: "角色id",
          key: "role_id"
        },
        {
          title: "角色标识",
          key: "identification"
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
                    type: "error",
                    size: "default"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.del(params.index);
                    }
                  }
                },
                "删除用户角色"
              )
            ]);
          }
        }
      ],
      data: [],
      //显示隐藏
      delShow: false,
      // 删除角色表单配置
      delModal: {
        //宽度
        width: 300,
        // 头部标题
        head:'删除',
        //按钮名
        button:'删除',
        //信息
        info: [],
        delInfo: {
          url: "rbac@/user/user_del_role",
          data: {user_id:'',role_id:''}
        }
      },
      //显示隐藏
      addShow: false,
      // 新增角色表单配置
      addModal: {
        //表单名
        formName: "add",
        //宽度
        width: 400,
        //标题
        title: "增加用户角色",
        //按钮名
        buttonName: "确认",
        //提交请求网址
        submit: "rbac@/user/user_add_role",
        //获取信息请求网址和发送数据
        getInfo: {
          url: "",
          data: {}
        },
        //表单配置
        form: [
          {
            //初始值
            value: "0",
            //类型
            type: "select",
            //label
            label: "角色",
            //占位符
            placeholder: "选择添加的角色",
            //字段名称
            name: "role_id",
            //类型为选择框时传值
            selectList: [],
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify: true
          },
          {
            //初始值
            value: "0",
            //类型
            type: "data",
            //字段名称
            name: "user_id"
          }
        ]
      }
    };
  },
  methods: {
    loading() {
      this.spinShow=true;
      this.$socket(
        "rbac@/user/user_role_list",
        { user_id: this.$route.params.user_id },
        res => {
          this.data = res.d;
          this.spinShow=false;
        }
      );
    },
    // 新增角色
    add() {
      this.$socket("rbac@/role/role_list", {}, res => {
        this.addModal.form[0].value = res.d[0].id;
        this.addModal.form[0].selectList = [];
        this.addModal.form[1].value = this.$route.params.user_id;
        for (let i of res.d) {
          this.addModal.form[0].selectList.push({
            value: i.id,
            label: i.name
          });
        }
        this.addShow = true;
      });          
    },
    // 增加成功
    addSuccess() {
      this.$Message.success("增加成功");
      this.loading();
      this.addShow = false;
    },
    //增加失败
    addError(e) {
      this.$Message.error(e.m);
    },
    // 删除角色
    del(index) {
      let role = this.data[index];
      this.delModal.info=[];
      this.delModal.info.push({title:"标识",value:this.data[index].identification});   
      this.delModal.delInfo.data.user_id=this.$route.params.user_id;
      this.delModal.delInfo.data.role_id=this.data[index].role_id;
      this.delShow=true;     
    },
    //删除成功
    delSuccess(){
      this.$Message.success("删除成功");
      this.loading(this.pidArr[this.pidArr.length - 1]);
      this.delShow = false;
    },
    //删除失败
    delError(e){
      this.$Message.error(e.m);
    },
    //返回
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.loading();
  }
};
</script>

<style>

</style>
