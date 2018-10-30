<template>
  <!-- 角色管理 -->
  <div class="role-manage">
      <h2 class="title">角色列表</h2>
      <Button type="success" size="large" icon="plus" @click="add">新增角色</Button>
      <div class="lv-catalog">
        <span v-for="item in nameArr">{{item+'/'}}</span>
      </div>
      <Table class="table" border stripe :columns="columns" :data="data"></Table>
      <Button v-if="pidArr.length>1" type="info" size="large" @click="seeBack">返回上一级</Button>
      <!-- 新增角色模态框 -->
      <form-modal v-model="addShow" :config="addModal" @success="addSuccess" @error="addError"></form-modal>
      <!-- 编辑角色模态框 -->
      <form-modal v-model="editShow" :config="editModal" @success="editSuccess" @error="editError"></form-modal>
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
      // pid数组
      pidArr: ["0"],
      // 名称数组
      nameArr: [],
      //显示隐藏
      addShow: false,
      // 新增角色表单配置
      addModal: {
        //表单名
        formName:'add',
        //宽度
        width: 500,
        //标题
        title: "新增角色",
        //按钮名
        buttonName: "确认",
        //提交请求网址
        submit: "rbac@/role/add_role",
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
            label: "所属角色",
            //占位符
            placeholder: "选择所属角色",
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
            placeholder: "输入角色标识",
            //字段名称
            name: "identification",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          },
          {
            //初始值
            value: "",
            //类型
            type: "text",
            //label
            label: "名称",
            //占位符
            placeholder: "输入角色名称",
            //字段名称
            name: "name",
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
            placeholder: "输入角色排序",
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
            value: "1",
            //类型
            type: "switch",
            //label
            label: "是否启用",
            //占位符
            placeholder: "",
            //字段名称
            name: "status",
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
            label: "能否删除",
            //占位符
            placeholder: "",
            //字段名称
            name: "can_delete",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:false,
            //类型为开关时传值
            on:"1",
            off:"0"
          }
        ]
      },
      //显示隐藏
      editShow: false,
      // 编辑角色表单配置
      editModal: {
        //表单名
        formName:'edit',
        //宽度
        width: 500,
        //标题
        title: "编辑角色",
        //按钮名
        buttonName: "确认",
        //提交请求网址
        submit: "rbac@/role/edit_role",
        //获取信息请求网址和发送数据
        getInfo: {
          url: "rbac@/role/roleinfo",
          data: { id: "" }
        },
        //表单配置
        form: [
          {            
            //初始值
            value: "0",
            //类型
            type: "select",
            //label
            label: "所属角色",
            //占位符
            placeholder: "选择所属角色",
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
            placeholder: "输入角色标识",
            //字段名称
            name: "identification",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:true
          },
          {
            //初始值
            value: "",
            //类型
            type: "text",
            //label
            label: "名称",
            //占位符
            placeholder: "输入角色名称",
            //字段名称
            name: "name",
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
            placeholder: "输入角色排序",
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
            value: "1",
            //类型
            type: "switch",
            //label
            label: "是否启用",
            //占位符
            placeholder: "",
            //字段名称
            name: "status",
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
            label: "能否删除",
            //占位符
            placeholder: "",
            //字段名称
            name: "can_delete",
            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
            verify:false,
            //类型为开关时传值
            on:"1",
            off:"0"
          }
        ]
      },
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
        //删除
        delInfo: {
          url: "rbac@/role/del_role",
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
          key: "identification"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "能否删除",
          key: "can_delete"
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
                "查看角色"
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
                "编辑角色"
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
                "删除角色"
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
      this.$socket("rbac@/role/role_list", {}, res => {
        for (let i = 0; i < res.d.length; i++) {
          if (res.d[i].pid == pid) {
            switch(res.d[i].status){
              case "0":
                res.d[i].status="已禁用";
                break;
              case "1":
                res.d[i].status="已启用";
                break;  
            }
            switch(res.d[i].can_delete){
              case "0":
                res.d[i].can_delete="否";
                break;
              case "1":
                res.d[i].can_delete="能";
                break;  
            }
            this.data.push(res.d[i]);
          }
        }
        this.spinShow=false;
      });
    },
    //查看下一级
    seeNext(index) {
      this.pidArr.push(this.data[index].id);
      this.nameArr.push(this.data[index].name);
      this.loading(this.data[index].id);
    },
    //返回上一级
    seeBack() {
      this.pidArr.pop();
      this.nameArr.pop();
      this.loading(this.pidArr[this.pidArr.length - 1]);
    },
    // 新增角色
    add() {
      this.$socket("rbac@/role/role_list", {}, res => {
        this.addModal.form[0].selectList = [];
        this.addModal.form[0].selectList.push({value:"0",label:'无所属角色'});
        for (let i of res.d) {
          this.addModal.form[0].value = this.pidArr[this.pidArr.length - 1];
          this.addModal.form[0].selectList.push({
            value: i.id,
            label: i.name
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
    // 编辑角色
    edit(index) {
      this.$socket("rbac@/role/role_list", {}, res => {
        this.editModal.getInfo.data.id = this.data[index].id;
        this.editModal.form[0].selectList = [];
        this.editModal.form[0].selectList.push({value:"0",label:'无所属角色'});
        for (let i of res.d) {
          this.editModal.form[0].value = this.pidArr[this.pidArr.length - 1];
          this.editModal.form[0].selectList.push({
            value: i.id,
            label: i.name
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
    // 删除角色
    del(index) {
      let role = this.data[index];
      this.delModal.info=[];
      this.delModal.info.push({title:"标识",value:role.identification});
      this.delModal.info.push({title:"名称",value:role.name});
      this.delModal.delInfo.data.id=role.id;
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
