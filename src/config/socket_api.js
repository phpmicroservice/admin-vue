export default {
    // 初始化sid
    init_sid: {
        mt: "user@/init_sid"
    },
    // 用户注册
    user_index_reg: {
        mt: "user@/index/reg"
    },
    // 用户登录
    user_index_login: {
        mt: "user@/index/login"
    },

    /** RABC管理 */
    /*资源管理*/
    // 资源列表
    resources_list:{
        mt:"rbac@/resources/resources_list"
    },
    //增加资源
    resources_add:{
        mt:"rbac@/resources/add_resources"
    },
    //资源信息
    resources_info:{
        mt:"rbac@/resources/resources_info"
    },
    //编辑资源
    resources_edit:{
        mt:"rbac@/resources/edit_resources"
    },
    //删除资源
    resources_del:{
        mt:"rbac@/resources/del_resources"
    },

    /*角色管理*/
    //角色列表
    role_list:{
        mt:"rbac@/role/role_list"
    },
    //增加角色
    role_add:{
        mt:"rbac@/role/add_role"
    },
    //角色信息
    role_info:{
        mt:"rbac@/role/roleinfo"
    },
    //编辑角色
    role_edit:{
        mt:"rbac@/role/edit_role"
    },
    //删除角色
    role_del:{
        mt:"rbac@/role/del_role"
    },

    /*用户管理*/
    //角色用户列表
    role_user_list:{
        mt:"rbac@/user/role_user_list"
    },
    //判断用户角色
    role_user_is:{
        mt:"rbac@/user/role_user_is"
    },
    //增加用户的角色
    user_add_role:{
        mt:"rbac@/user/user_add_role"
    },
    //清空角色的用户信息
    empty_user_role:{
        mt:"rbac@/user/empty_user_role"
    },
    //删除 用户的角色
    user_del_role:{
        mt:"rbac@/user/user_del_role"
    },
    //用户角色列表
    user_role_list:{
        mt:"rbac@/user/user_role_list"
    },

    /*权限管理*/
    // 权限列表
    auth_list:{
        mt:"rbac@/Authority/auth_list"
    },
    // 增加权限
    add_auth:{
        mt:"rbac@/Authority/add_auth"
    },
    // 编辑权限
    edit_auth:{
        mt:"rbac@/Authority/edit_auth"
    },
    // 权限 信息 单条
    auth_info:{
        mt:"rbac@/Authority/auth_info"
    },
    // 权限 删除 1
    del_auth:{
        mt:"rbac@/Authority/del_auth"
    },
    // 权限 删除 2
    del_auth2:{
        mt:"rbac@/Authority/del_auth2"
    },

    /*管理*/
    //刷新缓存
    update_cache:{
        mt:"rbac@/admin/updateCache"
    },
}