<template>
    <div class="security-warning">
      <div class="bs-security-top bgc" style="height:550px;margin-bottom: 0;padding:0;">
        <header class="bs-header">安全告警</header>
        <div class="bs-security-table">
          <el-table
            :data="alertData"
            style="width: 100%;"
            max-height="600px"
            stripe
            :cell-style="{padding: '3px'}"
            :row-style="{height: '40px'}"
            :header-row-style="{height:'40px'}"
            :header-cell-style="{color:'#81b89b'}"
           >
            <el-table-column
              prop="createTime"
              label="时间"
              width="150" align="center">

            </el-table-column>
            <el-table-column
            prop="regionName"
            label="区域" align="center">
          </el-table-column>
            <el-table-column
              prop="dangerBehaviorName"
              label="预警信息" align="center">

            </el-table-column>
            <el-table-column
              prop="state"
              label="状态" align="center">

              <template slot-scope="scope">
                <el-button @click="handleStateClick(scope.row)" :type="stateColor[scope.row.state]" :disabled="scope.row.state==1" size="mini">{{stateText[scope.row.state]}}</el-button>
                <!--                  <el-button type="text" size="small">编辑</el-button>-->
              </template>
            </el-table-column>
            <!--              element-loading-text="Loading"-->
            <!--              empty-text="没有数据了哦"-->
          </el-table>
          <div class="dialog" v-if="dealDialogShow" @click="cancelSend">
            <div class="bs-security-table-dialog">
              <i class="el-icon-circle-close close" @click="cancelSend"></i>
              <el-row style="position: relative">
                <el-col :span="10" style="padding:10px 0 10px 20px;">
                  <img :src=dealData.dangerBehaviorPic width="120px" height="75px"/>
                </el-col>
                <el-col :span="14" style="padding:10px 10px 5px 10px;font-size:12px;color:#fff;">
                  <el-col style="padding-bottom:5px;">{{dealData.createTime}}</el-col>
                  <el-col style="padding-bottom:5px;color:#f59954">{{dealData.dangerBehaviorName}}</el-col>
                  <el-col style="padding-bottom:5px;">{{dealData.regionName}}</el-col>
                  <el-col style="font-size:10px;color:#c1adad">向违规人员发送警示信息</el-col>
                </el-col>
                <div class="bs-confirm-button" @click="confirmSend">确定</div>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "SecurityWarning",
      data(){
        return{
          stateText:['未处理','已处理'],
          stateColor:['danger','text'],
          dealData:{},//当前处理的预警信息
          dealDialogShow:false,
          dealButton:false,

          alertData:[//请求得到的数据就是state为0的数据，所以我只需要奖state改为0不显示即可

          ]
        }
      },
      mounted() {
        this.init();
      },
      methods: {
        init(){
          this.$http.get('/warning/today_all_info')
            .then(res => {
              this.alertData=res.data.data;
            }).catch(err => {
            console.log(err)
            this.$message.error({message: '数据异常', center: true})
          });
        },
        //确认按钮
        confirmSend(id){
          this.$http.get('/warning/deal_danger/'+id)
            .then(res => {
              if(res){
                this.init();
              }
            }).catch(err => {
            console.log(err)
            this.$message.error({message: err, center: true})
          });
          this.dealDialogShow=false;
        },
        // confirmSend(id){
        //   this.$http.get('/warning/deal_danger/'+id)
        //     .then(res => {
        //       if(res){
        //         // this.alertData=res.data.data;
        //         this.init();
        //       }
        //     }).catch(err => {
        //     console.log(err)
        //     this.$message.error({message: '数据异常aniu', center: true})
        //   });
        //   //关闭弹窗
        //   this.cancelSend();
        // },
        //打开弹窗
        handleStateClick(tab) {
          this.dealDialogShow=true;
          this.dealData=tab;
        },
        //关闭弹窗
        cancelSend(){
          this.dealDialogShow=false;
        }
        // handleClick(scope.row)
      },
    }
</script>

<style>
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color: rgba(250, 250, 250,0.2);
  }
.security-warning{
  /*width:100px;*/
  /*height:300px;*/
  /*background-color: #ffbaf4;*/
  padding-right:10px;
  position:relative;
}
.bs-security-table{
  padding-right:20px;
  padding-left:20px
}
.bs-security-table-dialog{
  width:500px;
  margin-left:auto;
  margin-right:auto;
  position:absolute;
  top:40%;
  right:35%;
  background-color: #102868;
  /*position:relative;*/
}
  .dialog{
    position:absolute;
    top:0;
    left:0;
    z-index:980;
    height:100%;
    width:100%;
    background-color:rgba(0,0,0,0.3);
    margin: 0;
    padding:0;
  }
  .bs-security-table-bottom{
    position:absolute;
    top:150px;
    left:450px;
    z-index:985;
    background-color: #102868;
    height:100px;
    width:32%;
    margin-bottom: 0;
    padding:0;

  }
  .close{
    font-size: 18px;
    color:#fff;
    position:absolute;
    right:20px;
    top:5px;
    z-index:999;
  }
  /*.bs-cancel-button{*/
  /*  position:absolute;*/
  /*  right:8px;*/
  /*  top:5px;*/
  /*  width:15px;*/
  /*  height:15px;*/
  /*  padding:1px 1px 1px 1px ;*/
  /*  font-weight:700;*/
  /*  text-align:center;*/
  /*  border-radius:50%;*/
  /*  color:#0076dd;*/
  /*  background-color: #fff;*/
  /*}*/
  .bs-confirm-button{
    position:absolute;
    right:10px;
    bottom:15px;
    width:45px;
    height:25px;
    padding:4px;
    text-align:center;
    border-radius:2px;
    color:#fff;
    background-color:#0076dd;
  }
</style>
