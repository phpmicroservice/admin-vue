export default {
    is_login: {
        0: '/user/index/is_login',
        method: 'get',
        enctype: 'multipart/form-data',
        retype: 'string'
    },
    /*公共接口分组*/
    //超级登录
    s_login: {
        method: 'post',
        0: '/user/index/s_login',
        retype: 'json'
    },
    //获取sid
    getsid: {
        0: '/home/index/getsid',
        token: false,
        retype: 'json'
    },
    /*附件分组*/
    //上传文件
    upload: {
        0: '/file/upload/index',
        enctype: 'multipart/form-data',
        retype: 'json'
    },
    upload2: {
        0: '/home/upload/index',
        enctype: 'multipart/form-data',
        retype: 'json'
    },
}