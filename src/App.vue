<template>
  <div id="app">
    <!-- 头部区域 -->

    <el-row :gutter="20" style="height:100%;margin:0;padding:0;">
      <el-col :span="3" style="height:100%;margin:0;padding-right:0;margin:0;padding-left:0;" v-show="isShow">
        <div class="bs-menu">
          <bs-menu></bs-menu>
        </div>
      </el-col>
      <el-col :span="centerSpan" style="margin:0;padding:0">
        <div class="right-container">
          <bs-header v-bind:isShow="isShow" v-on:headerShow="headerShow"></bs-header>
          <bs-center></bs-center>
        </div>
      </el-col>
    </el-row>


    <!-- 主内容区域 -->

  </div>
</template>

<script>

  import BsHeader from "./views/frame/BsHeader";
  import BsCenter from "./views/frame/BsCenter";
  import BsMenu from "./views/frame/BsMenu";
  export default {
    name: 'App',
    components: {BsMenu, BsCenter, BsHeader},
    data(){
      return{
        isShow:false,
        centerSpan:24,
      }
    },
    methods:{
      headerShow(value) {
        this.isShow=value;
        if(this.isShow==false){
          this.centerSpan=24;
        }else{
          this.centerSpan=21;
        }
      }
    }
  }
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
}
  html, body{
    height:100%;
  }
  /*.sidebar{*/
  /*  height:100%;*/
  /*  width:200px;*/
  /*}*/
  .bs-menu{
    height:calc(100%);
    padding-top:40px;

    background-color: #3a3a3a;
  }
</style>
