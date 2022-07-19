<template>
  <div>
    QR
    <p>文档：https://www.npmjs.com/package/vue-qr</p>
  </div>

  <vue-qr class="qr-code" :logoScale="20" :text="qr_text" :margin="0" :dotScale="1"></vue-qr>

  <foot />
  <div class="clear"></div>

  <must ref="page_must" data-desc="接口和安全参数验证的必要全局组件"/>
  <div class="clear"></div>
</template>

<script>
// 引入组件
import foot from "../../components/foot.vue";
import must from "../../config/must.vue";

import vueQr from 'vue-qr'

export default {
  name: "qr",
  data(){
    let that = this;
    return {
      qr_text: "（初始值）",
    };
  },
  components: {
    vueQr,

    foot,
    must
  },
  setup(props, context) { // 系统创建完成
    let that = this;
  },
  mounted(props, context) { // 组件初始化完成
    let that = this;

    that.make_qr("");

  },
  methods: { // 组件局部函数集合
    start_this_page: function (e){ // 页面所有自定义函数起始
      let that = this;
      that.common.log(["start_this_page函数已运行_" + e]);

    },
    make_qr: function (text){
      let that = this;
      that.common.log(text);
      let qr_text = text;

      if (text === ""){
        that.common.log("二维码内容不能为空");
        qr_text = "（二维码内容不能为空）";
      }

      return {
        qr_text: qr_text,
      };
    },

  },

}
</script>

<style scoped>

</style>
