<template>
    <div class="clear"></div>
    <div class="top-content select-none">
<!--        <router-link to="./" class="a-href"  target="_self" title="">首页</router-link>-->
        <div class="nav-title" title="Ginvel3后台管理系统">
            <img class="nav-height nav-logo" src="../assets/launcher.png" alt="Logo">
        </div>
        <div class="nav-menu">
            <router-link to="./" class="a-href"  target="_self" title=""><div class="nav-height nav-menu-item nav-name-home click">数据统计</div></router-link>
            <router-link to="./admin" class="a-href"  target="_self" title=""><div class="nav-height nav-menu-item nav-name-admin click">管理账户</div></router-link>
        </div>
        <div class="nav-admin">
            <div class="nav-height nav-admin-info ">（等待登录...）</div>
        </div>

        <div class="clear"></div>
    </div>
    <div class="clear"></div>
</template>

<script>
    // 头部公共组件

    export default {
        name: "top",
        mounted(e) { // 组件初始化完成
            let that = this;
            that.helper.log("nav >>> ");


        },
    }
</script>

<style scoped>
    .top-content{
        width: 100%;
        height: 50px;
        background: #3a8ee6;
        font-size: 16px;
        box-shadow: 0 5px 5px rgba(0,0,0,0.2);
    }
    .nav-height{
        height: 50px;
        line-height: 50px;
    }
    .nav-title{
        width: calc(50px - 20px);
        height: calc(50px - 20px);
        padding: 10px 10px;
        overflow: hidden;
        float: left;
        text-align: center;
    }
    .nav-title > .nav-logo{
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
        background: rgba(0,0,0,0.1);
        border: none;
    }
    .nav-menu{
        width: calc(100% - 200px);
        display: inline-block;
        overflow: hidden;
        float: left;
    }
    .nav-admin{
        width: calc(150px - 20px);
        padding: 0 10px;
        /*background: rgba(0,0,0,0.2);*/
        overflow: hidden;
        float: left;
    }
    .nav-admin-info{
        text-align: right;
        color: orange;
    }
    .nav-menu-item{
        display: inline-block;
        letter-spacing: 1px;
        padding: 0 10px;
        color: white;
    }
    .nav-menu-item:hover{
        opacity: 0.8;
        background: rgba(0,0,0,0.1);
    }
    .nav-menu-item:active{
        opacity: 0.6;
        background: rgba(0,0,0,0.1);
    }
    .nav-menu-item-active{
        color: orange;
        background: rgba(0,0,0,0.1);
    }

</style>