<template>
  <div class="RealTimeStatistics">
    <el-row :gutter="12" style="margin:5px 0 0 80px;">
      <el-col :span="8"><div class="unsafeIcon"><i class="el-icon-warning" style="position:absolute;top:5px;left:20px;font-size:18px;font-weight:bold;color:lightskyblue"></i></div></el-col>
      <el-col :span="16"><div style="color:#fff">人员不安全行为（例）</div><div style="font-size: 16px;font-weight:bold;color:lightskyblue">
        {{unsafeBehaviorNum}}</div></el-col>
    </el-row>
    <el-row :gutter="12" style="margin:5px 0 0 80px;">
      <el-col :span="8"><div class="unsafeIcon"><i class="el-icon-guide" style="position:absolute;top:5px;left:20px;font-size:18px;font-weight:bold;color:orangered"></i></div></el-col>
      <el-col :span="16"><div style="color:#fff">危险区域入侵（人）</div><div style="font-size: 16px;font-weight:bold;color:orangered">
        {{dangerAreaBreakInNum}}</div></el-col>
    </el-row>
    <el-row :gutter="12" style="margin:5px 0 0 80px;">
      <el-col :span="8"><div class="unsafeIcon"><i class="el-icon-school" style="position:absolute;top:5px;left:20px;font-size:18px;font-weight:bold;color:sandybrown"></i></div></el-col>
      <el-col :span="16"><div  style="color:#fff">高空违规作业（例）</div><div style="font-size: 16px;font-weight:bold;color:sandybrown">
        {{highWarningNum}}</div></el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "RealTimeStatistics",
      data() {
        return {
          // headerBgStyle: {
          //   backgroundImage: 'url(' + require('../../assets/image/head_bg.png') + ') '
          // },
          unsafeBehaviorNum:0,
          dangerAreaBreakInNum:0,
          highWarningNum:0,
        };
      },
      mounted() {
        this.init()
      },
      methods: {
        init(){
          this.$http.get('warning/today_overview_size')
            .then(res => {
              // console.log();
              // console.log(res.data.data);
              this.unsafeBehaviorNum=res.data.data.unsafeBehaviorNum;
              this.dangerAreaBreakInNum=res.data.data.dangerAreaBreakInNum;
              this.highWarningNum=res.data.data.highWarningNum;
            }).catch(err => {
            console.log(err)
            this.$message.error({message: '数据异常', center: true})
          });
        }
      }
    }
</script>

<style lang="scss">
  .RealTimeStatistics{
    .unsafeIcon{
      width:50px;
      height:30px;
      background-color: rgba(71, 143, 252, 0.8);
    }
  }
</style>
