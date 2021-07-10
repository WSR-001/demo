<template>
  <div id="Water" style="width:100%;height: 100%;"></div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: 'Water',
    data() {
      return {
        data:[{
          name: '办公区',
          value: 1142
        },
          {
            name: '生活区',
            value: 1365
          },
          {
            name: '施工区',
            value: 1588
          },

        ],
      };
    },
    methods: {

    },

    mounted() {
      const myEcharts = echarts.init(document.getElementById('Water'));

      const center = ['50%', '60%'];
      const color = [
        //
        '#00ffd9',
        // '#86c200',
        '#87ec70',
        // '#ffbb00',
        '#70bef3',
        // '#e31404'
      ];
      let data = this.data;
      //根据各区域用水量显示各区域颜色占总比
      const originDataLen = data.length;
      const spanAngle = 90;
      const repeatedMultiple = 180 / spanAngle;
      const addDataLen = parseInt((repeatedMultiple - 1) * originDataLen);
      for (let index = 0; index < addDataLen; index++) {
        data.push({
          name: null,
          value: 0,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
          },
          tooltip: {
            show: false
          }
        });
      }

      const options = {
        // backgroundColor: '#11011e',
        color,
        tooltip: {
          show: true
        },
        legend: {
          orient: 'vertical',
          itemWidth: 12,// 标志图形的长度
          itemHeight: 8,// 标志图形的宽度
          // top: "center",
          bottom:"5px",
          right: "center",
          data: ['办公区', '生活区', '施工区', ],
          textStyle: {
            color,
            fontSize: 10
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['0%', '0%'],
            center,
            silent: true,
            clockwise: false,
            label: {
              show: false
            },
            data: [{
              name: null,
              value: spanAngle,
              itemStyle: {
                color: 'rgba(220,220,220,0)',
                borderColor:'rgba(255,255,255,.3)',
              }
            },
              {
                name: null,
                value: 360 - spanAngle,
                itemStyle: {
                  color: 'rgba(220,220,220,0)',
                }
              }
            ]
          },
          {
            type: 'pie',
            startAngle: 0,
            roseType: 'area',
            clockwise: false,
            center,
            radius: ['30%', '70%'],
            data:data,
            label: {
              show: true
            },
            labelLine: {
              show: true,
              length: 0,
              // length2: 100
            },
            emphasis: {
              labelLine: {
                show: true
              }
            }
          }]
      };
      myEcharts.setOption(options, true);
      // 根据屏幕自适应
      window.addEventListener("resize",function(){
        myEcharts.resize();
      })
    }
  };
</script>

<style scoped>

</style>


