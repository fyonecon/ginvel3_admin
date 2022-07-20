<template>
    <div class="clear"></div>
    <div class="section-must" v-bind:class="[section_must_class]" v-loading="loading">{{page_url}}</div>
</template>

<script>
    // 接口和安全参数验证的必要全局组件

    import axios from "axios";
    import { watch } from "vue";
    import {onBeforeRouteUpdate, useRoute} from "vue-router";

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
        setup() { // 系统创建完成
            let that = this;
            console.log(["must=setup:", that]);
        },
        mounted() { // 组件初始化完成
            let that = this;
            that.helper.log('must >>> mounted');

            that.must_init();

            let now_route = "";
            let old_route = "";
            onBeforeRouteUpdate((to, from,) => { // 监听路由变化
                let the = this;
                now_route = to.fullPath;
                old_route = from.fullPath;
                //
                that.page_init(now_route);
            });

        },
        updated() { // 视图更新
            let that = this;
            that.helper.log('must >>> updated');
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
                    let test_data = that.helper.get_cache('test_date', 'test-data==');
                    that.helper.log(['must=test_data', test_data]);
                  }, 2000);
                }
            },
            page_init: function (now_route) {
                let that = this;

                that.loading = false;
                that.section_must_class = "hide";

                if (!now_route){ // 切换到新主路由
                    that.helper.log("切换新路由：now_route="+now_route);
                }else { // 切换到带有参数等路由（主路由name未变化，参数变化）
                    that.helper.log("切换路由参数：now_route="+now_route);
                }

                try {
                    that.$parent.start_this_page(now_route);
                }catch (e) {
                    console.warn("报错情况：1.子页面start_this_page()函数未定义，但是可以忽略；2.子页面函数有错误，必须解决。");
                    // console.error(e);
                }

            },
            del_login: function (){
                let that = this;
                that.helper.set_cookie("login_id", "",0);
                that.helper.set_cookie("login_name", "", 0);
                that.helper.set_cookie("login_token", "", 0);
            },
            must_login: function (){
                let that = this;
                that.$message("请先登录..");
                setTimeout(function (){
                    let back_url = that.helper.get_url_param("", "back_url");
                    if (back_url.length === 0){
                        window.location.replace("./#/login?back_url="+encodeURIComponent(window.location.href));
                    }else {
                        window.location.replace("./#/login?back_url="+back_url);
                    }

                }, 1200);
            },
            check_login_token: function (){
                let that = this;

                let login_id = that.helper.get_cookie("login_id");
                let login_name = that.helper.get_cookie("login_name");
                let login_token = that.helper.get_cookie("login_token");

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
                        let res = that.helper.data_to_json(text);
                        that.helper.log(res);
                        that.loading = false;
                        if (res.state === 0){
                            that.$message(res.msg);
                            that.del_login();
                            that.must_login();
                        }else if (res.state === 1){
                            that.helper.log(res.msg);
                            let login_id = that.helper.get_cookie("login_id");
                            let login_name = that.helper.get_cookie("login_name");
                            let login_token = that.helper.get_cookie("login_token");
                            let login_level = res.content.login_level;

                            that.global_data.login_id = login_id;
                            that.global_data.login_name = login_name;
                            that.global_data.login_token = login_token;
                            that.global_data.login_level = login_level;
                            that.helper.set_data("login_level", login_level);

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
                        that.helper.error(error_info);

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
