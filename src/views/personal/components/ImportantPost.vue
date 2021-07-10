<template>
    <div class="ImportantPost">
      <el-col style="margin-top:0;">
        <el-row :gutter="20">
          <el-col :span="12"><span class="bs-span">今日应到：<span>{{tatol}}</span>人</span></el-col>
          <el-col :span="12"><span class="bs-span">今日实到：<span>{{clockInUserNum}}</span>人</span></el-col>
        </el-row>
      </el-col>
      <el-col style="margin-top:10px;">
        <ul class="gun">
          <li v-for="(item, index) in ImportantPersonList" :key="index" class="important-person-msg">
            <img :src=item.facePic alt="代替图片" width="100px" height="100px"/>
            <div class="important-person-msg-item">
              <div style="font-size:18px;font-weight: bold;margin-bottom: 8px;">{{item.name}}</div>
              <div style="margin-bottom: 8px;">{{item.job}}</div>
              <div style="margin-bottom: 8px;">{{item.starkWorkTime}}</div>
<!--              <div>{{item.afterWorkTime}}</div>-->
            </div>
          </li>
        </ul>
      </el-col>
    </div>
</template>

<script>
    export default {
      name: "ImportantPost",
      data() {
        return {
          ImportantPersonList:[],
          tatol:0,
          clockInUserNum:0,
        }
      },
      methods:{
        init(){
          this.$http.get('/member/clockInManagerInfo')
            .then(res => {
              console.log(res);
              this.ImportantPersonList=res.data.data;
            }).catch(err => {
            console.log(err)
            this.$message.error({message: '数据异常', center: true})
          });
          this.$http.get('/member/clockInNum')
            .then(res => {
              this.clockInUserNum=res.data.data.clockInUserNum;
            }).catch(err => {
            console.log(err)
            this.$message.error({message: '数据异常', center: true})
          });
          this.$http.get('/member/num/overview')
            .then(res => {
              this.tatol=res.data.data.total;
            }).catch(err => {
            console.log(err)
            this.$message.error({message: '数据异常', center: true})
          });
        }
      },
      mounted(){
        this.init();
      }
    }
</script>

<style lang="scss">
  .bs-span{
    color:white;
    span{
      color:white;
      background-color:rgb(0,122,255);
      font-size:18px;
    }
  }
  .important-person-msg{
    display:flex;
  }
  .important-person-msg-item{
    padding:5px 0;
    color:#fff;
    line-height:16px;
    margin-bottom:5px;
    margin-left:15px;
    border:1px solid rgba(23,246,252,0.3);
  /*  设置阴影*/
  }
  .ImportantPost{
    height:100%;
  }
  .gun{
    overflow: auto;
    height:200px;
  }
</style>
