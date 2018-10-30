import Vue from 'vue';
import {ajax} from './ajax';
import config from '@/config/config'
let token={
    get(){
        //获取
        let jwt_token =Vue.ls.get('jwt-token',false);
        return jwt_token;
        
    },
    set(new_token){
        //设置
        let re =Vue.ls.set('jwt-token',new_token,config.token_time);
        return re;
    },
    can(callback){
        //当token存在的时候执行
        let jwt_token =Vue.ls.get('jwt-token',false);
        console.log('jwt_token',jwt_token);
        if(jwt_token==false){
            //token不存在就先获取token在执行回调函数
            ajax('getsid',{},(ddd)=>{
               this.set(ddd.data.data);
               callback.call();

            });

        }else{
            callback.call();
        }
    }
}
export default token;
