<template>
    <div class="foot-content">
        <div class="clear"></div>
        <router-link to="./" class="a-href"  target="_self" title="">首页</router-link>

    </div>
</template>

<script>
    // 尾部公共组件

    export default {
        name: "foot",
        mounted(e) { // 组件初始化完成
            let that = this;
            that.common.log("foot >>> ");
            

        },
    }
</script>

<style scoped>

</style>
