<template>
    <div>
        swiper
    </div>

    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>

    <foot />
    <div class="clear"></div>

    <must ref="page_must" data-desc="接口和安全参数验证的必要全局组件"/>
    <div class="clear"></div>
</template>

<script>
    // 引入组件
    import foot from "../../components/foot.vue";
    import must from "../../config/must.vue";

    import Swiper from 'swiper/swiper-bundle.esm.browser.min.js';
    // import { Swiper } from "swiper"
    import 'swiper/swiper-bundle.min.css';

    export default {
        name: "swiper",
        data(){
            let that = this;
            return {

            };
        },
        components: {
            foot,
            must
        },
        setup(props, context) { // 系统创建完成
            let that = this;
        },
        mounted(props, context) { // 组件初始化完成
            let that = this;

            that.show_swiper();

        },
        methods: { // 组件局部函数集合
            start_this_page: function (e){ // 页面所有自定义函数起始
                let that = this;
                that.common.log(["start_this_page函数已运行_" + e]);

            },
            show_swiper: function () {
                /**初始化轮播图 */
                new Swiper('.swiper-container', {
                    loop: true,
                    speed: 500,
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    },
                    keyboard: true,  //键盘切换

                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },

                    // // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });

            },

        },
    }
</script>

<style scoped>
    .swiper-container {
        width: 100%;
        height: 200px;
        /* background: #3399ff; */
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 30px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }

    .swiper-container {
        --swiper-theme-color: #f00; /* 设置Swiper风格 */
        --swiper-pagination-color: #f00; /* 分页器颜色 */
        --swiper-navigation-color: #f00; /* 单独设置按钮颜色 */
        --swiper-navigation-size: 40px; /* 设置按钮大小 */
    }
</style>
