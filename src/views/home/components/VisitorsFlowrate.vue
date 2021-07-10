<template>
  <div id="VisitorsFlowrate" style="height: 90%;"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'SellListChart',
  data() {
    return {
      //显示数据
      names:[],
      num:[],
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    draw(){
      const myEcharts = echarts.init(document.getElementById('VisitorsFlowrate'));
      const options =  {

        "grid": {
          top: "10px",
          right: "10px",
          left: "30px",
          bottom: "20px",
        },
        xAxis: [
          {
            type: "category",
            data: this.names,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: "#ccc",
              interval: 0,
              textStyle: {
                fontSize: 10,
              },
              fontFamily: "LCDEF",
            },
          },
        ],
        "yAxis": [{
          // name: '人数/人',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ccc'
            }
          },
          type: "value",
          axisTick: {
            show: false,
          },
          splitLine: {
            "show": true,
            lineStyle: {
              "color": "#384267",
            }
          },
          axisLabel: {
            color: "#cccccc",
            fontSize: "10",
          },
        },
        ],
        "series": [{
          "type": "bar",
          "name": "数值",
          "barWidth": "20",
          "data": this.num,
          itemStyle: {
            normal: {
              color: '#42B7FD'
            }
          }
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
      this.$http.get('/member/human_num/hourly')
        .then(res => {
          let list=res.data.data;
          for(let i=0;i<list.length;i++){
            this.num.push(list[i].humanIn+list[i].humanOut);//人流量Top人流量数据
            this.names.push(list[i].regionName);//区域名称
          }
          //绘制图表
          this.draw();
        }).catch(err => {
        console.log(err)//异常打印
        this.$message.error({message: '数据异常', center: true})//异常提示
      });
    }
  }
}
</script>

<style scoped>

</style>
