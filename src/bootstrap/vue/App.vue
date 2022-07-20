<template>
  <div class="app-content">
    <router-view ref="page"></router-view>
    <div class="hide">{{app_data}}</div>
    <div class="clear"></div>
  </div>
</template>

<script>

  export default {
    name: "App",
    components: {},
    setup(){ // 系统创建完成
      let that = this;
      // console.log("=setup");
      return {
        app_data: "==app==",
      };
    },
    mounted() { // 组件初始化完成
      let that = this;
      // console.log("=mounted");
      //console.log(that.$refs.page_must.); // 访问子组件
    },
    updated() { // 视图更新
      let that = this;
      console.log("=updated");
    },
    unmounted() {
      let that = this;
      console.log("=unmounted");
    },
    methods: {

    }
  }
</script>

<!-- scoped局部 -->
<!-- @代表项目根路径，css为全局，scss为局部并支持所以css语法 -->
<style>
  @import "../../assets/css/common.scss";

</style>
