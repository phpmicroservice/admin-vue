import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const regRouter = {
    path: '/reg',
    name: 'reg',
    meta: {
        title: 'reg - 注册'
    },
    component: () => import('@/views/reg.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
        /*RABC管理 */
        //用户角色管理
        { path: 'user-role-manage/:user_id', title: '用户角色管理', name: 'user-role-manage', component: () => import('@/views/rabc/user-manage/user-role-manage.vue') },
        /*CMS*/
        //文章相关
        //文章增加
        { path: 'cms-artivle-add', title: '文章增加', name: 'cms-artivle-add', component: () => import('@/views/cms/cms-artivle-manage/cms-artivle-add.vue') },
        //编辑文章
        { path: 'cms-artivle-edit/:artivle_id', title: '文章编辑', name: 'cms-artivle-edit', component: () => import('@/views/cms/cms-artivle-manage/cms-artivle-edit.vue') },

        /*BBS*/
        //主题增加
        { path: 'bbs-theme-add', title: '主题增加', name: 'bbs-theme-add', component: () => import('@/views/bbs/bbs-theme-manage/bbs-theme-add.vue') },
        //主题编辑
        { path: 'bbs-theme-edit/:theme_id', title: '主题编辑', name: 'bbs-theme-edit', component: () => import('@/views/bbs/bbs-theme-manage/bbs-theme-edit.vue') },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    //概况
    {
        path: '/general-situation',
        icon: 'fa fa-line-chart icon',
        name: 'general-situation',
        title: '概况',
        component: Main,
        children: [
            { path: 'index', title: '概况', name: 'general-situation-index', component: () => import('@/views/general-situation/general-situation.vue') }
        ]
    },
    //基本信息
    {
        path: '/basic-information',
        icon: 'fa fa-tasks icon',
        name: 'basic-information',
        title: '基本信息',
        component: Main,
        children: [
            { path: 'background-page', title: '后台首页', name: 'background-page', component: () => import('@/views/basic-information/background-page/background-page.vue') },
            { path: 'change-password', title: '修改密码', name: 'change-password', component: () => import('@/views/basic-information/change-password/change-password.vue') },
            { path: 'personal-data', title: '个人资料', name: 'personal-data', component: () => import('@/views/basic-information/personal-data/personal-data.vue') },
            { path: 'admin-list', title: '管理员列表', name: 'admin-list', component: () => import('@/views/basic-information/admin-list/admin-list.vue') },
            { path: 'web-map', title: '网站地图', name: 'web-map', component: () => import('@/views/basic-information/web-map/web-map.vue') },
            { path: 'data-analysis', title: '数据分析', name: 'data-analysis', component: () => import('@/views/basic-information/data-analysis/data-analysis.vue') },
        ]
    },
    //系统设置
    {
        path: '/system-setting',
        icon: 'fa fa-gear icon',
        name: 'system-setting',
        title: '系统设置',
        component: Main,
        children: [
            { path: 'site-config', title: '站点配置', name: 'site-config', component: () => import('@/views/system-setting/site-config/site-config.vue') },            
            { path: 'commission-setting', title: '抽成设置', name: 'commission-setting', component: () => import('@/views/system-setting/commission-setting/commission-setting.vue') },
            { path: 'merchant-generalize-brokerage', title: '商家推广分佣', name: 'merchant-generalize-brokerage', component: () => import('@/views/system-setting/merchant-generalize-brokerage/merchant-generalize-brokerage.vue') },
            { path: 'user-generalize-brokerage', title: '用户推广分佣', name: 'user-generalize-brokerage', component: () => import('@/views/system-setting/user-generalize-brokerage/user-generalize-brokerage.vue') },
            { path: 'integral-setting', title: '积分设置', name: 'integral-setting', component: () => import('@/views/system-setting/integral-setting/integral-setting.vue') },
            { path: 'blogroll', title: '友情链接', name: 'blogroll', component: () => import('@/views/system-setting/blogroll/blogroll.vue') },
            { path: 'city-region', title: '城市区域', name: 'city-region', component: () => import('@/views/system-setting/city-region/city-region.vue') },
            { path: 'advertising-manage', title: '广告管理', name: 'advertising-manage', component: () => import('@/views/system-setting/advertising-manage/advertising-manage.vue') },
            { path: 'nav-manage', title: '导航管理', name: 'nav-manage', component: () => import('@/views/system-setting/nav-manage/nav-manage.vue') },
            { path: 'hot-search', title: '热门搜索词', name: 'hot-search', component: () => import('@/views/system-setting/hot-search/hot-search.vue') },
            { path: 'courier-services-company', title: '快递公司', name: 'courier-services-company', component: () => import('@/views/system-setting/courier-services-company/courier-services-company.vue') },
            { path: 'nav-bottom', title: '底部导航', name: 'nav-bottom', component: () => import('@/views/system-setting/nav-bottom/nav-bottom.vue') },
            { path: 'message-recorder', title: '短信记录', name: 'message-recorder', component: () => import('@/views/system-setting/message-recorder/message-recorder.vue') },
            { path: 'user-action-manage', title: '用户行为管理', name: 'user-action-manage', component: () => import('@/views/system-setting/user-action-manage/user-action-manage.vue') },
            { path: 'wap-bottom-menu', title: 'WAP底部菜单', name: 'wap-bottom-menu', component: () => import('@/views/system-setting/wap-bottom-menu/wap-bottom-menu.vue') },
            { path: 'payment-manage', title: '付款管理', name: 'payment-manage', component: () => import('@/views/system-setting/payment-manage/payment-manage.vue') },
            { path: 'platform-express', title: '平台快报', name: 'platform-express', component: () => import('@/views/system-setting/platform-express/platform-express.vue') },
            { path: 'about', title: '关于我们', name: 'about', component: () => import('@/views/system-setting/about/about.vue') },
            { path: 'guess-you-like', title: '猜你喜欢', name: 'guess-you-like', component: () => import('@/views/system-setting/guess-you-like/guess-you-like.vue') },
            { path: 'generalize-poster', title: '推广海报', name: 'generalize-poster', component: () => import('@/views/system-setting/generalize-poster/generalize-poster.vue') },
            { path: 'wap-index-setting', title: 'WAP首页附近设置', name: 'wap-index-setting', component: () => import('@/views/system-setting/wap-index-setting/wap-index-setting.vue') },
        ]
    },
    //RABC
    {
        path:'/rabc',
        icon: 'key',
        native_icon:true,
        name:'RABC',
        title:'RABC管理',
        component:Main,
        children:[
            { path: 'resoures-manage', title: '资源管理', name: 'resoures-manage', component: () => import('@/views/rabc/resoures-manage/resoures-manage.vue') },
            { path: 'role-manage', title: '角色管理', name: 'role-manage', component: () => import('@/views/rabc/role-manage/role-manage.vue') },
            { path: 'user-manage', title: '用户管理', name: 'user-manage', component: () => import('@/views/rabc/user-manage/user-manage.vue') },
            { path: 'role-auth-manage', title: '权限管理', name: 'role-auth-manage', component: () => import('@/views/rabc/role-auth-manage/role-auth-manage.vue') },
            { path: 'rabc-manage', title: 'RABC管理', name: 'rabc-manage', component: () => import('@/views/rabc/rabc-manage/rabc-manage.vue') },
        ]
    },
    //CMS
    {
        path:'/cms',
        icon: 'document-text',
        native_icon:true,
        name:'cms',
        title:'CMS管理',
        component:Main,
        children:[
            { path: 'cms-channel-manage', title: 'CMS分类频道管理', name: 'cms-channel-manage', component: () => import('@/views/cms/cms-channel-manage/cms-channel-manage.vue') },
            { path: 'cms-artivle-manage', title: 'CMS文章管理', name: 'cms-artivle-manage', component: () => import('@/views/cms/cms-artivle-manage/cms-artivle-manage.vue') },
        ]
    },
    //BBS
    {
        path:'/bbs',
        icon:'chatbubble-working',
        native_icon:true,
        name:'bbs',
        title:'BBS论坛',
        component:Main,
        children:[
            { path: 'bbs-channel-manage', title: 'BBS分类频道管理', name: 'bbs-channel-manage', component: () => import('@/views/bbs/bbs-channel-manage/bbs-channel-manage.vue') },
            { path: 'bbs-theme-manage', title: 'BBS主题管理', name: 'bbs-theme-manage', component: () => import('@/views/bbs/bbs-theme-manage/bbs-theme-manage.vue') },
        ]
    },
    //微信设置
    {
        path: '/weixin-setting',
        icon: 'fa fa-wechat icon',
        name: 'weixin-setting',
        title: '微信设置',
        component: Main,
        children: [
            { path: 'customize-menus', title: '自定义菜单', name: 'customize-menus', component: () => import('@/views/weixin-setting/customize-menus/customize-menus.vue') },
            { path: 'home-reply-config', title: '首页回复配置', name: 'home-reply-config', component: () => import('@/views/weixin-setting/home-reply-config/home-reply-config.vue') },
            { path: 'group-reply-config', title: '团购回复配置', name: 'group-reply-config', component: () => import('@/views/weixin-setting/group-reply-config/group-reply-config.vue') },
            { path: 'catering-reply-config', title: '餐饮回复配置', name: 'catering-reply-config', component: () => import('@/views/weixin-setting/catering-reply-config/catering-reply-config.vue') },
            { path: 'first-attention-reply', title: '首次关注回复', name: 'first-attention-reply', component: () => import('@/views/weixin-setting/first-attention-reply/first-attention-reply.vue') },
            { path: 'keyword-reply', title: '关键词回复', name: 'keyword-reply', component: () => import('@/views/weixin-setting/keyword-reply/keyword-reply.vue') },
            { path: 'template-message', title: '模板消息', name: 'template-message', component: () => import('@/views/weixin-setting/template-message/template-message.vue') },
            { path: 'invalid-keyword-reply', title: '无效关键词回复', name: 'invalid-keyword-reply', component: () => import('@/views/weixin-setting/invalid-keyword-reply/invalid-keyword-reply.vue') },
            { path: 'mass-list', title: '群发列表', name: 'mass-list', component: () => import('@/views/weixin-setting/mass-list/mass-list.vue') },
            { path: 'invalid-dialogue-list', title: '无效对话列表', name: 'invalid-dialogue-list', component: () => import('@/views/weixin-setting/invalid-dialogue-list/invalid-dialogue-list.vue') },
            { path: 'platform-channels-code-list', title: '平台渠道二维码列表', name: 'platform-channels-code-list', component: () => import('@/views/weixin-setting/platform-channels-code-list/platform-channels-code-list.vue') },
            { path: 'merchants-channels-code-list', title: '商家渠道二维码列表', name: 'merchants-channels-code-list', component: () => import('@/views/weixin-setting/merchants-channels-code-list/merchants-channels-code-list.vue') },
        ]
    },
    //快店管理
    // {
    //     path: '/store-manage',
    //     icon: 'fa fa-shopping-basket icon',
    //     name: 'store-manage',
    //     title: '快店管理',
    //     component: Main,
    //     children: [
    //         { path: 'store-class', title: '快店分类', name: 'store-class', component: () => import('@/views/store-manage/store-class/store-class.vue') },
    //         { path: 'stroe-discounts', title: '快店优惠', name: 'stroe-discounts', component: () => import('@/views/store-manage/stroe-discounts/stroe-discounts.vue') },
    //         { path: 'platform-distribution-shop', title: '平台配送店铺', name: 'platform-distribution-shop', component: () => import('@/views/store-manage/platform-distribution-shop/platform-distribution-shop.vue') },
    //         { path: 'store-order-form', title: '快店订单', name: 'store-order-form', component: () => import('@/views/store-manage/store-order-form/store-order-form.vue') },
    //         { path: 'conmodity-class', title: '商品分类', name: 'conmodity-class', component: () => import('@/views/store-manage/conmodity-class/conmodity-class.vue') },
    //     ]
    // },
    //商户管理
    {
        path: '/merchant-manage',
        icon: 'fa fa-cloud icon',
        name: 'merchant-manage',
        title: '商户管理',
        component: Main,
        children: [
            { path: 'merchant-list', title: '商户列表', name: 'merchant-list', component: () => import('@/views/merchant-manage/merchant-list/merchant-list.vue') },
            { path: 'merchant-hotice', title: '商户公告', name: 'merchant-hotice', component: () => import('@/views/merchant-manage/merchant-hotice/merchant-hotice.vue') },
            { path: 'check-pending-merchant-list', title: '待审核商家列表', name: 'check-pending-merchant-list', component: () => import('@/views/merchant-manage/check-pending-merchant-list/check-pending-merchant-list.vue') },
            { path: 'check-pending-store-list', title: '待审核店铺列表', name: 'check-pending-store-list', component: () => import('@/views/merchant-manage/check-pending-store-list/check-pending-store-list.vue') },
            { path: 'merchant-class-list', title: '商户分类列表', name: 'merchant-class-list', component: () => import('@/views/merchant-manage/merchant-class-list/merchant-class-list.vue') },
            { path: 'merchant-comment-list', title: '商户评论列表', name: 'merchant-comment-list', component: () => import('@/views/merchant-manage/merchant-comment-list/merchant-comment-list.vue') },
            { path: 'merchant-balance-manage', title: '商家余额管理', name: 'merchant-balance-manage', component: () => import('@/views/merchant-manage/merchant-balance-manage/merchant-balance-manage.vue') },
            { path: 'store-qualification-check', title: '店铺资质审核', name: 'store-qualification-check', component: () => import('@/views/merchant-manage/store-qualification-check/store-qualification-check.vue') },
            { path: 'merchunt-jurisdiction-pricing', title: '商家权限定价', name: 'merchunt-jurisdiction-pricing', component: () => import('@/views/merchant-manage/merchunt-jurisdiction-pricing/merchunt-jurisdiction-pricing.vue') },
        ]
    },
    //分类信息
    {
        path: '/class-info',
        icon: 'fa fa-newspaper-o icon',
        name: 'class-info',
        title: '分类信息',
        component: Main,
        children: [
            { path: 'info-class', title: '信息分类', name: 'info-class', component: () => import('@/views/class-info/info-class/info-class.vue') },
            { path: 'info-audit', title: '信息审核', name: 'info-audit', component: () => import('@/views/class-info/info-audit/info-audit.vue') },
            { path: 'info-publish-list', title: '信息发布列表', name: 'info-publish-list', component: () => import('@/views/class-info/info-publish-list/info-publish-list.vue') },
            { path: 'top-info-list', title: '置顶信息列表', name: 'top-info-list', component: () => import('@/views/class-info/top-info-list/top-info-list.vue') },
            { path: 'info-assure-order-form', title: '信息担保订单', name: 'info-assure-order-form', component: () => import('@/views/class-info/info-assure-order-form/info-assure-order-form.vue') }
        ]
    },
    //团购管理
    {
        path: '/group-manage',
        icon: 'fa fa-globe icon',
        name: 'group-manage',
        title: '分类信息',
        component: Main,
        children: [
            { path: 'group-class', title: '团购分类', name: 'group-class', component: () => import('@/views/group-manage/group-class/group-class.vue') },
            { path: 'commodity-manage', title: '商品管理', name: 'commodity-manage', component: () => import('@/views/group-manage/commodity-manage/commodity-manage.vue') },
            { path: 'check-pending-group', title: '待审核团购', name: 'check-pending-group', component: () => import('@/views/group-manage/check-pending-group/check-pending-group.vue') },
            { path: 'group-order-form', title: '团购订单', name: 'group-order-form', component: () => import('@/views/group-manage/group-order-form/group-order-form.vue') }
        ]
    },
    //用户管理
    // {
    //     path: '/user-manage',
    //     icon: 'fa fa-user icon',
    //     name: 'user-manage',
    //     title: '用户管理',
    //     component: Main,
    //     children: [
    //         { path: 'user-list', title: '用户列表', name: 'user-list', component: () => import('@/views/user-manage/user-list/user-list.vue') },
    //         { path: 'client-lead', title: '客户导入', name: 'client-lead', component: () => import('@/views/user-manage/client-lead/client-lead.vue') },
    //         { path: 'client-lead-list', title: '导入客户列表', name: 'client-lead-list', component: () => import('@/views/user-manage/client-lead-list/client-lead-list.vue') },
    //         { path: 'lv-manage', title: '等级管理', name: 'lv-manage', component: () => import('@/views/user-manage/lv-manage/lv-manage.vue') },
    //         { path: 'card-manage', title: '实体卡管理', name: 'card-manage', component: () => import('@/views/user-manage/card-manage/card-manage.vue') },
    //         { path: 'certification', title: '实名认证', name: 'certification', component: () => import('@/views/user-manage/certification/certification.vue') },
    //         { path: 'recharge-order-form-list', title: '充值订单列表', name: 'recharge-order-form-list', component: () => import('@/views/user-manage/recharge-order-form-list/recharge-order-form-list.vue') },
    //         { path: 'commission-change-user-list', title: '佣金过户用户列表', name: 'commission-change-user-list', component: () => import('@/views/user-manage/commission-change-user-list/commission-change-user-list.vue') },
    //         { path: 'merchants-members-card-rechange-record', title: '商家会员卡充值记录', name: 'merchants-members-card-rechange-record', component: () => import('@/views/user-manage/merchants-members-card-rechange-record/merchants-members-card-rechange-record.vue') }
    //     ]
    // },
    //推广营销
    {
        path: '/marketing',
        icon: 'fa fa-magic icon',
        name: 'marketing',
        title: '推广营销',
        component: Main,
        children: [
            { path: 'activity-list', title: '活动列表', name: 'activity-list', component: () => import('@/views/marketing/activity-list/activity-list.vue') },
            { path: 'platform-coupons', title: '平台优惠券', name: 'platform-coupons', component: () => import('@/views/marketing/platform-coupons/platform-coupons.vue') },
            { path: 'store-project', title: '快店专题', name: 'store-project', component: () => import('@/views/marketing/store-project/store-project.vue') }
        ]
    },
    //预约管理
    {
        path: '/appoint-manage',
        icon: 'fa fa-clock-o icon',
        name: 'appoint-manage',
        title: '预约管理',
        component: Main,
        children: [
            { path: 'appoint-serve-list', title: '预约服务列表', name: 'appoint-serve-list', component: () => import('@/views/appoint-manage/appoint-serve-list/appoint-serve-list.vue') },
            { path: 'store-technician-list', title: '商家店铺技师列表', name: 'store-technician-list', component: () => import('@/views/appoint-manage/store-technician-list/store-technician-list.vue') },
            { path: 'appoint-self-list', title: '预约自营列表', name: 'appoint-self-list', component: () => import('@/views/appoint-manage/appoint-self-list/appoint-self-list.vue') },
            { path: 'appoint-news', title: '预约新闻列表', name: 'appoint-news', component: () => import('@/views/appoint-manage/appoint-news/appoint-news.vue') },
        ]
    },
    //社区管理
    {
        path: '/community-manage',
        icon: 'fa fa-home icon',
        shrinkage:true,
        name: 'community-manage',
        title: '社区管理',
        component: Main,
        children: [
            { path: 'community-list', title: '小区列表', name: 'community-list', component: () => import('@/views/community-manage/community-list/community-list.vue') }      
        ]
    },
    //积分商城
    {
        path: '/integral-mall',
        icon: 'fa fa-gift icon',
        name: 'integral-mall',
        title: '积分商城',
        component: Main,
        children: [
            { path: 'gift-class', title: '礼品分类', name: 'gift-class', component: () => import('@/views/integral-mall/gift-class/gift-class.vue') },
            { path: 'gift-list', title: '礼品列表', name: 'gift-list', component: () => import('@/views/integral-mall/gift-list/gift-list.vue') },
            { path: 'order-list', title: '订单列表', name: 'order-list', component: () => import('@/views/integral-mall/order-list/order-list.vue') }        
        ]
    },
    //到店消费
    {
        path: '/the-shop',
        icon: 'fa fa-bank icon',
        name: 'the-shop',
        title: '到店消费',
        component: Main,
        children: [
            { path: 'offer-to-pay', title: '优惠买单', name: 'offer-to-pay', component: () => import('@/views/the-shop/offer-to-pay/offer-to-pay.vue') },  
            { path: 'store-cashier', title: '店内收银', name: 'store-cashier', component: () => import('@/views/the-shop/store-cashier/store-cashier.vue') }
        ]
    },






    // {
    //     path: '/access',
    //     icon: 'key',
    //     native_icon:true,
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     native_icon:true,
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     native_icon:true,
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: () => import('@/views/international/international.vue') }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     native_icon:true,
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             native_icon:true,
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             native_icon:true,
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             native_icon:true,
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             native_icon:true,
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             native_icon:true,
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             native_icon:true,
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             native_icon:true,
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             native_icon:true,
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     native_icon:true,
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose',native_icon:true, component: () => import('@/views/form/article-publish/article-publish.vue') },
    //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', native_icon:true,component: () => import('@/views/form/work-flow/work-flow.vue') }

    //     ]
    // },
    // // {
    // //     path: '/charts',
    // //     icon: 'ios-analytics',
    // //     name: 'charts',
    // //     title: '图表',
    // //     component: Main,
    // //     children: [
    // //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    // //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    // //     ]
    // // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     native_icon:true,
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move',native_icon:true, component: () => import('@/views/tables/dragable-table.vue') },
    //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit',native_icon:true, component: () => import('@/views/tables/editable-table.vue') },
    //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search',native_icon:true, component: () => import('@/views/tables/searchable-table.vue') },
    //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download',native_icon:true, component: () => import('@/views/tables/exportable-table.vue') },
    //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images',native_icon:true, component: () => import('@/views/tables/table-to-image.vue') }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     native_icon:true,
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', native_icon:true,component: () => import('@/views/advanced-router/mutative-router.vue') },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', native_icon:true,component: () => import('@/views/advanced-router/argument-page.vue') }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     native_icon:true,
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    regRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
