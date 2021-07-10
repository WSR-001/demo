<template>
  <div id="NotificationOfViolators" style="height: 80%;"></div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: 'NotificationOfViolators',
    data() {
      return {
        total : 10, // 数据总数
        names:[],
        num:[],
        category: [
        //   {
        //     name: "周九",
        //     value: 17
        //   }
        ],
      };
    },
    mounted() {
      this.init();
      // this.draw();
    },
    methods: {
      draw(){
        const myEcharts = echarts.init(document.getElementById('NotificationOfViolators'));

        const options =  {
          grid: {
            left: 60,
            top: 20, // 设置条形图的边距
            right: 50,
            bottom: 20
          },
          xAxis: {
            max: this.total,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          },

          yAxis: [{
            type: "category",
            inverse: false,
            data: this.names,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }],
          series: [{
            // 内
            type: "bar",
            barWidth: 18,

            legendHoverLink: false,
            silent: true,
            itemStyle: {
              normal: {
                color: '#1588D1',
              }
            },
            label: {
              normal: {
                show: true,
                position: "left",
                formatter: "{b}",
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              }
            },
            data: this.num,
            z: 1,
            animationEasing: "elasticOut"
          },
            {
              // 分隔
              type: "pictorialBar",
              itemStyle: {
                normal:{
                  color:"#061348"
                }
              },
              symbolRepeat: "fixed",
              symbolMargin: 6,
              symbol: "rect",
              symbolClip: true,
              symbolSize: [1, 21],
              symbolPosition: "start",
              symbolOffset: [1, -1],
              symbolBoundingData: this.total,
              data: this.num,
              z: 2,
              animationEasing: "elasticOut"
            },
            {
              // 外边框
              type: "pictorialBar",
              symbol: "rect",
              symbolBoundingData: this.total,
              itemStyle: {
                normal: {
                  color: "none"
                }
              },
              label: {
                normal: {
                  formatter: (params) => {
                    var text;
                    text = '{a|  '+params.data+'次'+'}';
                    return text;
                  },
                  rich:{
                    a: {
                      color: '#fff'
                    },
                  },
                  position: 'right',
                  distance: 0, // 向右偏移位置
                  show: true
                }
              },
              data: this.num,
              z: 0,
              animationEasing: "elasticOut"
            },
            {
              name: "外框",
              type: "bar",
              barGap: "-120%", // 设置外框粗细
              data: [this.total,this.total,this.total,this.total,this.total,this.total],
              barWidth: 25,
              itemStyle: {
                normal: {
                  color: "transparent", // 填充色
                  barBorderColor: "#1C4B8E", // 边框色
                  barBorderWidth: 1, // 边框宽度
                  // barBorderRadius: 0, //圆角半径
                  label: {
                    // 标签显示位置
                    show: false,
                    position: "top" // insideTop 或者横向的 insideLeft
                  }
                }
              },
              z: 0
            }
          ]
        };
        myEcharts.setOption(options, true);
      },
      init(){
        this.$http.get('/warning/personnel_history_danger_behavior')//修改地址
          .then(res => {
            let list=res.data.data;
            for(let i=0;i<list.length;i++){
              this.num.push(list[i].personNoticeTimeSum);
              this.names.push(list[i].name);
            }
           this.draw();
          }).catch(err => {
          this.$message.error({message: '数据异常', center: true})
        });
      },
    },
  };
</script>

<style scoped>

</style>
