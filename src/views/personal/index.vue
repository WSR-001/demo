<template>
  <div class="basic-container" style="margin:0">
    <el-row :gutter="20" class="personal">
      <el-col :span="7" style="padding-right:5px;padding-left:0;">
        <div class="bs-personal-left">
          <message></message>
        </div>

      </el-col>
      <el-col :span="17" class="bs-personal-right" >
        <el-row :gutter="20">
          <el-col :span="8" style="padding:0 5px;">
            <div class="bgc important-posts-border" style="height:280px;">
              <header class="bs-header">重要岗位考勤</header>
              <important-post></important-post>
            </div>
          </el-col>
          <el-col :span="16" style="padding-left:5px;padding-right:0;">
            <div class="bgc" style="height:280px;">
              <header class="bs-header">一周实际到岗</header>
              <on-duty-a-week></on-duty-a-week>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding-left:5px;margin:10px -10px 0 -10px;">
          <el-col :span="10">
            <div class="visitors-flowrate-statistics bgc" style="height:265px">
              <header class="bs-header">违规人员通报</header>
<!--              <visitors-flowrate-statistics></visitors-flowrate-statistics>-->
              <notification-of-violators></notification-of-violators>
              <div class="more">
                <router-link to="/ViolatorsNotification">
                  <span>更多</span><i class="el-icon-arrow-right"></i>
                </router-link>

              </div>
            </div>
          </el-col>
          <el-col :span="14" style="padding-left:5px;">
            <div class="visitors-flowrate-statistics bgc" style="height:265px">
              <header class="bs-header">各区域人流量统计</header>
              <visitors-flowrate-statistics></visitors-flowrate-statistics>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>


</template>

<script>
    import OnDutyAWeek from "./components/OnDutyAWeek";
    import ImportantPost from "./components/ImportantPost";
    import VisitorsFlowrateStatistics from "./components/VisitorsFlowrateStatistics";
    import Message from "./components/Message";
    import NotificationOfViolators from "./components/NotificationOfViolators";
    export default {
      name: "Personal",
      components: {
        NotificationOfViolators,
        VisitorsFlowrateStatistics, ImportantPost, OnDutyAWeek,Message},
      data() {
        return {
          realTime: new Date(),
          timer: null
        }
      },
      mounted() {

      },
      beforeDestroyed() {

      },
      methods: {

      }

    }
</script>

<style scoped lang="scss">
.personal{
  width:100%;
  height:100%;
  /*display:flex;*/
  .bs-personal-left{
    padding-left:10px;
  }
  .bs-personal-right{
    /*width:600px;*/
    /*height:300px;*/
  }
}
a {
  text-decoration:none ;
  color: #00ecfc;
}
.router-link-active {
  text-decoraction: none ;
  color: #00ecfc;
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
.all-person-condition{
  height:150px;
}
.visitors-flowrate-statistics{
  position:relative;
}
.more{
  position:absolute;
  right:20px;
  bottom:10px;
  color:deepskyblue;
  font-size:14px;
}
</style>
