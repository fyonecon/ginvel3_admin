<template>
    <div>js</div>

    <div class="click click1" @click="test_click($event, 101)" :data-id="100">click</div>

    <foot />
    <div class="clear"></div>

    <must ref="page_must" :now_page="now_page" data-desc="接口和安全参数验证的必要全局组件"/>
    <div class="clear"></div>
</template>

<script>
    // 引入组件
    import foot from "../../components/foot.vue";
    import must from "../../config/must.vue";

    export default {
        name: "js",
        data(){
            let that = this;
            return {
                now_page: window.location.href,
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
        },
        methods: { // 组件局部函数集合
            start_this_page: function (e){ // 页面所有自定义函数起始
                let that = this;
                that.helper.log(["start_this_page函数已运行_" + e]);

            },
            test_click (el, num) {
                let that = this;

                let id = el.target.dataset.id;
                that.helper.log([id, num]);


            },


        },
    }
</script>

<style scoped>
    .click{
        cursor: pointer;
    }
    .click:hover{
        opacity: 0.8;
    }
</style>
