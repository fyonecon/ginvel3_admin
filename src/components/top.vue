<template>
    <div class="top-content">
        <router-link to="./" class="a-href"  target="_self" title="">首页</router-link>

    </div>
    <div class="clear"></div>
</template>

<script>
    // 头部公共组件

    export default {
        name: "top",
        mounted(e) { // 组件初始化完成
            let that = this;
            that.common.log("nav >>> ");


        },
    }
</script>

<style scoped>

</style>