// 注册路由，vue3+vite专用
import {config} from "../bootstrap/config/config";

import home from '../pages/home/home.vue';
import login from '../pages/login/login.vue';
import page_404 from '../pages/404/404.vue';

import admin from '../pages/admin/admin.vue';

import example from '../pages/example/example.vue';
import example_test from '../pages/example/test/test.vue';
import editor from '../pages/editor/editor.vue';
import swiper from '../pages/swiper/swiper.vue';
import chart from '../pages/chart/chart.vue';
import qr from '../pages/qr/qr.vue';
import js from '../pages/js/js.vue';
import upload_img from '../pages/upload_img/upload_img.vue';
import emit_page1 from '../pages/emit/page1.vue';
import emit_page2 from '../pages/emit/page2.vue';

const routes = [ // 自定义路由名称
    { // 必要
        path: '/404',
        component: page_404,
        meta: { title: '页面404，路由错误' },
    },
    { // 必要
        path: '/login',
        component: login,
        meta: { title: '请先登录...' },
    },
    { // 必要
        path: '/',
        component: home,
        meta: { title: '首页' },
    },

    { //
        path: '/admin',
        component: admin,
        meta: { title: '管理账户' },
    },

    /*示例*/
    { // 示例
        path: '/example',
        component: example,
        meta: { title: '示例1' },
    },
    { // 示例
        path: '/example/test',
        component: example_test,
        meta: { title: '示例2' },
    },
    { // 示例
        path: '/editor',
        component: editor,
        meta: { title: '富文本编辑器' },
    },
    { // 示例
        path: '/swiper',
        component: swiper,
        meta: { title: 'swiper' },
    },
    { // 示例
        path: '/chart',
        component: chart,
        meta: { title: 'chart' },
    },
    { // 示例
        path: '/qr',
        component: qr,
        meta: { title: '合成二维码' },
    },
    { // 示例
        path: '/js',
        component: js,
        meta: { title: 'js处理元素、数组等' },
    },
    { // 示例
        path: '/upload_img',
        component: upload_img,
        meta: { title: '上传图片' },
    },
    { // 示例
        path: '/emit/page1',
        component: emit_page1,
        meta: { title: 'page1' },
    },
    { // 示例
        path: '/emit/page2',
        component: emit_page2,
        meta: { title: 'page2' },
    },

    /*其他路由*/


];


// 文档：https://next.router.vuejs.org/zh/guide/migration/index.html#%E5%88%A0%E9%99%A4-router-match-%E6%94%B9%E4%B8%BA-router-resolve
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// 路由模式
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

// 监控路由
router.beforeEach((to, from, next) => {
    // 监听路由变化
    let now_route = to.fullPath
    // try {console.log("当前路由："+to.fullPath);}catch (e) {}
    // 判断路由
    if (to.matched.length === 0) {  // 未匹配到路由
        next('/404');
    } else { // 匹配到路由
        // 修改页面title
        let page_title = '';
        try {
            page_title = to.meta.title;
        }catch (e) {
            page_title = '（没有配置meta.title名）';
        }
        if (page_title) {
            if (now_route === "/404" || now_route === "/login"){
                document.title = page_title;
            }else {
                document.title = page_title + " - " + config.title;
            }
        }else{
            document.title = config.title;
        }
        next();
    }
});

export default router;
