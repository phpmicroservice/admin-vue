<template>
  <div>
      <h2 class="title">文章列表</h2>
      <Button type="success" size="large" icon="plus" @click="add">新增文章</Button>
      <Table class="table" border stripe :columns="columns" :data="data"></Table>
      <Page :page-size="pageSize" :total="total_items" show-total show-elevator @on-change="pageChange"></Page>
      <!-- 加载中 -->
      <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
export default {
  data(){
    return {
      // 加载中
      spinShow:false,
      p: 1,
      pageSize: 0,
      total_items: 0,
      columns: [
        {
          title: "id",
          key: "content"
        },
        {
          title:"cms",
          key:"id"
        },
        {
          title:"cms类别",
          key:"category_id"
        },
        {
          title:"作者",
          key:"user_id"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title:"等级",
          key:"level"
        },
        {
          title:"状态",
          key:"status"
        },
        {
          title:"初始浏览量",
          key:"view"
        },
        {
          title:"创建时间",
          key:"create_time"
        },
        {
          title:"更新时间",
          key:"update_time"
        },
        {
          title: "操作",
          key: "action",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                "编辑文章"
              ),
            ]);
          }
        }
      ],
      data: []
    }
  },
  methods:{
    add(){
      this.$router.push({name:'cms-artivle-add'});
    },
    edit(index){
      this.$router.push({name:'cms-artivle-edit',params: { artivle_id: this.data[index].id }})
    },
    // 页码切换
    pageChange(p) {
      this.p = p;
      this.loading();
    },
    loading() {
      this.spinShow=true;
      this.$socket("cms@/Article/index",{ p: this.p },res => {
          for(let i of res.d.items){
            i.create_time=this.$date('YMD',i.create_time);
            i.update_time=this.$date('YMD',i.update_time);
          }
          this.data = res.d.items;
          this.pageSize = res.d.limit;
          this.total_items = res.d.total_items;
          this.spinShow=false;
        }
      );
    },
  },
  created(){
    this.loading();
  }
}
</script>

<style>

</style>
