<template>
  <!-- 删除模态框 -->
  <Modal v-model="model" :width="config.width" @on-visible-change="modelChange">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>{{config.head}}</span>
        </p>
        <div style="text-align:center">
            <p v-if="config.title">{{config.title}}</p>
            <p v-for="item in config.info">{{item.title}}：{{item.value}}</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" @click="remove">{{config.button}}</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    data(){
        return {
            model:this.value
        }
    },
    props:{
        //显示隐藏
        value:{
            type:Boolean,
            default:false
        },
        //配置
        config:{
            type: Object,
            default: function () {
                return{
                    //宽度
                    width:300,
                    // 头部标题
                    head:'',
                    //按钮名
                    button:'',
                    //信息
                    info:[
                        {title:'',value:''}
                    ],
                    //删除
                    delInfo:{
                        url:'',
                        data:{}
                    }
                }
            }
        }
    },
    methods:{
        remove(){
            this.$socket(this.config.delInfo.url,this.config.delInfo.data,(res)=>{
                this.$Notice.success({
                    title: '成功',
                    desc: '删除成功',
                    duration: 5
                });
                this.$emit("success",res);
            },(error)=>{
                this.$Notice.error({
                    title: '失败',
                    desc: error.m,
                    duration: 5
                });
                this.$emit("error",error);
            })
        },
        modelChange(value){
            this.$emit('input', value);
        },
    },
    watch:{
        value(){
            this.model=this.value;
        }
    },
}
</script>

<style>

</style>
