<template>
  <!-- 表单模态框 -->
    <Modal v-model="model" :width="config.width" @on-visible-change="modelChange">
        <p slot="header" style="text-align:center">
            <Icon type="information-circled" color="green"></Icon>
            <span>{{config.title}}</span>
        </p>
        <div style="font-weight:bold">
            <Form :ref="config.formName" :model="data" :label-width="80" :rules="resourcesValidate">
                <FormItem v-for="item in config.form" :label="item.label" :prop="item.name">
                    <!-- 如果是选择框类型 -->
                    <Select v-if="item.type=='select'" v-model="data[item.name]" style="width:100%">
                        <Option v-for="option in item.selectList" :value="option.value">{{ option.label }}</Option>
                    </Select>
                    <i-switch class="switch" v-else-if="item.type=='switch'" v-model="data[item.name]" size="large" :true-value="item.on" :false-value="item.off"></i-switch>
                    <Input v-else-if="item.type=='text'" v-model="data[item.name]" :type="item.type" :placeholder="item.placeholder"></Input>
                    <Input v-else-if="item.type=='textarea'" v-model="data[item.name]" :rows="item.rows" :type="item.type" :placeholder="item.placeholder"></Input>
                </FormItem>
            </Form>
        </div>  
        <div slot="footer">
            <Button type="success" size="large" long @click="submit(config.formName)">{{config.buttonName}}</Button>
        </div>     
    </Modal>
</template>

<script>
export default {
    data(){
        return {
            model:this.value,
            data:{},
            //验证信息
            resourcesValidate: {}
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
                return { 
                    //表单名
                    formName:'',
                    //宽度
                    width:0,
                    //标题
                    title:'',
                    //按钮名
                    buttonName:'',
                    //提交请求网址
                    submit:'',
                    //获取信息请求网址和发送数据
                    getInfo:{
                        url:'',
                        data:{}
                    },
                    //表单配置
                    form:[
                        {
                            //类型
                            type:'',
                            //初始值
                            value:'',
                            //label
                            label:'',
                            //占位符
                            placeholder:'',
                            //字段名称
                            name:'',
                            //类型为选择框时传值
                            selectList:[],
                            //类型为开关时传值
                            on:'',
                            off:'',
                            //验证(可传布尔值,true是只进行是否为空的验证,false为不验证)
                            verify:{
                                //正则表达式
                                reg:'',
                                //验证失败的提示
                                hint:''
                            }
                        }
                    ]
                }
            }
        }
    },
    methods:{
        //表单提交方法
        submit(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$socket(this.config.submit,this.data,(res)=>{
                        if(this.config.getInfo.url!=''){
                            this.$Notice.success({
                                title: '成功',
                                desc: '编辑成功',
                                duration: 5
                            });
                        }else{
                            this.$Notice.success({
                                title: '成功',
                                desc: '增加成功',
                                duration: 5
                            });
                        }
                        this.$emit("success",res);
                    },(error)=>{
                        this.$Notice.error({
                            title: '失败',
                            desc: error.m,
                            duration: 5
                        });
                        this.$emit("error",error);
                    })
                }else{
                    this.$Notice.error({
                            title: '失败',
                            desc: '表单验证失败!',
                            duration: 5
                    });
                }
            });
        },
        modelChange(value){
            this.$emit('input', value);
        },
        refresh(){
            //如果有需要获取的信息
            if(this.config.getInfo.url){
                this.$socket(this.config.getInfo.url,this.config.getInfo.data,(res)=>{
                    this.data=res.d;           
                })
            }else{
                for(let i of this.config.form){
                    this.data[i.name]=i.value;
                }
            }      
        },
        //验证方法
        validator(rule, value, callback) {
            let reg='';
            let hint='';
            for(let i of this.config.form){
                if(rule.field==i.name){
                    reg=i.verify.reg;
                    hint=i.verify.hint;
                }
            }
            if (!reg.test(value)) {
                return callback(new Error(hint));
            } else {
                callback();
            }
        },
    },
    watch:{
        value(){
            if(this.value){
                this.refresh();
            }
            this.model=this.value;
        }
    },
    created(){
        // 添加验证
        for(let i of this.config.form){
            if(i.verify){
                this.resourcesValidate[i.name]=[{ required: true, message: i.label+'不能为空', trigger: 'blur' }];
                if(i.verify.reg){
                    this.resourcesValidate[i.name].push({ validator: this.validator, trigger: 'blur' });
                }
            }
        }
    }
};
</script>

<style lang="less">
    .ivu-switch-checked{
        background:#19BE6B !important;
        border-color:#1dcd71 !important;
    }
</style>
