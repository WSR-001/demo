<template>
  <div id="AllTypesOfWork" style="height: 90%;"></div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "AllTypesOfWork",
    data(){
      return{

        num:[],
        names:[],
      }
    },//data
    methods: {
      draw(){
        const myEcharts = echarts.init(document.getElementById('AllTypesOfWork'));
        const options = {
          grid: {
            left: '5px',
            right: '5px',
            bottom: '0',
            top: '10px',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function(params) {
              return params[0].name + '<br/>' +
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                params[0].seriesName + ' : ' + Number(params[0].value ).toLocaleString() + ' 人<br/>'
            }
          },
          xAxis: {
            show: false,
            type: 'value'
          },
          yAxis: [{
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              },
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: this.names
          }, {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '12'
              },
              formatter: function(value) {
                return value .toLocaleString() + '人';
              },
            },
            data: this.num,
          }],
          series: [{
            name: '人数',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgb(57,89,255,1)'
                }, {
                  offset: 1,
                  color: 'rgb(46,200,207,1)'
                }]),
              },
            },
            barWidth: 10,
            data: this.num,
          },
            {
              name: '背景',
              type: 'bar',
              barWidth: 10,
              barGap: '-100%',
              data: this.num,
              itemStyle: {
                normal: {
                  color: 'rgba(24,31,68,1)',
                  barBorderRadius: 30,
                }
              },
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
        this.$http.get('/member/num/detail')
          .then(res => {
            // console.log();
            this.num=res.data.data.workerNumList;
            this.names=res.data.data.jobNameList;
            this.draw();
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

<style scoped>

</style>


