<template>
    <top />

    <div class="page-content">
        <div>home</div>
        <div>{{page_txt}}</div>
        <div>{{must_data}}</div>
        <div>
            <img class="img1" src="../../assets/img/test1.jpg" data-src="" alt="img">
        </div>


    </div>

    <foot />
    <must ref="page_must" @page_must="show_must" :now_page="now_page" />

</template>

<script>
    // 引入组件
    import top from "/@/components/top.vue";
    import foot from "/@/components/foot.vue";
    import must from "/@/bootstrap/config/must.vue";

    export default {
        name: "home",
        data(){
            let that = this;
            return {
                page_txt: "home==22==",
                now_page: window.location.href,
                must_data: 'null-must',
            };
        },
        components: {
            top,
            foot,
            must
        },
        setup() { // 系统创建完成
            let that = this;
        },
        mounted(e) { // 组件初始化完成
            let that = this;
            that.helper.log(e);

            let test_data = that.helper.set_cache('test_date', '==test-data==');
            that.helper.log(['home=test_data', test_data]);

            let id = that.helper.get_url_param("", "id");
            that.helper.log(id?id:"id=null")

        },
        methods: { // 组件局部函数集合
            start_this_page: function (any){ // 页面所有自定义函数起始
                let that = this;
                let page_name = that.$options.name;
                let page_data = that.$options.mounted;
                that.helper.log(["start_this_page函数已运行_" + page_name]);
                //
                that.page_help.loaded(page_name, page_data);

            },

            show_must(data){
                this.helper.log(["show_must= ", data]);
                this.must_data = data;
            },

        },
    }
</script>

<style scoped>
  .img1{
    width: 200px;
    display: block;
    margin: 0 auto;
    border-radius: 50px;
  }
</style>
