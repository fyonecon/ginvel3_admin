<template>
    <div>upload_img</div>

    <div>
        <el-upload
            class="upload-demo"
            action="https://xcx.ggvs.cn/shequ/public/index.php/api/enhance/upload_form_file?upload_token=laotie666"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="9"
            :on-exceed="handleExceed"
            :file-list="fileList"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
                <div class="el-upload__tip">图片：jpg、jpeg、png、gif，不超过 5M</div>
            </template>
        </el-upload>
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

    export default {
        name: "upload_img",
        data(){
            let that = this;
            return {
                fileList: [
                    {
                        name: 'food.jpeg', 
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }, 
                    {
                        name: 'food2.jpeg', 
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }],

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
                that.common.log(["start_this_page函数已运行_" + e]);

            },

            // 开始-上传图片
            handleRemove(file, fileList) { // 直接移除图片
                let that = this;
                that.common.log(['直接移除图片', file, fileList]);

            },
            handlePreview(file) { // 预览图片
                let that = this;
                that.common.log(['预览图片', file.response]);
                
            },
            handleExceed(files, fileList) { // 超过限制
                let that = this;
                that.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) { // 确认后移除图片
                let that = this;
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
            // 结束-上传图片

        },
    }
</script>

<style scoped>

</style>
