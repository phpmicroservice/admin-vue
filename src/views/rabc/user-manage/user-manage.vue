<template>
  <div>
      <h2 class="title" v-if="role_list.length>0">{{role_name}}列表</h2>
      <Select v-model="role_id" style="width:200px" @on-change="roleChange">
          <Option v-for="item in role_list" :value="item.id">{{ item.name }}</Option>
      </Select>
      <Button type="error" @click="empty">清空{{role_name}}的用户列表</Button>
      <Table class="table" border stripe :columns="columns" :data="data"></Table>
      <Page :page-size="pageSize" :total="total_items" show-total show-elevator @on-change="pageChange"></Page>
      <!-- 清除用户角色模态框 -->
      <del-modal v-model="emptyShow" :config="emptyModal"  @success="emptySuccess" @error="emptyError"></del-modal>
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
      role_id: "",
      role_list: [],
      role_name: "",
      p: 1,
      pageSize: 0,
      total_items: 0,
      columns: [
        {
          title: "用户id",
          key: "uid"
        },
        {
          title: "永久",
          key: "is_permanence"
        },
        {
          title: "初始化",
          key: "init"
        },
        {
          title: "到期时间",
          key: "end_date"
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
                      this.role_list_info(params.index);
                    }
                  }
                },
                "查看用户角色"
              )
            ]);
          }
        }
      ],
      data: [],
      // 清空用户角色模态框显示隐藏
      emptyShow: false,
      //清空用户角色模态框配置
      emptyModal: {
        //宽度
        width: 300,
        // 头部标题
        head: "清空角色用户信息",
        //按钮名
        button: "清空",
        //信息
        info: [],
        //删除
        delInfo: {
          url: "rbac@/user/empty_user_role",
          data: { role_id: "" }
        }
      }
    };
  },
  methods: {
    roleChange(value) {
      this.p = 1;
      for (let i of this.role_list) {
        if (this.role_id == i.id) {
          this.role_name = i.name;
        }
      }
      this.loading();
    },
    // 页码切换
    pageChange(p) {
      this.p = p;
      this.loading();
    },
    loading() {
      this.spinShow=true;
      this.$socket(
        "rbac@/user/role_user_list",
        { p: this.p, role_id: this.role_id },
        res => {
          this.data = res.d.items;
          this.pageSize = res.d.limit;
          this.total_items = res.d.total_items;
          this.spinShow=false;
        }
      );
    },
    //清除角色用户
    empty() {
      this.emptyModal.info = [];
      this.emptyModal.delInfo.data.role_id = this.role_id;
      this.emptyModal.info.push({ title: "清空角色:", value: this.role_name });
      this.emptyShow = true;
    },
    //清除角色用户角色成功
    emptySuccess() {
      this.p = 1;
      this.loading();
      this.emptyShow = false;
    },
    //清除角色用户角色失败
    emptyError(e) {
    },
    //查看用户的角色
    role_list_info(index){
      this.$router.push({ name: 'user-role-manage', params: { user_id: this.data[index].uid }});
    }
  },
  created() {
    this.$socket("rbac@/role/role_list", {}, res => {
      this.role_list = res.d;
      this.role_id = res.d[0].id;
      this.role_name = res.d[0].name;
      this.loading();
    });
  }
};
</script>

<style>

</style>
