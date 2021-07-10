<template>
  <div class="basic-container">

<!--    //box部分-->
    <div class="main-box">

      <el-row :gutter="20" class="main-top" style="margin:0;">
        <el-col :span="8" style="padding:0">
          <div class="indicator-show" style="margin-right:10px;">
            <div class="bgc" style="height:100px;">
              <header class="bs-header">环境监测</header>
              <div class="tianqi">
                <el-row :gutter="20">
                  <el-col :span="10">
                    <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=ty&skin=pitaya&color=ffffff"
                            frameborder="0" width="300" height="75" allowtransparency="true"></iframe>
                  </el-col>
                  <el-col :span="12" style="margin-left:30px;">
                    <div>空气质量：<span>{{quality}}</span></div>
                    <el-row>
                      <el-col>
                        <div>PM2.5含量：<span>{{pm25}}</span></div>
                        <div>PM10含量：<span>{{pm10}}</span></div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>

              </div>
            </div>
            <div class="bgc" style="margin-top:10px;height:155px;">
              <header class="bs-header">实时统计</header>
              <div class="charts">
                <real-time-statistics></real-time-statistics>
              </div>
            </div>
            <div class="bgc" style="margin-top:10px;height:135px;">
              <header class="bs-header">安全装备违规佩戴</header>
              <div class="charts">
                <high-altitude/>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" style="padding:0">
          <div class="map" >
<!--            <header class="bs-header">指挥中心</header>-->
            <div class="bgc map-top" style="margin:20px auto;padding-left:25px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="device-num">设备总数：<span>{{userTotal}}</span>台</div>
                </el-col>
                <el-col :span="12">
                  <div class="device-num">在线总数：<span>{{onlineNum}}</span>台</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="device-num">离线总数：<span>{{offlineNum}}</span>台</div>
                </el-col>
                <el-col :span="12">
                  <div class="device-num" style="padding-left:10px">&nbsp;算法总数：<span>{{algorithmNum}}</span>个</div>
                </el-col>
              </el-row>
            </div>
            <div>
                <!--              图片-标记相机位置-->
                <img src="../../assets/image/camera-marker.png" class="map-show" alt="" width="95%" height="99%"/>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="indicator-show" style="padding:0;">
          <div class="indicator-show2" style="margin-right:10px;">
            <div class="bgc" style="height:150px">
              <header class="bs-header"style="margin-bottom:10px;">人员管理</header>
              <el-row>
                <el-col :span="8" style="padding-left:20px;">
                  <div style="display:flex;font-size:12px;color:#fff;">
                    <div>在场人数：</div>
                    <div style="font-size:16px;color:rgba(118,229,248,0.99);font-weight: bold">13</div>
                    <div>人</div>
                  </div>
                </el-col>
                <el-col :span="9"  style="padding-left:10px;">
                  <div style="display:flex;font-size:12px;color:#fff;">
                    <div>用工计划偏差量:</div>
                    <div style="font-size:16px;color:rgba(118,229,248,0.99);font-weight: bold">0</div>
                    <div>人</div>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div style="display:flex;font-size:12px;color:#fff;">
                    <div>计划人数：</div>
                    <div style="font-size:16px;color:rgba(118,229,248,0.99);font-weight: bold">13</div>
                    <div>人</div>
                  </div>
                </el-col>
              </el-row>
              <div class="charts">
                <personal-monitor/>
              </div>
            </div>
            <div class="bgc" style="margin-top:10px;height:120px;">
              <!--            <router-link :to="{ path: 'monitor'}">-->
              <header class="bs-header">人流量TOP5</header>
              <!--            </router-link>-->

              <div class="charts">
                <visitors-flowrate/>
              </div>
            </div>
            <div class="bgc" style="margin-top:10px;height:120px;">
              <header class="bs-header">人员违规行为</header>
              <div class="charts">
                <unsafe-act/>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="main-bottom" style="margin:0">
        <el-col :span="12" style="padding:0;">
          <div class=" bgc charts" style="height:140px;margin-top:10px;">
            <header class="bs-header">工程进度</header>
            <construction-progress></construction-progress>
          </div>
        </el-col>
        <el-col :span="12" >
          <div class="charts bgc" style="height:140px;margin-top:10px;position:relative">
            <header class="bs-header">实时预警</header>
            <div class="more">
              <router-link to="/image">
                <span>查看全部</span><i class="el-icon-arrow-right"></i>
              </router-link>

              <!--            添加路由-->
            </div>
<!--            <my-lianxi />-->
            <real-time-warning></real-time-warning>
          </div>
        </el-col>
      </el-row>
    </div>


  </div>
</template>
<!--<script src="https://apip.weatherdt.com/standard/static/js/weather-standard-common.js?v=2.0"></script>-->

<script>

import RunningState from './components/3';
  import VisitorsFlowrate from './components/VisitorsFlowrate';
  import UserDistribution from './components/1';
  import MyLianxi from "../../components/publiccomponents/ConstructionDays";
  import UnsafeAct from "../../components/publiccomponents/UnsafeAct";
  import HighAltitude from "../../components/publiccomponents/HighAltitude";
  import PersonalMonitor from "./components/PersonalMonitor";
  import RealTimeStatistics from "./components/RealTimeStatistics";
  import ConstructionProgress from "./components/ConstructionProgress";
  import RealTimeWarning from "./components/RealTimeWarning";
  export default {
    name: 'Home',
    components: {
      RealTimeWarning,
      ConstructionProgress,
      RealTimeStatistics,
      PersonalMonitor,
      HighAltitude,
      UnsafeAct,
      // MyLianxi,
      // EchartsBaiduMap,
      // RunningState,
      VisitorsFlowrate,
      // UserDistribution,
    },
    data() {
      return {
        // headerBgStyle: {
        //   backgroundImage: 'url(' + require('../../assets/image/head_bg.png') + ') '
        // },
        userTotal:0,
        offlineNum:0,
        onlineNum:0,
        algorithmNum:0,
        city:'',
        wendu:0,
        pm10:0,
        pm25:0,
        quality:'',
      };
    },
    mounted() {
      this.init();
      this.weatherinit();
    },
    created(){
      // window.WIDGET = {
      //   CONFIG: {
      //     "layout": 1,
      //       "width": "180",
      //       "height": "120",
      //       "background": 5,
      //       "dataColor": "FFFFFF",
      //       "borderRadius": 0,
      //       "modules": "10",
      //       "key": "FXzweB7UbO",
      //   }
      // };
      // const s = document.createElement("script");
      // s.type = "text/javascript";
      // s.src =
      //   "https://apip.weatherdt.com/standard/static/js/weather-standard-common.js?v=2.0";
      // document.body.appendChild(s);
      // (function (d) {
      //   var c = d.createElement('link')
      //   c.rel = 'stylesheet'
      //   c.href = 'https://apip.weatherdt.com/standard/static/css/weather-standard.css?v=2.0'
      //   var s = d.createElement('script')
      //   s.src = 'https://apip.weatherdt.com/standard/static/js/weather-standard.js?v=2.0'
      //   var sn = d.getElementsByTagName('script')[0]
      //   sn.parentNode.insertBefore(c, sn)
      //   sn.parentNode.insertBefore(s, sn)
      // })(document)
    },

    methods: {
      weatherinit(){
        this.$http.get('/api/city/101110103')
          .then(res => {//请求成功
            this.city=res.data.city;
            this.pm10=res.data.pm10;
            this.pm25=res.data.pm25;
            this.quality=res.data.quality;
            this.wendu=res.data.wendu;
          }).catch(err => {//请求失败
          console.log(err)
          this.$message.error({message: '数据异常', center: true})
        });
      },
      init(){
        this.$http.get('/camera/amount')
          .then(res => {
            // console.log();
            // console.log(res.data.data);
          this.userTotal=res.data.data.total;
          this.offlineNum=res.data.data.offlineNum;
          this.onlineNum=res.data.data.onlineNum;
          this.algorithmNum=res.data.data.algorithmNum;
          }).catch(err => {
          console.log(err)
          this.$message.error({message: '数据异常', center: true})
        });

      }
    }
  };
</script>
<style scoped>

</style>
<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .tianqi{
    color:#fff;
    font-size:14px;
    margin-left:20px;
    margin-top:7px;
  }
  .basic-constainer {

    // height: 100vh;
    background: aquamarine;
    position: relative;
  }
  .more{
    position:absolute;
    right:15px;
    top:5px;
    color:deepskyblue;
    font-size:14px;
  }
  a {
    text-decoration:none ;
    color: #00ecfc;
  }
  .router-link-active {
    text-decoraction: none ;
    color: #00ecfc;
  }
  .main-box{
    /*max-width: 1920px;*/
    /*min-width: 1024px;*/

    .main-top {
      /*display: flex;*/
      .map{
        .map-top {
          margin:0 auto;
          height: 50px ;
          width: 300px;

          .device-num{
            color:#fff;
            font-size:16px;
            /*text-align:center;*/
          }
        }
        .map-show{
          display: block;
          margin:auto;
        }
      }
    }

  }



</style>
