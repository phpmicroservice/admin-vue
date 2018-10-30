<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎注册
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
                        <FormItem prop="nickname">
                            <Input v-model="form.nickname" placeholder="请输入昵称">
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
                        <FormItem prop="password2">
                            <Input type="password" v-model="form.password2" placeholder="请确认密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem class="go-reg-forget-password">                         
                            <span class="go-reg">已有账号?<span @click="goLogin">登录</span></span>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>注册</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入注册信息</p>                 
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
                nickname: '',
                password: '',
                password2: ''
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' } 
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                password2: [
                    { validator: this.validatevalue, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        //值验证方法
        validatevalue(rule, value, callback) {
            if(value!=this.form.password){
                return callback(new Error('再次输入的密码不一致'));
            }else {
                callback();
            }
        },
        //跳转到注册
        goLogin(){
            this.$router.push({name: 'login'});
        },
        //登录
        handleSubmit () {        
            this.$refs.loginForm.validate((valid) => {
                if(valid){
                    this.$socket("user@/index/reg",this.form,(res)=>{
                        if(res.d){
                            this.$Notice.success({
                                title: '成功',
                                desc: '注册成功',
                                duration: 5
                            });
                            this.$router.push({
                                name: 'login'
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
    }
};
</script>

<style>

</style>
