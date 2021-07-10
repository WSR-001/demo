<template>
  <div class="bsheader">
    <div class="header" :style="headerBgStyle">
      <div class="menuicondiv">
        <i :class="menuicon" @click="menuShow" style="color:#45bce4;font-weight: bold;font-size: 20px;"></i>
      </div>
      <div class="title" style="color: #45bce4">
        施工安全监管平台
      </div>
      <el-row type="flex" justify="end" class="real-time"  style=" margin-right:0;">
        <el-col :span="6">
          <div style="line-height: 15px;padding-right:10px">
<!--            <span>{{realDate}} </span><br>-->
            <span>{{realTime}} </span>
          </div>
        </el-col>
        <el-col :span="14" style="padding-right:0px;padding-left:0px">
          <div class="time">
            <span>安全生产：<span style="background-color: rgba(34,224,236,0.5);font-weight:bold;font-size:14px;color:#f8ab06">539</span>天</span>&nbsp;
<!--            <span style="font-size:12px;color: transparent"> </span>-->
            <i class="el-icon-location-information" style="color: #45bce4;font-size:20px"></i>
<!--            <span style="font-size:12px;color: transparent"> </span>-->
            <span>西安</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "BsHeader",
      props:[
        "isShow"
      ],
      data() {
        return {
          menuicon:"el-icon-s-fold",
          // isShow:false,
          headerBgStyle: {
            backgroundImage: 'url(' + require('../../assets/image/header-bg.png') + ') '
          },
          realTime: new Date(),
          // realDate:'',
          // rTime:'',
          timer: null
        }
      },
      computed:{

      },
      mounted() {
        let _this = this;
        this.timer = setInterval( function() {
          _this.realTime =  _this.getCurrentTime()
        }, 1000)
      },
      beforeDestroyed() {
        if (this.timer) {
          clearInterval(this.timer)
        }
      },
      methods: {
        menuShow(){
          this.isShow=!this.isShow;
          if(this.isShow === false){
            this.menuicon="el-icon-s-fold";
          }else{
            this.menuicon="el-icon-s-unfold";
          }
          this.$emit("headerShow",this.isShow);
        },
        getCurrentTime() {
          const dateOptions = {
            // weekday: 'long',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          };
          const timeOptions = {
            hour12: false,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
          };
          return (new Date()).toLocaleString('zh',{ ...timeOptions, ...dateOptions });
        }
      }

    }
</script>

<style lang="scss">
  .time{
    color:#fff;
    text-align: right;
    padding-right:10px;
  }
</style>
