<template>
  <div class="header-nav" >
    <el-row class="menu">
      <el-col :span="24">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#3a3a3a"
          text-color="#fff"
          active-text-color="#ffffff"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="true"
          router
        >
          <el-menu-item index="/home" @click="goTo('/home')">
            <i class="el-icon-s-home"></i>
            <span slot="title">指挥中心</span>
          </el-menu-item>
          <el-menu-item index="/monitor" @click="goTo('/monitor')">
            <i class="el-icon-s-home"></i>
            <span slot="title">实时监控</span>
          </el-menu-item>
          <el-menu-item index="/progress" @click="goTo('/progress')">
            <i class="el-icon-s-home"></i>
            <span slot="title">工程进度</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>人员管理</span>
            </template>
            <el-menu-item index="/personal"
                          @click="goTo('/personal')"
                          style="padding-left: 30px;">
                <i class="el-icon-s-data"></i>
                <span>人员信息展示</span>
            </el-menu-item>
            <el-menu-item index="/ViolatorsNotification"
                          @click="goTo('/ViolatorsNotification')"
                          style="padding-left: 30px;">
              <i class="el-icon-s-data"></i>
              <span>违规人员通报</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>安全管理</span>
            </template>
              <el-menu-item index="/security"
                            @click="goTo('/security')"
                            style="padding-left: 30px;">
                <i class="el-icon-date"></i>
                <span>安全信息展示</span>
              </el-menu-item>
              <el-menu-item index="/SecurityWarning"
                            @click="goTo('/SecurityWarning')"
                            style="padding-left: 30px;">
                <i class="el-icon-date"></i>
                <span>安全预警</span>
              </el-menu-item>
            <el-menu-item index="/image" @click="goTo('/image')" style="padding-left: 30px;">
              <i class="el-icon-s-home"></i>
              <span slot="title">预警图片查看</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import { mapState } from 'vuex';
    export default {
      name: "BsMenu",

      computed: {

      },
      data() {
        return {};
      },
      methods: {
        handleOpen(key, keyPath) {
          // console.log(index);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        goTo(path) {
          if (this.$route.path !== path) {
            this.$router.replace(path).catch(err => err)
          }
        },

      },

    }
</script>

<style lang="scss">
  body{
    height: 100%;
    padding: 0;
    margin:0px;
  }
  .el-menu-item.is-active {
    background-color: rgba(71, 143, 252, 0.8) !important;
  }

  .menu{
    /*width:200px;*/
    /*height:calc(100%);*/
    /*background-color: #3a3a3a;*/
  }
  /*.el-menu-vertical-demo{*/
  /*  border-right: 0;*/
  /*}*/

</style>
