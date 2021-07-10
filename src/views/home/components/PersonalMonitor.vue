<template>
  <div id="PersonalMonitor" style="height: 80%;"></div>
</template>

<script>
    import echarts from "echarts";

    export default {
      name: "PersonalMonitor",
      data(){
        return{
          // data: [444, 222, 333, 232,252],
          // dataY:['区域1', '区域2', '区域3', '区域4', '区域5'],
          options:{
            // backgroundColor:'red',
            grid: {
              left: '5%',
              right: '5%',
              bottom: '-20%',

              top: '10%',
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'none'
              },
              formatter: function(params) {
                return "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                  params[0].name  + ' : ' + Number(params[0].value).toLocaleString() + ' 人<br/>'
              }
            },
            xAxis: {
              show: false,
              type: 'value'
            },
            yAxis: [{
              type: 'category',
              inverse: true,
              // color:['red','blue','pink','green','skyblue'],
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 10,
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
              data: ['区域1', '区域2', '区域3', '区域4', '区域5']
            }, {
              type: 'category',
              inverse: true,
              axisTick: 'none',
              axisLine: 'none',
              show: true,
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: '10'
                },
                formatter: function(value) {
                  if (value >= 10000) {
                    return (value / 10000).toLocaleString() + '人';
                  } else {
                    return value.toLocaleString();
                  }
                },
              },
              data: [1, 2, 4, 4,2],
            }],
            series: [
              {
                name: '区域',
                type: 'bar',
                zlevel: 1,
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: function (params){
                      var colorList = ['#42DBA2','#F2E33F','#F2B63F','#F27714','#E4443C'];
                      return colorList[params.dataIndex];
                    },//柱形显示多种颜色
                  },
                },
                barWidth: 8,
                data: [1, 2, 4, 4,2]
              },
              {
                name: '背景',
                type: 'bar',
                barWidth: 8,
                barGap: '-100%',

                data: [6, 6, 6, 6, 6],
                itemStyle: {
                  normal: {
                    color: 'rgba(255, 255, 255, 0.15)',
                    barBorderRadius: 30,
                  }
                },
              },
            ]
          },
        }
      },//data
      mounted() {
        const myEcharts = echarts.init(document.getElementById('PersonalMonitor'));

        myEcharts.setOption(this.options, true);
        // 根据屏幕自适应
        window.addEventListener("resize",function(){
          myEcharts.resize();
        })
      },
      methods: {}
    }
</script>

<style scoped>

</style>
