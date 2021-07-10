<template>
  <div class="layout">
    <el-row>
      <el-col :span="16">
        <div class="bs-security-img-left bgc" style="margin:0;padding: 0">
<!--          <header class="bs-header">65门禁入口人脸识别通道</header>-->
          <img :src=showImg.dangerBehaviorPic width="100%" height="530px"/>
        </div>
      </el-col>
      <el-col :span="8" style="padding-left:10px">
        <el-col>
          <div class="today-statistics bgc" style="margin:0">
            <header class="bs-header">今日统计</header>
            <el-row style="font-size:14px;color:#fff">
              <el-col :span="12" class="bs-col-center" v-for="(item,index) in warningMsg" :key="index">
                  <div style="margin-left:25px">
                    <span>{{item.unsafeBehaviorName}}</span>
                    <span>:</span>
                    <span  class="bs-today-statistics-span">{{item.num}}</span>
                    <span>人</span>
                  </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col>
          <div class="capture-pictures bgc">
            <header class="bs-header">抓拍图片</header>
            <ul class="bs-capture-pictures-ul">
              <li v-for="(item,index) in imgList" :key="index" style="width:49%;height:110px">
                <img :src=item.dangerBehaviorPic width="100%" @click="enlargeImg(index)" height="100px"/>
<!--                <div>{{item.src}}</div>-->
              </li>
            </ul>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>

    export default {
      name:'LayOut',
      data(){
        return{
          warningMsg:[],
          imgList:[ ],
          showImg:{},
        };
      },
      methods:{
        enlargeImg(index){
          this.showImg=this.imgList[index]
        },
        init(){
          this.$http.get('/warning/today_all_info')//修改地址
            .then(res => {
              this.imgList=res.data.data;
              // for(let i=0;i<list.length;i++){
              //   this.imgList.push(list[i].dangerBehaviorPic);
              // }
              this.showImg=this.imgList[0];//默认放大第一张
            }).catch(err => {
            this.$message.error({message: '数据异常11', center: true})
          });
          this.$http.get('/warning/all_type_unsafe_num')//修改地址
            .then(res => {
              this.warningMsg=res.data.data;
              // for(let i=0;i<list.length;i++){
              //   this.imgList.push(list[i].dangerBehaviorPic);
              // }

            }).catch(err => {
            this.$message.error({message: '数据异常1d', center: true})
          });
        }
      },
      mounted() {
        this.init();
      }
    }
</script>

<style lang="scss">
  .layout{
    .bs-security-img-left{
      padding:0;

    }
    .today-statistics{
      height:140px;
      padding:0 0 10px 0;
    }
    .capture-pictures{
      padding:0;
      width:100%;
      margin-bottom:0;
      height:410px;
    }
  }
  .bs-col-center{
    display:flex;
    height:20px;
    /*justify-content:center;!*主轴上居中*!*/
    align-items:center;/*侧轴上居中*/
  }
  .bs-today-statistics-span{
    /*background-color: #0f86c6;*/
    /*font-size:20px;*/
    font-weight:bold;
    color: #9dd1ee;
  }
  .bs-capture-pictures-ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /*align-items: flex-start;*/
    padding:10px;
    width:100%;
    max-height:90%;
    overflow-y:auto;
  }
</style>
