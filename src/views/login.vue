<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="username">
                            <Input v-model="form.username" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem class="go-reg-forget-password">                         
                            <span class="go-reg">没有账号?<span @click="goReg">立即注册</span></span>
                            <span class="forget-password">忘记密码</span>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入用户名和密码</p>                 
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        //跳转到注册
        goReg(){
            this.$router.push({name: 'reg'});
        },
        //登录
        handleSubmit () {        
            this.$refs.loginForm.validate((valid) => {
                if(valid){
                    this.$socket("user@/index/login",this.form,(res)=>{
                        if(res.d){
                            Cookies.set('user', this.form.username);
                            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                            Cookies.set('access', 0);
                            // if (this.form.userName === 'iview_admin') {
                            //     Cookies.set('access', 0);
                            // } else {
                            //     Cookies.set('access', 1);
                            // }                       
                            this.$router.push({
                                name: 'home_index'
                            });
                        }
                    },(error)=>{
                        this.$Notice.error({
                            title: '失败',
                            desc: error.m,
                            duration: 5
                        });
                    })
                }
            });
        }
    },
    created(){
        if(!this.$ls.get("ws-token")){
            location.reload();
        }
    }
};
</script>

<style>

</style>
