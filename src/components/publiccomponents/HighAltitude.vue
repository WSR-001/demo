<template>
  <div id="HighAltitude" style="height: 100%;"></div>
</template>

<script>
    import echarts from "echarts";

    export default {
      name: "HighAltitude",
      data(){
        return{
          echartsData:[],
        }
      },//data
      mounted() {
        this.init();
      },
      methods: {
        draw(){
          const myEcharts = echarts.init(document.getElementById('HighAltitude'));
          const options ={
            color: ['rgba(50,123,250,1)','rgba(244,201,7,1)', 'rgba(23,216,161,1)','rgba(122,60,235,1)','rgba(15,197,243,1)'],

            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              itemWidth: 12,// 标志图形的长度
              itemHeight: 8,// 标志图形的宽度
              top: "center",
              right: "15%",
              data:this.echartsData.map(item => item.name),
              textStyle: {
                color: ['rgba(50,123,250,1)','rgba(244,201,7,1)', 'rgba(23,216,161,1)','rgba(122,60,235,1)','rgba(15,197,243,1)'],
                fontSize: 10
              }
            },
            series: [
              {
                name:'',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '60%'],
                center: ['30%', '56%'],
                hoverAnimation: false,//取消选中放大特效
                legendHoverLink: false,
                silent: true,
                color: ['rgba(50,123,250,0.3)', 'rgba(244,201,7,0.3)', 'rgba(20, 220, 255,0.3)', 'rgba(242, 119, 20,0.3)', 'rgba(228, 68, 60,0.3)'],
                label: {
                  normal: {
                    show: false
                  }
                },
                data:this.echartsData.map(item => item.value),
              },
              {
                name:'安全装备违规佩戴',
                type:'pie',
                radius: ['70%', '85%'],
                center: ['30%', '56%'],
                color: ['rgba(50,123,250,1)', 'rgba(244,201,7,1)', 'rgba(20, 220, 255, 1)', 'rgba(242, 119, 20, 1)', 'rgba(228, 68, 60, 1)'],
                hoverAnimation: false,
                legendHoverLink: false,
                labelLine: {
                  normal: {
                    show: false,
                  }
                },
                label: {
                  normal: {
                    formatter: '{d}%',
                    padding: -30,
                    textStyle : {
                      align : 'center',
                      baseline : 'middle',
                      fontFamily : '微软雅黑',
                      fontSize:10,
                      // fontWeight : 'bolder'
                    }
                  }
                },
                data:this.echartsData,
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
          this.$http.get('/warning/DANGER/rate')//地址改
            .then(res => {
              let list=res.data.data;
              for(let i=0;i<list.length;i++){
                let obj={};
                obj.value=list[i].num;
                obj.name=list[i].unsafeBehaviorName;
                console.log(obj);
                this.echartsData.push(obj);
              }
              this.draw();
            }).catch(err => {
            console.log(err)
            this.$message.error({message: '数据异常sss', center: true})
          });
        },
      }
    }
</script>

<style scoped>

</style>
