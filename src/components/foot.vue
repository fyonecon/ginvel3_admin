<template>
    <div class="clear"></div>
    <div class="foot-content">
<!--        <router-link to="./" class="a-href"  target="_self" title="">首页</router-link>-->
        <div class="foot-title">
            <div class="foot-info">{{app_copyright}}</div>
            <div class="foot-info">{{app_name}}·{{app_version}}</div>
            <div class="foot-info">{{app_support}}</div>
        </div>
<!--        <div class="foot-item">-->
<!--            <span class="foot-info app-support">{{app_support}}</span>-->
<!--        </div>-->

    </div>
    <div class="clear"></div>
</template>

<script>
    // 尾部公共组件

    export default {
        name: "foot",
        data(){
            let that = this;
            return {
                app_copyright: that.config.app.app_copyright,
                app_name: that.config.app.app_name,
                app_version: that.config.app.app_version,
                app_support: that.config.app.app_support,

            };
        },
        mounted(e) { // 组件初始化完成
            let that = this;
            that.helper.log("foot >>> ");
        },
        methods: {

        },
    }
</script>

<style scoped>
    .foot-content{
        margin-top: 50px;
        padding: 0 10px 10px 10px;
    }
    .foot-title{
        line-height: 30px;
        padding: 10px 0 0 0;
        color: gray;
        border-top: 1px solid rgba(0,0,0,0.1);
    }
    .foot-info{
        margin-right: 20px;
        display: inline-block;
    }

</style>
