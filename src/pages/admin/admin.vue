<template>
  <top />
  <admin-menu />
  <div class="page-content right-content">
    <div class="list-div">
      <el-table :data="list_content" style="width: 100%">
        <el-table-column prop="admin_id" label="ID" width="180" />
        <el-table-column prop="login_name" label="登录名" width="180" />
        <el-table-column prop="login_pwd" label="密码" width="180" />
        <el-table-column prop="create_time" label="创建日期" />
      </el-table>
      <div v-bind:class="[table_loading]" v-loading="loading"></div>
      <div class="el-paging">
        <el-pagination background layout="prev, pager, next"
                       :current-page="paging.page"
                       :total="paging.total"
                       :page-size="paging.limit"
                       @current-change="paging_change"
        />
      </div>

    </div>
  </div>
  <foot />
  <must ref="page_must" @page_must="show_must" :now_page="now_page" />
</template>

<script>
import top from "/@/components/top.vue";
import foot from "/@/components/foot.vue";
import must from "/@/bootstrap/config/must.vue";
import AdminMenu from "/@/pages/admin/admin-menu.vue";
import axios from "axios";

export default {
  name: "admin",
  data(){
    let that = this;

    return {
      page_txt: "home==22==",
      now_page: window.location.href,
      must_data: 'null-must',
      list_content: [],
      paging: {
        total: 0,
        page: 0,
        limit: 0,
      },
      loading: true,
      table_loading: "show",
    };
  },
  components: {
    top,
    foot,
    must,
    AdminMenu
  },
  methods: { // 组件局部函数集合
    start_this_page: function (any){ // 页面所有自定义函数起始
      let that = this;
      let page_name = that.$options.name;
      let page_data = that.$options.mounted;
      // that.helper.log(["start_this_page函数已运行_" + page_name]);
      //
      that.page_help.loaded(page_name, page_data);
      that.list_admin();

    },
    show_must(data){
      this.helper.log(["show_must= ", data]);
      this.must_data = data;
    },
    paging_change: function (click_page){ // 分页跳转
      let new_page = click_page*1;
      let now_page = this.paging.page;
      let nickname = this.helper.get_url_param("", "nickname").trim();
      if (!new_page || new_page<0){new_page=1;}

      this.$router.push({path:"/admin",query: {menu: "list_admin", page_admin: new_page, nickname: nickname}})

    },
    list_admin: function (){
      let that = this;

      //
      let page = that.helper.get_url_param("", "page_admin").trim();
      let nickname = that.helper.get_url_param("", "nickname").trim();

      //
      that.page_help.menu_active("list_admin");
      that.table_loading = "show";

      // POST请求
      axios.post(
          that.config.api_url + "admin/list_admin", // 设置了baseUrl就不需要连接主域名
          {
            app_class: that.config.app.app_class,
            login_id: that.global_data.login_id,
            login_name: that.global_data.login_name,
            login_token: that.global_data.login_token,
            page: page,
            nickname: nickname,
          },
          {
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
          })
          .then(function (back) {
            let res = back.data;
            that.loading = false;

            if (res.state === 0){
              that.$message.error(res.msg);
            }else if (res.state === 1){
              // that.$message(res.msg);
              that.table_loading = "hide";
              that.list_content = res.content;
              that.paging.total = res.paging.total;
              that.paging.page = res.paging.page;
              that.paging.limit = res.paging.limit;

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

    }

  },

}
</script>

<style scoped>
  .right-content{
    width: calc(100% - 170px);
    float: right;
  }
  .el-paging{
    text-align: center;
    padding: 40px 0;
  }
</style>