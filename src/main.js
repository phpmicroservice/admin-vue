import Vue from 'vue';
import iView from 'iview';
import {
    router
} from './router/index';
import {
    appRouter
} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import '!style-loader!css-loader!less-loader!./assets/less/connom.less';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import VueLocalStorage from 'vue-ls';
import lodash from 'lodash';
import config from './config/config';
import vendors from '@/vendors/index.js';
import libs from '@/libs/index.js';
import myComponents from '@/components';

Vue.use(VueI18n);
Vue.use(iView);
Vue.use(VueLocalStorage, {
    namespace: 'vuejs__'
});
Vue.use(myComponents);
Vue.prototype.$lodash = lodash;
Vue.prototype.$config = config;
Vue.prototype.$ajax = vendors.ajax;
Vue.prototype.$socket = vendors.socket;
Vue.prototype.$date = libs.date;
let vue=new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        util.checkUpdate(this);
    },
    created() {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
export {vue}