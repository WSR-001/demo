<template>
  <div id="UnSafeActStatistics1" style="width:100%;height: 200px;"></div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: 'UnSafeActStatistics1',
    props:["activeName"],
    data() {
      return {
        num:[],
        names:[],
        chartLine:{},
      };
    },
    methods: {
      draw(){
        const myEcharts = echarts.init(document.getElementById('UnSafeActStatistics1'));
        this.chartLine=myEcharts;
        const options = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              textStyle: {
                color: "#fff"
              }
            },
            // formatter: function(params) {
            //   return "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
            //     params[0].name  + ' : ' + Number(params[0].value).toLocaleString() + ' 人<br/>'
            // }
          },

          grid: {
            borderWidth: 0,
            top: '45px',
            bottom: '40px',
            textStyle: {
              color: "#fff"
            }
          },

          calculable: true,
          xAxis: [{
            type: "category",
            axisLine: {
              lineStyle: {
                color: "rgba(204,187,225,0.5)",
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: this.names,
          }],

          yAxis: [{
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "rgba(204,187,225,0.5)",
              }
            },

          }],

          series: [{
            name: "",
            type: "line",
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              color: "#cc86d2",
            },
            markPoint: {
              label: {
                normal: {
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              data: [{
                type: 'max',
                name: '最大值',

              }, {
                type: 'min',
                name: '最小值'
              }]
            },
            data: this.num,
          }, ]
        };
        myEcharts.setOption(options, true);
        // 根据屏幕自适应
        window.addEventListener("resize",function(){
          myEcharts.resize();
        })
      },
      init(){
        this.$http.get('/warning/half_month_danger_trend')
          .then(res => {
            let list=res.data.data;
            for(let i=0;i<list.length;i++){
              this.num.push(list[i].warningNum);
              this.names.push(list[i].date);
            }
            //绘制图表
            this.draw();
          }).catch(err => {
          console.log('111111111111111111');
          console.log(err)
          this.$message.error({message: '数据异常11', center: true})
        });
      }
    },
    watch: {
      activeName: function() {
        this.chartLine.resize();
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped>
  #UnSafeActStatistics {
    display: block;
  }
</style>

