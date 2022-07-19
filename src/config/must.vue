<template>
    <div class="clear"></div>
    <div class="section-must" v-bind:class="[section_must_class]" v-loading="loading">{{page_url}}</div>
</template>

<script>
    // 接口和安全参数验证的必要全局组件

    import axios from "axios";

    export default {
        name: "must",
        props:[ // 数据父传子
            'now_page',
        ],
        data(){
            let that = this;
            return {
                loading: true,
                section_must_class: "show",
                page_url: that.now_page,
            };
        },

        mounted() { // 组件初始化完成
            let that = this;
            that.common.log('must >>> mounted');
            that.must_init();
        },
        updated() { // 视图更新
            let that = this;
            that.common.log('must >>> updated');
            // that.must_init();
        },
        methods: { // 组件局部函数集合
            must_init: function (){
                let that = this;
                // 获取当前路由名称
                let now_route = that.$route.fullPath
                if (now_route === "/login" || now_route === "/404"){
                  that.page_init(now_route);
                }else {
                  // 验证token
                  that.check_login_token();

                  // 数据子传父
                  that.$emit('page_must', 'to-parent');

                  setTimeout(function () {
                    let test_data = that.common.get_cache('test_date', 'test-data==');
                    that.common.log(['must=test_data', test_data]);
                  }, 2000);
                }
            },
            page_init: function (any) {
                let that = this;
                that.common.log(any);
                that.loading = false;
                that.section_must_class = "hide";
                try {
                    that.$parent.start_this_page(any);
                }catch (e) {
                    console.error("报错情况：1.子页面start_this_page()函数未定义，但是可以忽略；2.子页面函数有错误，必须解决。\n\n参考如下：");
                    console.error(e);
                }

            },
            del_login: function (){
                let that = this;
                that.common.set_cookie("login_id", "",0);
                that.common.set_cookie("login_name", "", 0);
                that.common.set_cookie("login_token", "", 0);
            },
            must_login: function (){
                let that = this;
                that.$message("请先登录..");
                setTimeout(function (){
                    let back_url = that.common.get_url_param("", "back_url");
                    if (back_url.length === 0){
                        window.location.replace("./#/login?back_url="+encodeURIComponent(window.location.href));
                    }else {
                        window.location.replace("./#/login?back_url="+back_url);
                    }

                }, 1200);
            },
            check_login_token: function (){
                let that = this;

                let login_id = that.common.get_cookie("login_id");
                let login_name = that.common.get_cookie("login_name");
                let login_token = that.common.get_cookie("login_token");

                if (login_id && login_name && login_token){
                    // POST请求
                    const post_api = that.config.api_url + "admin/check_login_token"; // 接口
                    const map = new Map([ // 要提交数据
                        ["app_class", that.config.app.app_class],
                        ["url", encodeURIComponent(window.location.href).substring(0, 2000)], // 取当前url即可
                        ["login_id", login_id],
                        ["login_name", login_name],
                        ["login_token", login_token],
                    ]);
                    let body = "";
                    for (let [k, v] of map) { body += k+"="+v+"&"; } // 拼装数据，限制2MB
                    fetch(post_api, {
                        method: "post",
                        mode: "cors", // same-origin/no-cors/cors
                        cache: "no-cache",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        },
                        body: body,
                    }).then(function(response){
                        if (response.status === 200){return response;}
                    }).then(function(data) {
                        return data.text();
                    }).then(function(text){ // 返回接口数据
                        let res = that.common.data_to_json(text);
                        that.common.log(res);
                        that.loading = false;
                        if (res.state === 0){
                            that.$message(res.msg);
                            that.del_login();
                            that.must_login();
                        }else if (res.state === 1){
                            that.common.log(res.msg);
                            let login_level = res.content.login_level;
                            document.getElementsByClassName("nav-admin-info")[0].innerHTML = login_level + "（"+ login_id +"）";
                            that.page_init();
                        }else{
                            that.$message(res.msg);
                            that.del_login();
                            that.must_login();
                        }
                    }).catch(function(error){
                        let error_info = "Fetch_Error：" + error;
                        that.$message.error("Fetch_Error：" + error);
                        that.common.error(error_info);

                    });
                    // 结束-Fetch
                }else {
                    that.del_login();
                    that.must_login();
                }


            },

        },

    }
</script>

<style scoped>
    .section-nav{
        width: 100%;
    }
</style>
