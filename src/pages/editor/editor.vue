<template>
    <h3>editor</h3>
    <router-link to='/' class="a-href"  target="_self" title="">首页</router-link>

    <div id="wang-editor1"></div>

    <foot />
    <div class="clear"></div>

    <must ref="page_must" data-desc="接口和安全参数验证的必要全局组件"/>
    <div class="clear"></div>
</template>

<script>
    // 引入组件
    import foot from "../../components/foot.vue";
    import must from "../../config/must.vue";
    import E from 'wangeditor'; // 导入插件

    export default {
        name: "editor",
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
            that.editor1_init();

        },
        methods: { // 组件局部函数集合
            start_this_page: function (e){ // 页面所有自定义函数起始
                let that = this;
                that.common.log(["start_this_page函数已运行_" + e]);

            },

            // 初始化富文本编辑器，支持单页多开
            // 文档https://www.wangeditor.com/
            editor1_init: function (e) {
                let that = this;

                const editor1 = new E('#wang-editor1');

                editor1.config.height = 300; // 编辑器高度，px
                editor1.config.uploadImgMaxSize = 5 * 1024 * 1024;  // 5M
                editor1.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
                editor1.config.uploadImgMaxLength = 12; // 一次最多上传 12 个图片

                editor1.config.uploadImgServer = 'https://xcx.ggvs.cn/shequ/public/index.php/api/enhance/upload_form_file?upload_token=laotie666'; // 图片上传接口。 post + upload_form_file
                editor1.config.withCredentials = false; // false跨域而不传cookies
                editor1.config.uploadImgTimeout = 20 * 1000; // ms，超时时间

                editor1.config.menus = [ // 菜单显示
                    // 'head',
                    'bold',
                    'fontSize',
                    'fontName',
                    'italic',
                    'underline',
                    'strikeThrough',
                    'indent',
                    'lineHeight',
                    'foreColor',
                    'backColor',
                    'link',
                    'list',
                    'todo',
                    'justify',
                    'quote',
                    // 'emoticon',
                    'image',
                    'video',
                    'table',
                    // 'code',
                    'splitLine',
                    'undo',
                    'redo',
                ];

                editor1.config.uploadImgHooks = { // 图片上传过程的回调
                    // 上传图片之前
                    before: function(xhr) {
                        console.log(xhr);
                        that.$message('正在上传');
                    },
                    // 图片上传并返回了结果，图片插入已成功
                    success: function(xhr) {
                        console.log('success', xhr);
                    },
                    // 图片上传并返回了结果，但图片插入时出错了
                    fail: function(xhr, editor, resData) {
                        console.log('fail', resData);
                    },
                    // 上传图片出错，一般为 http 请求的错误
                    error: function(xhr, editor, resData) {
                        console.log('error', xhr, resData);
                    },
                    // 上传图片超时
                    timeout: function(xhr) {
                        console.log('timeout');
                    },
                    // 图片上传并返回了结果，想要自己把图片插入到编辑器中
                    customInsert: function(insertImgFn, result) {
                        that.$message('上传完成');
                        // result 即服务端返回的接口
                        console.log('customInsert', result);

                        let img = that.config.file_url + result.content.file_name;
                        insertImgFn(img); // 可把图片插入到编辑器，传入图片src
                        editor1.txt.append('<p><br></p>'); // 添加一个换行
                    }
                };

                editor1.create();
            },

        },
    }
</script>

<style scoped>

</style>
