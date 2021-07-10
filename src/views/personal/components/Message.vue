<template>
    <div class="Message"  style="font-size:12px;color:#fff;">
      <div class="project-msg bgc" style="margin-top:0;">
        <h4>项目信息</h4>
        <el-row :gutters="20">
          <el-col :span="8">
          <!--不是按钮需要修改 -->
            <div style="width:80px;overflow:hidden;padding:5px 5px 5px 10px;">
              <i class="el-icon-office-building" style="float: left;margin-top:3px;"></i>
              <span style="float: right">工程状态 </span>
            </div>
            <div style="font-size:14px;text-align:center;background-color:rgba(3,246,252,0.3);color:#52f17d;">在建</div>
          </el-col>
          <el-col :span="8">
            <div style="width:80px;overflow:hidden;padding:5px 5px 5px 10px;">
              <i class="el-icon-office-building" style="float: left;margin-top:3px;"></i>
              <span style="float: right">合同工期 </span>
            </div>
            <div style="font-size:14px;text-align:center;background-color:rgba(3,246,252,0.2);color:#fff;">{{contractDuration}}天</div>
          </el-col>
          <el-col :span="8">
            <div style="width:80px;overflow:hidden;padding:5px 5px 5px 10px;">
              <i class="el-icon-office-building" style="float: left;margin-top:3px;"></i>
              <span style="float: right">施行天数 </span>
            </div>
            <div style="font-size:14px;text-align:center;background-color:rgba(3,246,252,0.1);color:#fff;">{{executeDate}}天</div>
          </el-col>
        </el-row>
      </div>
      <div class="person-msg bgc">
        <h4>人员信息</h4>
          <el-row :gutters="20">
            <el-col :span="10">
              <div class="left">
                <i class="el-icon-user-solid" style="font-size:20px;color:#fff;transform-origin: 80% 50%;transform: rotate(-45deg);"></i>
                <br/>
                <span class="left_r">
                  项目人员总数 {{tatol}}人
                </span>
              </div>
            </el-col>
            <el-col :span="14" style="padding-top:15px">
              <el-row><el-col :span="18">管理人员</el-col><el-col :span="6">{{adminUserNum}}</el-col></el-row>
              <el-row><el-col :span="18">劳务人员</el-col><el-col :span="6">{{workerNum}}</el-col></el-row>
              <el-row><el-col :span="18">实名制人员</el-col><el-col :span="6">{{realNameNum}}</el-col></el-row>
              </el-col>
          </el-row>
      </div>
      <div class="person-act bgc">
        <h4>人员动态</h4>
        <el-row>
          <el-col :span="10">
            <div id="Attendance" style="height:80%">
            </div>
          </el-col>
          <el-col :span="14">
            <el-col>
              <el-row>
                <el-col :span="12" >场内人数
                </el-col>
                <el-col :span="12">今日出勤人数
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">{{clockInUserNum}}
                </el-col>
                <el-col :span="12">{{clockInUserNum}}
                </el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row><el-col :span="18">管理人员</el-col><el-col :span="6">{{allClockInManagerNum}}</el-col></el-row>
              <el-row><el-col :span="18">劳务人员</el-col><el-col :span="6">{{workerNum}}</el-col></el-row>
              <el-row><el-col :span="18">上报人员</el-col><el-col :span="6">{{allClockInWorkerNum}}</el-col></el-row>
            </el-col>
          </el-col>

        </el-row>
      </div>
      <div class="all-person-condition bgc" style="height:190px;">
        <h4>各工种情况</h4>
        <all-types-of-work></all-types-of-work>
      </div>
    </div>
</template>

<script>
    import AllTypesOfWork from "./AllTypesOfWork";
    import echarts from "echarts";
    export default {
      name: "Message",
      components: {AllTypesOfWork},
      data() {
        return {
          contractDuration: 865,
          executeDate:432,
          result:'',
          tatol:0,
          adminUserNum:0,
          realNameNum:0,
          workerNum:0,
          clockInUserNum:0,
          allClockInWorkerNum:0,
          allClockInManagerNum:0,
        }
      },
      methods: {
        draw(){
          const myEcharts = echarts.init(document.getElementById('Attendance'));

          let num = 180;
          let attendance=282;
          // let result=this.d*100+'%';
          // console.log(this.d);
          // console.log('1111111111111111111111111111111');
          const options = {
            title: [{
              text: '出勤率',
              x: 'center',
              top: '50%',
              textStyle: {
                color: 'rgba(3,146,252)',
                fontSize: 14,
                fontWeight: '100',
              }
            }, {
              text:this.result+'%' ,
              x: 'center',
              top: '30%',
              textStyle: {
                fontSize: '14',
                color: 'rgba(3,146,252)',
                fontFamily: 'Lato',
                fontWeight: '600',
              },
            }],
            polar: {
              radius: ['64%', '75%'],
              center: ['50%', '50%'],
            },
            angleAxis: {
              max: attendance,
              show: false,
            },
            radiusAxis: {
              type: 'category',
              show: false,
              axisLabel: {
                show: false,
              },
              axisLine: {
                show: false,

              },
              axisTick: {
                show: false
              },
            },
            series: [
              {
                name: '',
                type: 'bar',
                roundCap: true,
                barWidth: 50,
                showBackground: true,
                backgroundStyle: {
                  // color: '#28BCFE',
                  color:'rgba(189,229,148,0.37)'
                },
                data: num,
                coordinateSystem: 'polar',

                itemStyle: {
                  normal: {
                    color: '#25a9ea',
                  }
                }

              },
              {
                type: 'gauge',
                name: '',
                radius: '100%',
                startAngle: '0',
                endAngle: '-359.99',
                splitNumber: '50',
                center: ['50%', '50%'],
                pointer: {
                  show: false
                },
                detail: {
                  show: false
                },
                data: [{
                  value: 95,
                  name: ''
                }],
                axisLine: {
                  lineStyle: {
                    width: 10,
                    opacity: 0
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: true,
                  length: 8,
                  lineStyle: {
                    color: {
                      type: 'linear',
                      x: 1,
                      y: 0,
                      x2: 0,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: '#999'
                      }, {
                        offset: 0.5,
                        color: 'rgba(66, 66, 66, 1)',
                      }, {
                        offset: 1,
                        color: '#999'
                      }],
                      globalCord: false
                    },
                    width: 1,
                    type: 'solid',
                  },
                },
                axisLabel: {
                  show: false
                }
              },
              {
                name: '',
                type: 'pie',
                startAngle: 90,
                radius: ['80%', '85%'],
                hoverAnimation: false,
                center: ['50%', '50%'],
                itemStyle: {
                  normal: {
                    labelLine: {
                      show: false
                    },
                    color: 'rgba(2,190,246,.5)',
                    shadowBlur: 10,
                    shadowColor: 'rgba(2,190,246,.3)',
                  }
                },
                data: [{
                  value: 100,
                }]
              },
            ]
          };

          myEcharts.setOption(options, true);
        },
        init(){
          this.$http.get('/member/clockInNum')
            .then(res => {
              console.log(res);
              this.result=res.data.data.clockRate;
              this.clockInUserNum=res.data.data.clockInUserNum;
              this.allClockInWorkerNum=res.data.data.allClockInWorkerNum;
              this.allClockInManagerNum=res.data.data.allClockInManagerNum;
              this.draw();

            }).catch(err => {
            console.log(err)
            this.$message.error({message: '数据异常', center: true})
          });
          this.$http.get('/member/num/overview')
            .then(res => {
              console.log(res);
              this.tatol=res.data.data.total;
              this.adminUserNum=res.data.data.adminUserNum;
              this.realNameNum=res.data.data.realNameNum;
              this.workerNum=res.data.data.workerNum;
            }).catch(err => {
            console.log(err)
            this.$message.error({message: '数据异常', center: true})
          });
        }
      },
      mounted() {
        this.init();
      },
    }
</script>

<style lang="scss">
.Message{
  .person-msg{
    color:white;
    height:135px;
    .left{
      position:relative;
      top:18px;
    }
  }
}
.left{
      width:70px;
      height:70px;
      margin-left:20px;
      /*line-height: 80px;*/
      border:2px solid rgba(3,146,252);
      transform:rotate(45deg);
      .left_r{
        text-align:center;
        color:#fff;
        width:70px;
        font-size:12px;
        transform-origin: 50% 50%;
        transform: rotate(-45deg);
        display:block;
      }
    }
h5{
color:#fff;
}
</style>
