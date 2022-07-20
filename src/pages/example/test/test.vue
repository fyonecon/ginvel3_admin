<template>
    <top />

    <div class="page-content">
        <div>test</div>

    </div>

    <foot />
    <must ref="page_must" data-desc="接口和安全参数验证的必要全局组件" />
</template>

<script>
    // 引入组件
    import top from "/@/components/top.vue";
    import foot from "/@/components/foot.vue";
    import must from "/@/bootstrap/config/must.vue";


    export default {
        name: "test",
        data(){
            let that = this;
            return {

            };
        },
        components: {
            top,
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
                let page_name = that.$options.name;
                let page_data = that.$options.mounted;
                that.page_help.loaded(page_name, page_data);
                that.helper.log(["start_this_page函数已运行_" + page_name]);

                // 其他


            },

        },
    }
</script>

<style scoped>

</style>
