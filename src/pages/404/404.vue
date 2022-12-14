<template>
    <top />
    <div class="login-content">
        <div>
            <img class="img-404" src="../../assets/404.png" data-src="" alt="img">
            <div class="div-404">{{page_title}}，请检查网址是否完整。</div>
            <router-link to="./" class="a-href"  target="_self" title=""><div class="div-404-back"><-返回首页</div></router-link>
        </div>

    </div>
    <foot />
    <div class="clear"></div>
</template>

<script>
import top from "/@/components/top.vue";
import foot from "/@/components/foot.vue";
import axios from "axios";
export default {
    name: "404",
    data(){
        let that = this;
        return {
            page_title: "",
        };
    },
    components: {
        top,
        foot,
    },
    setup(props, context) { // 系统创建完成
        let that = this;
    },
    mounted(props, context) { // 组件初始化完成
        let that = this;
        that.page_title = document.title;
    },
}
</script>

<style scoped>
    .login-content{
        padding: 40px 0;
    }
    .img-404{
        width: 300px;
        margin: 0 auto;
        display: block;
        border-radius: 5px;
    }
    .div-404{
        font-size: 16px;
        color: black;
        letter-spacing: 1px;
        padding: 20px 10px;
        text-align: center;
        line-height: 30px;
    }
    .div-404-back{
        font-size: 16px;
        letter-spacing: 1px;
        text-align: center;
    }

</style>
