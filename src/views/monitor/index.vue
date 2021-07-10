<template>
  <div class="basic-container">
    <div class="monitor">
      <div class="bs-monitor-left">
<!--        <div class="bs-monitor-left-search bgc">-->
<!--          <el-form ref="form" :model="form" size="mini" >-->
<!--            <el-form-item>-->
<!--              <el-select v-model="form.region" placeholder="请选择摄像机" style="width:60%;">-->
<!--                <el-option label="SDC摄像机" value="shanghai"></el-option>-->
<!--              </el-select>-->
<!--              <el-button type="primary" style="width:30%;padding-bottom:5px;padding-top:5px;margin-left:15px">搜索</el-button>-->
<!--            </el-form-item>-->
<!--          </el-form>-->

<!--        </div>-->
        <div class="bgc bs-monitor-left-chart">

          <el-table
              :data="tableData"
              max-height="100%"
              max-width="100%"
              :header-row-style="{height:'10px'}"
              :header-cell-style="{color:'#5078fc'}"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="序号"
                header-align="center" min-width="50" align="center">
              </el-table-column>
              <el-table-column
                prop="deviceName"
                label="设备名称"
                header-align="center" min-width="80" align="center">
              </el-table-column>
              <el-table-column
                label="设备状态"
                header-align="center" min-width="50" align="center">
                  <template slot-scope="scope">
                    <div class="row-task-name" :task-id="scope.row.id">
                      <task-traffic-light
                        :task-status="scope.row.deviceStatus"></task-traffic-light>
                    </div>
                  </template>

              </el-table-column>
              <el-table-column
                label="实时预览"
                header-align="center" min-width="50" align="center">
                <template slot-scope="scope">
                  <el-button :plain="true" @click="handleClick(scope.row)" type="text" :disabled="scope.row.deviceStatus==0" >{{buttonText[buttonIndex]}}</el-button>
<!--                  <el-button type="text" size="small">编辑</el-button>-->
                </template>
              </el-table-column>
            </el-table>

        </div>
        <div class="bgc bs-monitor-left-bottom">
          <header style="height:40px;line-height:40px;font-size:16px;font-weight:bold;color:#2693e0;background-color:rgba(25, 65, 123, 0.5);padding-left:15px;">设备管理</header>
          <div class="number">
            <div class="left_l">
              <div>在线设备： <span>{{onlineNum}}</span>台</div>
              <div>离线设备： <span>{{offlineNum}}</span>台</div>
              <div>累计预警： <span>{{totalWarningNum}}</span>次</div>
              <div>今日预警： <span>{{todayWarningNum}}</span>人</div>
            </div>
            <div class="right">
              <i class="el-icon-user-solid" style="font-size:20px;color:#fff;transform-origin: 80% 50%;transform: rotate(-45deg);"></i>
              <br>
              <span class="right_r">
                设备总数 <span>{{userTotal}}</span>台
              </span>
            </div>
          </div>

        </div>
      </div>
      <div class="bgc bs-monitor-right">
        <div class="test_two_box">
          <video id="myVideo" class="video-js vjs-default-skin" controls
                 preload="auto" width="640px" height="480px" data-setup="{}">
            <source :src=videoUrl type="rtmp/flv" />
          </video>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import TaskTrafficLight from "../../components/publiccomponents/TaskTrafficLight";
  // import { GetVideoFile } from '@/apis/apis'
  export default {
    name: "Monitor",
    components: {TaskTrafficLight},
    data() {
      return {
        form: {
          region: '',
        },
        buttonText:['预览','关闭'],
        buttonIndex:0,
        cameraInfoModel :{
          "username": "admin",
          "password": "HuaWei123",
          "ip": "192.168.0.120",
          "channel": "ch1",
          "stream": "Media1"
        },
        videoUrl: 'rtmp://192.168.0.222/live/stream',
        // videoUrl:'rtmp://58.200.131.2:1935/livetv/hunantv',
        token:'',
        userTotal:0,
        offlineNum:0,
        onlineNum:0,
        totalWarningNum:0,
        todayWarningNum:0,
        tableData: [
        ],
        myPlayer:{},
        oBtn:true,
        option:{
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          // poster: this.baseUrl + '/Picture/position/banner.jpg',
          //自动播放属性,muted:静音播放
          // autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "100%",
          //设置视频播放器的显示高度（以像素为单位）
          height: "100%",
          autoplay:true,
        }


        //Echarts组件
      }
    },
    created() {


    },
    mounted() {
      this.init();                              //关闭了初始化函数
    },
    beforeDestroyed() {
      if(this.myPlayer !=null){ //判断是否已经初始化视频
        this.myPlayer.dispose(); //销毁video
      }
    },
    methods: {
      GetVideo(){
        this.$http({
          method:'post',
          url:'/camera/live',
          data: this.cameraInfoModel,
        }).then(res => {
            this.videoUrl=res.data.data.rtmp;
            this.token=res.data.data.token;
            this.myPlayer.src({
              type: "rtmp/flv",
              src: this.videoUrl,
            });
          this.myPlayer.load(res.data.data.rtmp);
          this.myPlayer.play();
          }).catch(err => {
          console.log(err)
          this.$message.error({message: err, center: true})
        });
      },
      closeClick(){
        this.$http.get('/camera/close/'+this.token)
          .then(res => {
           if(res.code==200){
             this.myPlayer.pause();
           }
          }).catch(err => {
          console.log(err)
          this.$message.error({message: '关闭视频异常', center: true})
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
            this.totalWarningNum=res.data.data.totalWarningNum;
            this.todayWarningNum=res.data.data.todayWarningNum;
          }).catch(err => {
          console.log(err)
          this.$message.error({message: '数据异常get', center: true})
        });
        this.$http.get('/camera/all')
          .then(res => {
            // console.log();
            // console.log(res.data.data);
            this.tableData=res.data.data;
          }).catch(err => {
          console.log(err)
          this.$message.error({message: '数据异常', center: true})
        });

      },
      handleClick(row) {
        console.log(row);
        // this.myPlayer = this.$video('myVideo',this.option,function onPlayerReady() {
        //   console.log('播放器已经准备好了!');
        // });
        this.myPlayer = videojs('myVideo',this.option,function(){
          // console.log(this);
          this.on('loadedmetadata',function(){
            console.log('loadedmetadata');
            //加载到元数据后开始播放视频
            // startVideo();
          });
          this.on('ended',function(){
            console.log('ended')
          });
          this.on('firstplay',function(){
            console.log('firstplay')
          });
          this.on('loadstart',function(){
            //开始加载
            console.log('loadstart')
          });
          this.on('loadeddata',function(){
            console.log('loadeddata')
          });
          this.on('seeking',function(){
            //正在去拿视频流的路上
            console.log('seeking')
          });
          this.on('seeked',function(){
            //已经拿到视频流,可以播放
            console.log('seeked')
          });
          this.on('waiting',function(){
            console.log('waiting')
          });
          this.on('pause',function(){
            console.log('pause')
          });
          this.on('play',function(){
            console.log('play')
          });

        });
        if(this.oBtn){
          this.$message('打开监控');
          this.GetVideo();
          // this.oBtn=1;
          this.buttonIndex=1;
          // console.log("开始");

        } else if(!this.oBtn){
          this.$message('关闭监控');
          this.closeClick();
          // this.oBtn=1;
          this.buttonIndex=0;
          // console.log("关闭");
        }
        this.oBtn=!this.oBtn;


      },
    }
  }
</script>

<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .basic-constainer {
    overflow:hidden;
  /*// height: 100vh;*/
    background: aquamarine;
    position: relative;
  }
  .monitor{
    width:100%;
    height:100%;
    padding-left:0;
    padding-right: 10px;
    display:flex;
    .bs-monitor-left{
      width:25%;
      .bs-monitor-left-search{
        height:40px;
        padding-top:5px;
        padding-left:10px
      }
      .bs-monitor-left-chart{
        width:100%;
        height:340px;
        color:#fff;
        margin-top:10px;
      }
      .bs-monitor-left-bottom{
        width:100%;
        height:160px;
        line-height:20px;
        color:#fff;
        margin-top:10px;
        .number{
          display:flex;
          .left_l{
            margin:10px 0 10px 30px;
          }
          .right{
            width:70px;
            height:70px;
            margin-left:60px;
            /*line-height: 80px;*/
            border:2px solid rgba(84,246,252);
            transform:rotate(45deg);
            position: relative;
            top:15px;
            .right_r{
              text-align:center;
              width:50px;
              transform-origin: 70% -10%;
              transform: rotate(-45deg);
              display:block;
            }
          }
        }
      }
    }
    .bs-monitor-right{
      width:75%;
      margin-left:10px;
      font-size: 20px;
      color:#fff;
      .test_two_box{
        width:100%;
        height:100%;
        .video-js{
          width:100%;
          height:100%;
        }
      }
    }
    /*background-color: rgba(84,246,252);*/
  }
</style>
<style>
  /*.el-table .warning-row {*/
  /*  background: oldlace;*/
  /*}*/

  /*.el-table .success-row {*/
  /*  background: #f0f9eb;*/
  /*}*/
  .el-table,
  .el-table__expanded-cell {
    background-color: transparent;
  }
  .el-table{
    font-size: 14px;
    color: #bcbdcd;
  }
  .el-table__header th {
    padding: 0;
    height: 20px;
    line-height: 20px;
  }
  .el-table th {
    background-color: transparent !important;
  //border-bottom: 1px solid #5078fc;
    color: #5078fc;
  }
  .el-table tr {
    background-color: transparent !important;
  }
  .el-table .cell {
    background-color: transparent;
  //color: rgba(255,255,255,1);
    border: none;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .el-table tbody tr:hover>td {
    background-color:rgba(232,232,232,0.3) !important;
  }
  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid rgba(232,232,232,0.5);
  //border-bottom:none;
  }
  .el-table__row>td {
  //border-bottom: 1px solid rgba(232,232,232,0.5);
    border-bottom:none;
  }

  .el-table::before {
    height: 0;
  }
</style>
