<template>
  <div class="menu-content left-content">
    <div class="menu-title">管理账户</div>
    <div class="menu-li">
      <div class="menu-li-item click menu-li-item-add_admin">新增账户</div>
      <router-link to="./admin?menu=list_admin&page_admin=&nickname=" class="a-href"  target="_self" title=""><div class="menu-li-item click menu-li-item-list_admin">账户列表</div></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-menu"
}
</script>

<style scoped>
  .left-content{
    width: calc(170px - 0px);
    min-height: 400px;
    background: rgba(0,0,0,0.1);
    float: left;
  }
  .menu-title{
    line-height: 40px;
    font-size: 18px;
    padding: 0 10px;
    color: rgba(0,0,0,0.8);
  }
  .menu-li-item{
    line-height: 40px;
    font-size: 14px;
    padding: 0 10px;
    color: rgba(0,0,0,0.6);
  }
  .menu-li-item:hover{
    opacity: 0.8;
    background: rgba(255,255,255,0.6);
  }
  .menu-li-item:active{
    opacity: 0.6;
    background: rgba(255,255,255,0.6);
  }
  .menu-li-item-active{
    color: orange;
    background: rgba(255,255,255,0.6);
  }

</style>