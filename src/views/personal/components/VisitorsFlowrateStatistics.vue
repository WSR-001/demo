<template>
<!--  待整理-->
  <div id="VisitorsFlowrateStatistics" style="height: 85%;"></div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: 'VisitorsFlowrateStatistics',
    data() {
      return {
        //显示数据
        names:[],
        numIn:[],
        numOut:[],
      }
    },
    methods: {
      draw(){
        const myEcharts = echarts.init(document.getElementById('VisitorsFlowrateStatistics'));
        const options = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              show:false,
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(e){
              if(e.length>1){
                var S=e[1].data-e[0].data;//进出长人数差值
                //显示样式规定
                return "<span style='display:inline-block;margin-right:5px;" +
                  "border-radius:10px;width:9px;height:" +
                  "9px;background-color:rgba(36,207,233,0.9)\'></span>"
                  +e[0].axisValue+":<br>差值=进场人数－离场人数<br>="+S;
              }else if(e.length=1){
                return e[0].axisValue+":<br>"+e[0].seriesName+"="+e[0].data;
              }
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '10%',
            top:'16%',
            containLabel: true
          },
          legend: {
            data: ['进场人数', '离场人数'],
            left: 140,
            top:205,
            textStyle: {
              color:"#00ffff",
              fontSize:14
            },
            itemWidth: 12,
            itemHeight: 10,
            // itemGap: 35
            color: '#242424'
          },
          xAxis: {
            type: 'category',
            data: this.names,
            axisLine: {
              lineStyle: {
                show: true,
                lineStyle: {
                  color: '#6A989E',
                }
              }
            },
            axisLabel: {
              // interval: 0,
              // rotate: 40,
              textStyle: {
                fontFamily: 'Microsoft YaHei',
                color: '#fff',// x轴颜色
                fontWeight: 'normal',
                fontSize: '14',
                lineHeight: 22
              }
            },
          },

          yAxis: {
            type: 'value',
            name: "         人数/ 人 ",
            nameTextStyle: {
              color: '#ffffff'
            },
            axisLine: {
              show: false,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(135,140,147,0.8)'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(135,140,147,1)' //左侧显示线
              }
            },
            axisLabel: {
              formatter: '{value}',
              color: '#fff',
              fontSize: 12
            }
          },
          series: [
            {
              name: '进场人数',
              type: 'bar',
              barWidth: '10',
              itemStyle: {
                normal: {
                  opacity: .7,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'blue'
                  }, {
                    offset: 1,
                    color: '#7EC0EE'
                  }]),
                  barBorderRadius: 0,
                  //右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始,数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                },

              },
              label: {
                show: true,
                position: ['-18','-18'],
                color: '#00f8ff',
                fontSize: 12,
              },
              data:this.numIn,
            },
            {
              name: '离场人数',
              type: 'bar',
              barWidth: '10',
              itemStyle: {
                normal: {
                  opacity: .7,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FF2246'
                  }, {
                    offset: 1,
                    color: '#FFC0CB'

                  }]),
                  barBorderRadius: 0,
                }

              },
              label: {
                show: true,
                position: ['18','-18'],
                color: '#00f8ff',
                fontSize: 12,
              },
              data: this.numOut,
            },
          ]
        };
        myEcharts.setOption(options, true);
        // 根据屏幕自适应
        window.addEventListener("resize",function(){
          myEcharts.resize();
        })
      },
      init(){
        // const myEcharts.showLoading()//开启加载动画
        this.$http.get('/member/human_num/daily')
          .then(res => {
            // console.log();
            console.log(res.data.data);
            let list=res.data.data;
            for(let i=0;i<list.length;i++){
              this.numIn.push(list[i].humanIn);
              this.numOut.push(list[i].humanOut);
              this.names.push(list[i].regionName);
            }
            // this.myEcharts.hideLoading();//关闭加载动画
            //绘制图表
            this.draw();
          }).catch(err => {
          console.log(err)//异常打印
          this.$message.error({message: '数据异常', center: true})//异常提示
        });
      }
    },
    mounted() {
        this.init();
    },
  }
</script>

<style scoped>

</style>

