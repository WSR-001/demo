
<template>
  <div id="ondutyaweek" style="height: 84%;"></div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "OnDutyAWeek",
    data(){
      return{
        date:[],
        num:[],
        timer:{},
      }
    },//data
    methods: {
      draw(){
        const myEcharts = echarts.init(document.getElementById('ondutyaweek'));
        const  options={

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
          },
          grid: {
            top: '30px',
            left: '10px',
            right: '40px',
            bottom: '15px',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            axisLine: {
              show: true
            },
            splitArea: {
              // show: true,
              color: '#f00',
              lineStyle: {
                color: '#f00'
              },
            },
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            },
            boundaryGap: false,
            data: this.date,

          }],

          yAxis: [{
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(0,255,255,0.1)'
              }
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 40,
              textStyle: {
                color: '#d1e6eb',

              },
            },
            axisTick: {
              show: false,
            },
          }],
          series: [{
            name: '到岗人数',
            type: 'line',
            // smooth: true, //是否平滑
            showAllSymbol: true,
            hoverAnimation: false,//取消选中放大特效
            legendHoverLink: false,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 15,
            lineStyle: {
              normal: {
                color: "rgba(13,82,187)",

              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgba(3,127,252)',
              }
            },
            itemStyle: {
              color: "rgba(3,127,252)",
              borderColor: "#fff",
              borderWidth: 1,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(3,127,252,0.6)'
                },
                  {
                    offset: 1,
                    color: 'rgba(3,127,252,0.1)'
                  }

                ], false),
                shadowColor: 'rgba(3,127,252, 0.9)',
                shadowBlur: 20
              }
            },
            data: this.num
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
        this.$http.get('/member/pastSevenDaysClockInTrend')
          .then(res => {
            // console.log(res);
            let list=res.data.data;
            // console.log(list);

            for(let i=0;i<list.length;i++){
              this.date.push(list[i].dateTime);
              // console.log(this.date);
              this.num.push(list[i].total);
            }
            //绘制图表
            this.draw();
          }).catch(err => {
          console.log(err)
          this.$message.error({message: '数据异常', center: true})
        });
      }
    },
    destroy(){
      // clearInterval(this.timer);
  },
    mounted() {
      // if(this.timer){
      //   clearInterval(this.timer);
      // }else {
      //   this.timer = setInterval(() => {
          this.init(); //每秒循环调用的方法函数（循环）
      //   }, 1000 * 30); //1000毫秒为1秒
      // }//此处删除了}

    },

  }
</script>

<style scoped>

</style>

