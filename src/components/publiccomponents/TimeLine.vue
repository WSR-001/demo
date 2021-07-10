<template>
  <div class="timeLine" style="overflow: hidden;">
    <!--  节点描述  -->
    <div class="content" v-if="contentShow" :style="{left: tranLeft+'px', top: tranTop+'px'}">
      <p class="tit">{{timeLineList[timeIndex].year}}</p>
      <p>{{timeLineList[timeIndex].info}}</p>
    </div>
    <div class="my_timeline_prev" @click="moveRight">
      <i class="el-icon-arrow-left my_timeline_node"></i>
      <div class="my_timeline_item_line" style="margin-top: -10px;width:40px"></div>
      <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);"></div>
    </div>
    <!--  工程进度条  -->
    <div class="ul_box">
      <ul class="my_timeline" ref="mytimeline" style="margin-left: 10px;">
        <li class="my_timeline_item" v-for="(item,index) in timeLineList" :key="index">
          <!--圈圈节点-->
          <div class="my_timeline_node"
               style ="background-color:#ff1; width:12px ; height:12px;"
               @click="changeActive(index,$event)"
               :class="{active: index === timeIndex}"></div>
          <!--线-->
          <div class="my_timeline_item_line"></div>
          <!--标注-->
          <div class="my_timeline_item_content" style="color: #fff; font-size:12px">
            {{item.year}}
          </div>
        </li>
      </ul>
    </div>
    <div class="my_timeline_next" @click="moveLeft">
      <i class="el-icon-arrow-right my_timeline_node"></i>
      <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TimeLine",
    data() {
      return {
        timeIndex:-1,
        contentShow:false,
        tranLeft: 0, // 向左偏移-----获取
        tranTop: 0 , // 向右偏移
        timeLineList: [{
          timestamp: '2012年',

          // icon: 'el-iconprev',
          year: '2012',
          info: '开工'
        }, {
          timestamp: '2013年',
          year: '2013',
          info: '工作进度一'
        }, {
          timestamp: '2014年',
          year: '2014',
          info: '工作进度二'
        }, {
          timestamp: '2015年',
          year: '2015',
          info: '工作进度三'
        }, {
          timestamp: '2016年',
          year: '2016',
          info: '工作进度四'
        },  {
          timestamp: '2017年',
          year: '2017',
          info: '工作进度五'
        },{
          timestamp: '2016年',
          year: '2016',
          info: '工作进度四'
        }, {
          timestamp: '2555年',
          year: '2095',
          info: '体育馆建成了'
        }, {
          timestamp: '2016年',
          year: '2016',
          info: '工作进度四'
        }, {
          timestamp: '2017年',
          year: '2018',
          info: '工作进度八'
        }]
      }
    },
    methods: {
      changeActive(index,e) {
        // 根据事件处理参数e下的pageX，PageY来定位div的位置
        // 需要计算下div定位的差值 我这边是横轴是500左右纵轴是163左右
        this.tranLeft = (e.pageX - 20);
        this.tranTop = (e.pageY + 25);
        console.log(e.pageY+'px');
        console.log(this.contentShow);
        if(this.timeIndex !== index){
          this.timeIndex = index;
          this.contentShow=true;
        }else if(this.timeIndex === index){
          this.contentShow = !this.contentShow;
        }
        // this.timeIndex = index;
        // this.contentShow=true;
      },
      moveLeft()  {
        this.timeIndex = -1;
        this.contentShow=false;
        let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
        let listNum = 0;
        //判断最后一个节点是否显示每个节点长度30
        if(marginLeft <= 10 && (marginLeft >= -(this.timeLineList.length*40))){
          this.$refs.mytimeline.style.marginLeft = marginLeft - 100 + 'px';
        }
      },
      moveRight() {
        this.timeIndex = -1;
        this.contentShow=false;
        let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
        if(marginLeft < (-20)){
          this.$refs.mytimeline.style.marginLeft = marginLeft + 100 + 'px';
        }
      }
    }
  }
</script>

<style scoped>
  .my_timeline_prev, .my_timeline_next {
    float: left;
    color:#000;
    display: inline-block;
    width:12px;
    height:12px;
    border-radius: 50%;
    padding:0;
    background-color: #fff;
    cursor: pointer;
  }
  .my_timeline_prev {
    width: 12px;
    float: left;
    margin-top:20px;
    margin-right: 20px;
  }
  .my_timeline_next {
    margin-top:20px;
    width: 12px;
    margin-left: 0;
  }
  .content{
    width:100px;
    height:50px;
    background-color: rgba(246, 231, 231, 0.2);
    color:#fff;
    position:fixed;


  }
  .ul_box {
    width:85%;
    height: 100%;
    display: inline-block;
    /*padding-left:15px;*/
    float: left;
    margin-top: 20px;
    overflow: hidden;
  }
  .my_timeline{
    display:flex;
    flex-wrap: nowrap;
    justify-content:space-between;
  }
  .my_timeline_item {
    display: inline-block;
    width: 65px;
    flex-grow:1;
  }
  /*.my_timeline-begin_node{*/
  /*  !*background-color: #e4e7ed;*!*/
  /*  width:15px;*/
  /*  height:15px;*/
  /*  box-sizing: border-box;*/
  /*  border-radius: 50%;*/
  /*  !*margin-top:-15px;*!*/
  /*  cursor: pointer;*/
  /*  background-color: #fff !important;*/
  /*  border: 2px solid #f68720;*/
  /*}*/
  .my_timeline_node {
    /*background-color: #fff !important;*/
    /*border: 2px solid #f68720;*/
    box-sizing: border-box;
    border-radius: 50%;
    margin-top:0;
    cursor: pointer;
  }
  .my_timeline_node.active {
    background-color: #fff !important;
    border: 2px solid #f68720;
  }
  .my_timeline_item_line {
    width: 100%;
    height: 10px;
    margin: -7px 0 0 12px;
    border-top: 1px solid #E4E7ED;
    border-left: none;
  }
  .my_timeline_item_content {
    /*margin-left:-15px;*/
    width:80px;
  }
</style>
<!--https://www.cnblogs.com/duanzhenzhen/p/10937675.html横向时间线-->
