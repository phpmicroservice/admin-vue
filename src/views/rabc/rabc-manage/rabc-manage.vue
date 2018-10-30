<template>
  <div>
      <h2 class="title">管理</h2>
      <Button type="success" size="large" icon="ios-loop-strong" @click="updateCache">刷新缓存</Button>
  </div>
</template>

<script>
export default {
    methods:{
        // 刷新缓存
        updateCache(){
            this.$socket("rbac@/admin/updateCache",{},res=>{
                this.$Notice.success({
                    title: '成功',
                    desc: "刷新缓存成功!",
                    duration: 5
                });
            },error=>{
                this.$Notice.error({
                    title: '失败',
                    desc: error.m,
                    duration: 5
                });
            })
        }
    }
}
</script>

<style>

</style>
