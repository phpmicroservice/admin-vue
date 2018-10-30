import Env from './env.js';
import Qs from 'qs';
import build_time_json from './build_time.json';
import Xitong_1 from './xitong';
import Xitongdev from './xitong.dev';
let Xitong;
if(Env === 'development'){
    Xitong = Xitongdev;
}else{
    Xitong = Xitong_1;
}
let config = {
    scoket_url:Xitong.scoket_url,

    axios:{
        baseURL: Xitong.base_url,
        timeout:10000,
        paramsSerializer: (params)=>{
            return Qs.stringify(params);
        },
        transformRequest:(params)=>{
            return Qs.stringify(params);
        }
    },
    download_url:Xitong.download_url,
    editor_url: Xitong.editor_url,
    site_url: Xitong.site_url,
    share_url:Xitong.share_url,
    vue_html:'index.html',
    img_path_url:'/',
    env: Env,
    corder:{
        app_id:'123456'
    },
    verification_sms:{
        url:Xitong.validation_url,
        appid:1,
        operation:1,

    },
    verification_login:{
        url:Xitong.validation_url,
        appid:1,
        operation:2,

    },
    build_time_json:build_time_json,
    token_time:1000*60*60*24*30
};
export default config;