<template>
  <div class="basic-container">
    <el-row :gutter="20" class="security">
      <!--安全管理左边col-->
      <el-col :span="7" style="">
        <div class="bs-security-top bgc" style="height:330px;margin-bottom: 10px;">
          <header class="bs-header">安全告警</header>
          <div class="more">
            <router-link to="/SecurityWarning">
              <span>查看全部</span><i class="el-icon-arrow-right"></i>
            </router-link>

<!--            添加路由-->
          </div>
          <div class="bs-security-table">
            <el-table
              :data="alertData"
              style="width: 100%;"
              max-height="300px"
              :cell-style="{padding: '3px'}"
            :show-header="false">
              <el-table-column
                prop="createTime"
                width="150" align="center">
              </el-table-column>
              <el-table-column
                prop="dangerBehaviorName" align="center">
              </el-table-column>
              <el-table-column
                prop="state" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleStateClick(scope.row)" :type="stateColor[scope.row.state]" :disabled="scope.row.state==1">{{stateText[scope.row.state]}}</el-button>
                  <!--                  <el-button type="text" size="small">编辑</el-button>-->
                </template>
              </el-table-column>
<!--              element-loading-text="Loading"-->
<!--              empty-text="没有数据了哦"-->
            </el-table>
            <div v-if="dealDialogShow" class="bs-security-table-bottom bgc">
              <el-row style="position: relative">
                <el-col :span="10" style="padding:10px 0 10px 20px;">
                  <img :src=dealData.dangerBehaviorPic  width="120px" height="75px"/>
                </el-col>
                <el-col :span="14" style="padding:10px 10px 5px 10px;font-size:12px;color:#fff;">
                  <el-col style="padding-bottom:5px;">{{dealData.createTime}}</el-col>
                  <el-col style="padding-bottom:5px;color:#f59954">{{dealData.dangerBehaviorName}}</el-col>
                  <el-col style="padding-bottom:5px;">{{dealData.regionName}}</el-col>
                  <el-col style="font-size:10px;color:#c1adad">向违规人员发送警示信息</el-col>
                </el-col>
                <div class="bs-cancel-button" @click="cancelSend">X</div>
                <div class="bs-confirm-button" @click="confirmSend(dealData.id)">确定</div>
              </el-row>
            </div>
          </div>
        </div>
        <div class="bs-security-buttom bgc" style="height:220px">
           <header class="bs-header">人员违规行为统计</header>
          <personnel-violations></personnel-violations>
        </div>
      </el-col>
      <!--安全管理右边col-->
      <el-col :span="17" class="bs-security-right" >
        <el-row :gutter="20">
          <el-col :span="12" style="padding:0;">
            <div style="height:300px;">
              <img class="camera-maker-img" src="../../assets/image/camera-marker.png" alt="" width="420px"/>
            </div>
          </el-col>
          <el-col :span="12" style="padding:0;">
            <div class="bgc" style="height:140px;">
              <header class="bs-header">人员违规行为TOP5</header>
              <div class="charts" style="padding-top:20px;">
                <unsafe-act/>
              </div>
            </div>
            <div class="bgc" style="height:150px;margin-top:10px;">
              <header class="bs-header">安全装备违规佩戴行为</header>
              <div class="charts" style="padding-top:10px;">
                <high-altitude/>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding:0;margin:10px -10px 0 -10px;">
          <div class="bgc" style="height:250px">
<!--            <header class="bs-header">近十五日不安全行为变化趋势</header>-->
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="background-color: transparent;height:200px;">
              <el-tab-pane name="1" style="height:100%;width:100%">
                <span slot="label"><i class="el-icon-date"></i> 人员违规行为</span>
                   <un-safe-act-statistics1 :activeName="activeName"></un-safe-act-statistics1>
              </el-tab-pane>
              <el-tab-pane name="2" style="height:100%;width:100%">
                <span slot="label"><i class="el-icon-date"></i> 安全装备违规佩戴行为</span>
                <un-safe-act-statistics2 :activeName="activeName"></un-safe-act-statistics2>
              </el-tab-pane>
            </el-tabs>
<!--            <un-safe-act-statistics></un-safe-act-statistics>-->
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>


</template>

<script>
    //import OnDutyAWeek from "./components/OnDutyAWeek";
    //import ImportantPost from "./components/ImportantPost";
    import UnsafeAct from "../../components/publiccomponents/UnsafeAct";
    import HighAltitude from "../../components/publiccomponents/HighAltitude";
    import UnSafeActStatistics1 from "./components/UnSafeActStatistics1";
    import UnSafeActStatistics2 from "./components/UnSafeActStatistics2";
    import PersonnelViolations from "./components/PersonnelViolations";
    export default {
      name: "Security",
      components: {PersonnelViolations, UnSafeActStatistics1,UnSafeActStatistics2, UnsafeAct, HighAltitude},
      data(){
        return{
          stateText:['未处理','已处理'],
          stateColor:['danger','text'],
          dealData:{},//当前处理的预警信息
          dealDialogShow:false,
          dealButton:false,
          // disabled:false,
          activeName: '1',
          alertData:[//请求得到的数据就是state为0的数据，所以我只需要奖state改为0不显示即可

          ]
        }
      },
      mounted() {
        this.init()
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
        handleStateClick(tab) {
          this.dealDialogShow=true;
          this.dealData=tab;

        },
        confirmSend(id){
          this.$http.get('/warning/deal_danger/'+id)
            .then(res => {
              if(res){
                this.init();
              }
            }).catch(err => {
            console.log(err)
            this.$message.error({message: '数据异常', center: true})
          });
          this.dealDialogShow=false;
        },
        cancelSend(){
          this.dealDialogShow=false;
        }
        // handleClick(scope.row)
      },

    }
</script>

<style scoped lang="scss">
  a {
    text-decoration:none ;
    color: #00ecfc;
  }
  .router-link-active {
    text-decoraction: none ;
    color: #00ecfc;
  }

  .security{
  width:100%;
  height:100%;
  .bs-security-table{
    height:300px;
    position:relative;
  }
  .bs-security-table-bottom{
    width:100%;
    position:absolute;
    bottom:0;
  }
  .bs-security-right{
    /*width:600px;*/
    height:300px;
  }
}
.bs-confirm-button{
  width:35px;
  height:20px;
  padding:2px;
  text-align:center;
  border-radius:2px;
  position:absolute;
  right:10px;
  bottom:10px;
  color:#fff;
  background-color:#0076dd;
}
.bs-cancel-button{
  width:15px;
  height:15px;
  padding:1px 1px 1px 1px ;
  font-weight:700;
  text-align:center;
  border-radius:50%;
  position:absolute;
  right:15px;
  top:10px;
  color:#0076dd;
  background-color: #fff;
}
.bs-security-top{
  position:relative;
}
.more{
  position:absolute;
  right:15px;
  top:5px;
  color:deepskyblue;
  font-size:14px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.basic-constainer {
  overflow:hidden;
/*// height: 100vh;*/
  background: aquamarine;
  position: relative;
}
.camera-maker-img{
  display:block;
  margin:auto;
}


</style>
<style>
  .el-table td, .el-table th{
    padding:0;
  }
</style>
