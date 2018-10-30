<template>
    <div class="auth-manage">
         <h2 class="title" v-if="role_list.length>0">{{role_name}}权限管理</h2>
         <Select v-if="selectKey" v-model="role_id" style="width:200px" @on-change="roleChange">
            <Option v-for="item in role_list" :value="item.id">{{ item.name }}</Option>
         </Select>
        <Tree class="tree" :data="data" show-checkbox @on-check-change="xuanzhong" ref="tree"></Tree>
        <!-- 加载中 -->
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
export default {
  //权限管理组件
  data() {
    return {
      // 加载中
      spinShow:false,
      selectKey: false,
      role_id: "",
      role_list: [],
      role_name: "",
      resources_data: [],
      data: [],
      //已选中
      checkOk: []
    };
  },
  methods: {
    roleChange(value) {
      for (let i of this.role_list) {
        if (this.role_id == i.id) {
          this.role_name = i.name;
        }
      }
      this.loading();
    },
    loading() {
      this.spinShow=true;
      this.$socket("rbac@/resources/resources_list", {}, res => {
        this.resources_data = res.d;
        //请求角色权限列表
        this.$socket("rbac@/Authority/auth_list", { role_id: this.role_id }, res => {
            if(!res.d){
                res.d=[];
            }  
            // 找到已有权限并勾选
            for (let i of this.resources_data) {
            for (let j of res.d) {
                if (i.id == j.resources) {
                i.checked = true;
                }
            }
            }
            //将返回值转为树形结构
            this.data = this.toTree(this.resources_data, 0, "");
            this.spinShow=false;
        });
      });
    },
    //转换属性结构方法
    toTree(data, pid, title) {
      let tree = [];
      let temp;
      for (let i = 0; i < data.length; i++) {
        if (data[i].pid == pid) {
          let obj = data[i];
          //全部展开
          data[i].expand = true;
          data[i].title = title + data[i].title + "/";
          temp = this.toTree(data, data[i].id, data[i].title);
          if (temp.length > 0) {
            obj.children = temp;
          }
          tree.push(obj);
        }
      }
      this.treeShow = true;
      return tree;
    },
    //选中方法
    xuanzhong(arr) {
      this.$socket("rbac@/Authority/auth_list", { role_id: this.role_id }, res => {
        if(!res.d){
          res.d=[];
        }  
        if (arr.length < 1) {
          //清空
          for (let i of res.d) {
            this.$socket(
              "rbac@/Authority/del_auth2",
              { role_id: this.role_id, resources_id: i.resources },
              res => {
                this.$Message.success("删除成功");
              },
              error => {
                this.$Message.error(error.m);
              }
            );
          }
        } else {
          for (let i = 0; i < res.d.length; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (res.d[i].resources == arr[j].id) {
                break;
              } else if (j == arr.length - 1) {
                this.$socket(
                  "rbac@/Authority/del_auth2",
                  {
                    role_id: this.role_id,
                    resources_id: res.d[i].resources
                  },
                  res => {
                    this.$Message.success("删除成功");
                  },
                  error => {
                    this.$Message.error(error.m);
                  }
                );
              }
            }
          }
        }
        if (res.d.length < 1) {
          //添加
          for (let i of arr) {
            //添加数据
            let form = {
              title: "",
              role: 0,
              resources: "",
              description: "",
              type: "1",
              status: "1",
              condition: ""
            };
            form.role = this.role_id;
            form.title = i.title;
            form.resources = i.id;
            form.description = i.describe;
            this.$socket(
              "rbac@/Authority/add_auth",
              form,
              res => {
                this.$Message.success("添加成功");
              },
              error => {
                this.$Message.error(error.m);
              }
            );
          }
        } else {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < res.d.length; j++) {
              if (arr[i].id == res.d[j].resources) {
                break;
              } else if (j == res.d.length - 1) {
                //添加数据
                let form = {
                  title: "",
                  role: 0,
                  resources: "",
                  description: "",
                  type: "1",
                  status: "1",
                  condition: ""
                };
                form.role = this.role_id;
                form.title = arr[i].title;
                form.resources = arr[i].id;
                form.description = arr[i].describe;
                //添加
                this.$socket(
                  "rbac@/Authority/add_auth",
                  form,
                  res => {
                    this.$Message.success("添加成功");
                  },
                  error => {
                    this.$Message.error(error.m);
                  }
                );
              }
            }
          }
        }
      });
    }
  },
  created() {
    //实例创建完成
    // 获取角色列表
    this.$socket("rbac@/role/role_list", {}, res => {
      this.role_list = res.d;
      this.role_id = res.d[0].id;
      this.role_name = res.d[0].name;
      this.selectKey=true;
      this.loading();
    });
  }
};
</script>

<style scoped>
.tree {
  font-weight: bold;
  margin-top: 10px;
}
</style>

