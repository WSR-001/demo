<template>
  <div id="PersonnelViolations" style="height: 80%;"></div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: 'PersonnelViolations',
    data() {
      return {
        names:[],
        num:[],
        sum :200,
      };
    },
    methods:{
      draw(){
        const myEcharts = echarts.init(document.getElementById('PersonnelViolations'));

        const options = {
          grid: {
            top: '20px',
            bottom: -15,
            right: 20,
            left: 35,
            containLabel: true
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              textStyle: {
                color: "#fff"
              }
            },
          },
          xAxis: {
            show: false
          },
          yAxis: [
            {
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
                interval: 0,
                    color: ['#fff'],
                    lineHeight: 0,
                    fontSize: 10,
                    position:'left'
                  }

            }
          ],
          series: [
            {
              name: '人数',
              type: 'bar',
              showBackground: true,
              barBorderRadius: 30,
              yAxisIndex: 0,
              data: this.num,
              barWidth: 10,
              // align: left,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                      offset: 0,
                      color: 'rgb(57,89,255,1)'
                    },
                      {
                        offset: 0.7,
                        color: 'rgb(57,89,255,1)'
                      },
                      {
                        offset: 1,
                        color: '#5EDEE5'
                      }
                    ],
                    false
                  ),
                  barBorderRadius: 10
                },
                // color: '#A71A2B',
                barBorderRadius: 4,
              },
              label: {
                normal: {
                  color: '#fff',
                  show: true,
                  position: 'right',
                  textStyle: {
                    fontSize: 10
                  },
                  // data:this.num,
                  // formatter: function(a, b) {
                  //   return a.names
                  // }
                }
              }
            }
          ]
        };
        myEcharts.setOption(options, true);
        // 根据屏幕自适应
        window.addEventListener("resize",function(){
          myEcharts.resize();
        })
      },
      init(){
        this.$http.get('/warning/unsafe_num')
          .then(res => {
            let list=res.data.data;
            for(let i=0;i<list.length;i++){
              this.num.push(list[i].num);
              // console.log(this.date);
              this.names.push(list[i].unsafeBehaviorName);
            }
            this.draw();
          }).catch(err => {
          console.log(err)
          this.$message.error({message: '数据异常', center: true})
        });
      }
    },
    mounted() {
      this.init();
      // this.draw();
      // colornomal = ['#A71A2B'];

    }
  };
</script>

<style scoped>
  #UnSafeActStatistics {
    display: block;
  }
</style>

