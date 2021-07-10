<template>
    <div class="violators-notification">
      <div class="bs-violators-top bgc" style="height:550px;margin-bottom: 0;padding:0;">
        <header class="bs-header">违规人员通报</header>
        <div class="bs-violators-table">
          <el-table
            :data="personList"
            style="width: 100%;"
            max-height="600px"
            @row-click="openDialog"
            stripe
            :cell-style="{padding: '3px'}"
            :row-style="{height: '40px'}"
            :header-row-style="{height:'40px'}"
            :header-cell-style="{color:'#81b89b'}"
          >
            <el-table-column
              prop="name"
              label="姓名"
              width="150" align="center">

            </el-table-column>
            <el-table-column
              prop="job"
              label="工种" align="center">

            </el-table-column>
            <el-table-column
              prop="nearNoticeTime"
              label="最近一次违规时间" align="center">
            </el-table-column>
            <el-table-column
              prop="dangerName"
              label="预警信息" align="center">

            </el-table-column>
            <el-table-column
              prop="personNoticeTimeSum"
              label="违规次数" align="center">
            </el-table-column>
            <!--              element-loading-text="Loading"-->
            <!--              empty-text="没有数据了哦"-->
          </el-table>

        </div>
      </div>
      <div class="dialog" v-if="isDialogShow" @click="cancelDialog">
        <div class="show-dialog">
          <header class="bs-header">人员信息</header>
          <i class="el-icon-circle-close close" @click="cancelDialog"></i>
          <el-row style="padding-top:20px;padding-left:15px;">
            <el-col :span="8">
              <img :src=showPerson.facePic width="100px" height="200px"/>
            </el-col>
            <el-col :span="16" style="color:#fff;font-size:14px;padding-top:15px;">
              <div>{{showPerson.name}}</div>
              <div>{{showPerson.job}}</div>
              <div>在岗</div>
              <div>{{showPerson.personNoticeTimeSum}}次</div>
              <div>{{showPerson.nearNoticeTime}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ViolatorsNotification",
      data() {
        return {
          isDialogShow:false,
          showPerson:{},
          personList: [
           /* {
      "name": "罗高卓",
      "job": "电工",
      "facePic": "http://scss.easyblog.top/16186495634036292fe70-062b-4d4e-a8c2-300b44fd847a.jpg",
      "nearNoticeTime": "2021-05-23 11:18:43",
      "dangerName": "抽烟",
      "personState": "1",
      "personNoticeTimeSum": 1
    },*/

          ],
        }
      },
      mounted() {
          this.init();
      },
      methods:{
          init(){
            this.$http.get('/warning/personnel_history_danger_behavior')
              .then(res => {
                this.personList=res.data.data;
              }).catch(err => {
              this.$message.error({message: '数据异常', center: true})
            });
          },
        //打开弹窗
        openDialog(row, event, column){//row代表选行所对应的数据
          //打开弹窗
          this.isDialogShow=true;
          //赋值数据
          this.showPerson=row;
        },
        // 关闭弹窗
        cancelDialog(){
          this.isDialogShow=false;
        }
      }
    }
</script>

<style>
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color: rgba(250, 250, 250,0.2);
  }
.violators-notification{
  padding-right:10px;
  position:relative;
}
  .dialog{
    position:absolute;
    top:0;
    left:0;
    z-index:100;
    height:100%;
    width:100%;

    background-color:rgba(0,0,0,0.3);
    margin: 0;
    padding:0;
  }
  .show-dialog{
    position:absolute;
    top:70px;
    left:32%;
    border-radius: 10px;
    box-shadow:0 0 5px 1px rgba(3,146,252,0.8);
    background-color: #06274d;
    height:300px;
    width:500px;
    margin-bottom: 0;
    padding:0;

  }
  .close{
    font-size: 18px;
    color:#fff;
    position:absolute;
    right:20px;
    top:5px;
    z-index:101;
  }
.bs-violators-table{
  padding-right:20px;
  padding-left:20px
}
</style>
