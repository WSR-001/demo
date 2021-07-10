<template>
  <div id="construction-days" style="height: 100%;"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'ConstructionDays',
  data() {
    return {

    };
  },
  mounted() {
    const myEcharts = echarts.init(document.getElementById('construction-days'));

    let realDate=[536];//从后端得到该数据
    let planDate=813;
    const options = {
      title: {
        text: realDate,
        textStyle: {
          color: '#28BCFE',
          fontSize: 20
        },

        itemGap: 20,
        center: ['50%', '50%'],
        left: 'center',
        top: '43%'
      },
      graphic: [{
        type: 'text',
        z: 100,
        left: 'center',
        top: '85%',
        style: {
          fill: '#28BCFE',
          text: "已施工（天）",
          font: '14px Microsoft YaHei'
        }
      }],
      tooltip: {
        show:false,
      },
      angleAxis: {
        max: planDate,//计划总时间
        clockwise: true, // 逆时针
        // 隐藏刻度线
        show: false
      },
      radiusAxis: {
        type: 'category',
        show: true,
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
      polar: {
        // center: ['40%', '35%'],
        center: ['50%', '50%'],
        radius: '110%' //图形大小
      },
      series: [{
        type: 'bar',
        data: realDate,
        showBackground: true,
        backgroundStyle: {
          color: '#BDEBFF',
        },
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 8,
        itemStyle: {
          normal: {
            opacity: 1,
            color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#25BFFF'
            }, {
              offset: 1,
              color: '#5284DE'
            }]),
            // shadowBlur: 2,
            // shadowColor: '#2A95F9',
          }
        },
      }]
    };
    myEcharts.setOption(options, true);
  },
  methods: {},
};
</script>

<style scoped>

</style>
