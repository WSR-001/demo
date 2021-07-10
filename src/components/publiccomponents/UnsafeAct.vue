<template>
    <div id="UnsafeAct" style="height: 85%;"></div>
</template>

<script>
    import echarts from "echarts";

    export default {
      name: "UnsafeAct",
      data(){
        return{
          // names:[],
          echartsData: [
            // {
            //   value: 3,
            //   name: '投掷',
            // },
            // {
            //   value: 3,
            //   name: '睡觉',
            // },
            // {
            //   value: 6,
            //   name: '抽烟',
            // },
            // {
            //   value: 4,
            //   name: '追逐',
            // },
          ],

        }
      },//data
      mounted() {
        this.init();
      },
      methods: {
        draw(){
          const myEcharts = echarts.init(document.getElementById('UnsafeAct'));
          //玫瑰图数据
          // myEcharts.showLoading();
          // myEcharts.hideLoading();//加载动画
          const options = {
            color: ['rgba(50,123,250,1)','rgba(244,201,7,1)', 'rgba(23,216,161,1)','rgba(185, 120, 100,1)','rgba(228,80,60,1)'],
            legend: {
              orient: 'vertical',
              itemWidth: 12,// 标志图形的长度
              itemHeight: 8,// 标志图形的宽度
              top: "center",
              right: "10px",
              data:this.echartsData.map(item => item.name),
              textStyle: {
                color: ['rgba(50,123,250,1)','rgba(244,201,7,1)', 'rgba(23,216,161,1)','rgba(185, 120, 50,1)','rgba(228,80,60,1)'],
                fontSize: 10
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            series: {
              name: '不安全行为',
              type: 'pie',
              hoverAnimation: false,
              legendHoverLink: false,
              roseType: 'radius',
              radius:['50%', '90%'],
              center: ['30%', '50%'],
              data: this.echartsData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  formatter: '{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                  textStyle : {
                    align : 'center',
                    baseline : 'middle',
                    fontFamily : '微软雅黑',
                    fontSize:10,
                    // fontWeight : 'bolder'
                  }
                },
              },
              labelLine: {
                length: 1,
                length2: 20,
                smooth: false
              },
            }
          };
          myEcharts.setOption(options, true);
          // 根据屏幕自适应
          window.addEventListener("resize",function(){
            myEcharts.resize();
          })
          let value = 555;
          let title = '';
          let int = value.toFixed(2).split('.')[0];
        },
        init(){
          this.$http.get('/warning/UNSAFE/rate')//地址改
            .then(res => {
              let list=res.data.data;

              for(let i=0;i<list.length;i++){
                // this.names.push(list[i].unsafeBehaviorName);
                let obj={};
                obj.value=list[i].num;
                obj.name=list[i].unsafeBehaviorName;
                console.log(obj);
                this.echartsData.push(obj);
              }
              this.draw();
            }).catch(err => {
            console.log(err)
            this.$message.error({message: '数据异常', center: true})
          });
        }
      },

      //计算属性
    //   function getRich() {
    //     let result = {}
    //     colorLine.forEach((v, i) => {
    //       result[`hr${i}`] = {
    //         backgroundColor: colorLine[i],
    //         borderRadius: 3,
    //         width: 3,
    //         height: 3,
    //         padding: [3, 3, 0, -12]
    //       }
    //       result[`a${i}`] = {
    //         padding: [8, -60, -20, -20],
    //         color: colorLine[i],
    //         fontSize: 12
    //       }
    //     })
    //     return result
    // }
    }
</script>

<style scoped>

</style>
