<template>
  <div>
    <div class="login-content">
      <div class="login-div">
        <div class="login-title select-none">{{login_title}}（请登录）</div>
        <input class="input-login input-login_name" type="text" maxlength="20" value="" placeholder="登录名"/>
        <input class="input-login input-login_pwd" type="password" maxlength="20" value="" placeholder="密码">
        <div class="login-captcha select-none">-</div>
        <div class="login-btn select-none click" @click="admin_login">确定</div>
      </div>
    </div>
  </div>

<!--  <foot />-->
  <div class="clear"></div>
</template>

<script>
// 引入组件
import top from "/@/components/top.vue";
import foot from "/@/components/foot.vue";
import axios from "axios";

export default {
  name: "login",
  props: [

  ],
  data(){
    let that = this;
    return {
      login_title: "",
    };
  },
  components: {
    foot,
  },
  setup(props, context) { // 系统创建完成
    let that = this;
  },
  mounted(props, context) { // 组件初始化完成
    let that = this;
    that.login_title = that.config.title;
  },
  methods: { // 组件局部函数集合
    start_this_page: function (e){ // 页面所有自定义函数起始
      let that = this;
      let page_name = that.$options.name;
      let page_data = that.$options.mounted;
      that.page_help.loaded(page_name, page_data);
      that.helper.log(["start_this_page函数已运行_" + page_name]);

      // 清空已登录的信息
      that.helper.set_cookie("login_id", "");
      that.helper.set_cookie("login_name", "");
      that.helper.set_cookie("login_token", "");

      // 自动填充input
      document.getElementsByClassName("input-login_name")[0].value = "567";
      document.getElementsByClassName("input-login_pwd")[0].value = "";

    },
    admin_login: function (){
      let that = this;

      let login_name = document.getElementsByClassName("input-login_name")[0].value;
      let login_pwd = document.getElementsByClassName("input-login_pwd")[0].value;
      let login_captcha = ""; // 验证码
      if (login_name.length<6 || login_name.length>20 || login_pwd.length<6 || login_pwd.length>20){
        that.$message("帐号或密码格式不符合");
        return;
      }else {
        login_pwd = that.helper.md5(login_pwd);
      }

      // POST请求
      // const post_api = that.config.api_url + "admin/admin_login"; // 接口
      // const map = new Map([ // 要提交数据
      //     ["app_class", that.config.app.app_class],
      //     ["app_name", that.config.app.app_name],
      //     ["url", encodeURIComponent(window.location.href).substring(0, 2000)], // 取当前url即可
      //     ["login_name", login_name],
      //     ["login_pwd", login_pwd],
      //     ["login_captcha", login_captcha],
      // ]);
      // let body = "";
      // for (let [k, v] of map) { body += k+"="+v+"&"; } // 拼装数据，限制2MB
      // fetch(post_api, {
      //     method: "post",
      //     mode: "cors", // same-origin/no-cors/cors
      //     cache: "no-cache",
      //     headers: {
      //         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      //     },
      //     body: body,
      // }).then(function(response){
      //     if (response.status === 200){return response;}
      // }).then(function(data) {
      //     return data.text();
      // }).then(function(text){ // 返回接口数据
      //     let res = that.helper.data_to_json(text);
      //     that.helper.log(res);
      //
      //     that.loading = false;
      //
      //     if (res.state === 0){
      //         that.$message(res.msg);
      //
      //     }else if (res.state === 1){
      //         that.$message(res.msg);
      //
      //         let login_id = res.content.login_id;
      //         let login_name = res.content.login_name;
      //         let login_token = res.content.login_token;
      //         let login_level = res.content.login_level;
      //         that.helper.set_cookie("login_id", login_id, that.helper.cookie_timeout);
      //         that.helper.set_cookie("login_name", login_name, that.helper.cookie_timeout);
      //         that.helper.set_cookie("login_token", login_token, that.helper.cookie_timeout);
      //
      //         // 返回上一级页面
      //         let back_url = that.helper.get_url_param("", "back_url");
      //         setTimeout(function (){
      //             if (back_url.length < 5){
      //               back_url = "./#/";
      //             }
      //           window.location.replace(back_url);
      //         }, 1000);
      //
      //     }else if (res.state === 2){
      //         that.$message(res.msg);
      //
      //     }else if (res.state === 302){ // 需要重新获取参数（登录）
      //         that.$message(res.msg);
      //
      //
      //     }else{ // "超范围的参数"
      //         that.$message("超范围的参数");
      //     }
      //
      // }).catch(function(error){
      //     let error_info = "Fetch_Error：" + error;
      //     that.$message.error("Fetch_Error：" + error);
      //     that.helper.error(error_info);
      //
      // });
      // // 结束-Fetch

      // POST请求
      axios.post(
          that.config.api_url + "admin/admin_login", // 设置了baseUrl就不需要连接主域名
          {
            app_class: that.config.app.app_class,
            app_name: that.config.app.app_name,
            url: encodeURIComponent(window.location.href).substring(0, 2000),
            login_name: login_name,
            login_pwd: login_pwd,
            login_captcha: login_captcha,
          },
          {
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
          }
      )
          .then(function (back) {
              let res = back.data;
              that.loading = false;

              if (res.state === 0){
                  that.$message.error(res.msg);
              }else if (res.state === 1){
                  that.$message(res.msg);

                  let login_id = res.content.login_id;
                  let login_name = res.content.login_name;
                  let login_token = res.content.login_token;
                  let login_level = res.content.login_level;
                  that.helper.set_cookie("login_id", login_id, that.helper.cookie_timeout);
                  that.helper.set_cookie("login_name", login_name, that.helper.cookie_timeout);
                  that.helper.set_cookie("login_token", login_token, that.helper.cookie_timeout);

                  // 返回上一级页面
                  let back_url = that.helper.get_url_param("", "back_url");
                  setTimeout(function (){
                      if (back_url.length < 5){
                          back_url = "./#/";
                      }else {
                          back_url = decodeURIComponent(back_url);
                      }
                      that.helper.log("back_url="+back_url)
                      window.location.replace(back_url);
                  }, 1000);

              }else if (res.state === 2){
                  that.$message.error(res.msg);
              }else if (res.state === 302){ // 需要重新获取参数（登录）
                  that.$message.error(res.msg);
                  //
              }else{ // "超范围的参数"
                  that.$message.error('超范围的参数');
                  that.helper.log(res.msg);
              }

          })
          .catch(function (e) {
              console.error(e);
              that.$notify({
                  title: '警告',
                  message: '网络不通或接口请求错误',
                  type: 'warning'
              });
          });


    },



  },
}
</script>

<style scoped>
  .login-content{
     padding-top: calc(10%);
  }
  .login-div{
    width: 320px;
    height: 240px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    padding: 20px 10px;
    border-radius: 5px;
    margin: auto auto;
    background-color: white;
    background-image: url(../../assets/login-bg.svg);
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: 200%;
  }
  .input-login{
    width: 300px;
    height: 38px;
    border-radius: 3px;
    border: 1px solid #1c1c1c;
    padding: 0 5px;
    margin: 0 auto 20px auto;
    display: block;
  }
  .login-btn{
    width: 120px;
    margin: 0 auto;
    text-align: center;
    font-size: 16px;
    color: #000000;
    letter-spacing: 2px;
    background: #0d84ff;
    border-radius: 5px;
    padding: 5px 0;
  }
  .login-title{
    font-size: 18px;
    line-height: 20px;
    overflow: hidden;
    letter-spacing: 2px;
    color: #3a8ee6;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 700;
  }
  .login-captcha{
    height: 40px;
  }

</style>
