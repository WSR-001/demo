<template>
  <div class="basic-container">
    <el-row>
      <el-col :span="12" style="padding:0;">
        <el-col style="padding:0;">
          <div class="bgc" style="height:180px;margin:0;padding:0;">
            <header class="bs-header">项目信息</header>
            <el-row>
              <el-col :span="8">
                <div style="color: #f1eeee;font-size:14px;margin-left:80px;display:flex;height:18px;line-height:18px">
                  <div style="margin-right:10px;">工程造价</div>
                  <div><span style="color: #46bee9;font-size:18px;">27</span><span>亿</span></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="color: #f1eeee;font-size:14px;margin-left:60px;display:flex;height:18px;line-height:18px">
                  <div style="margin-right:10px;">合同工期</div>
                  <div><span style="color: #46bee9;font-size:18px;">811</span><span>天</span></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="color: #f1eeee;font-size:14px;margin-left:30px;display:flex;height:18px;line-height:18px">
                  <div style="margin-right:10px">建筑面积</div>
                  <div><span style="color: #46bee9;font-size:18px;">197620</span><span>m<sup>2</sup></span></div>
                </div>
              </el-col>
            </el-row>
            <el-row style="color:#fff">
              <el-col :span="12" >
                <el-tooltip class="item" effect="dark" content="建设单位是陕西西安市XXXXXXXX有限公司" placement="top-start">
                  <div style="padding-left:20px">
                    <span>建设单位：</span>
                    <span>{{'建设单位是陕西西安市XXXXXXXX'}}</span>
                  </div>
                </el-tooltip>
              </el-col>
              <el-col :span="12">
                <el-tooltip class="item" effect="dark" content="建设单位是陕西西安市XXXXXXXX有限公司" placement="top-start">
                  <div>
                    <span>总包单位：</span>
                    <span>{{'建设单位是湖南长沙市XXXXXXXX'}}</span>
                  </div>
                </el-tooltip>
              </el-col>
              <el-col :span="12">
                <el-tooltip class="item" effect="dark" content="建设单位是陕西西安市XXXXXXXX有限公司" placement="top-start">
                  <div style="padding-left:20px">
                    <span>设计单位：</span>
                    <span>{{'建设单位是河北保定市XXXXXXXX'}}</span>
                  </div>
                </el-tooltip>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" style="padding:10px;">
                <div style="background-color: #69ee69;padding:0 10px;">
                  <h3 style="text-align: center;width:100%">质量目标</h3>
                  <div style="text-align: center;width:100%">质量好的不行获了好多奖好多好多奖多得数不清多得数不过来多多够了吧</div>
                </div>
              </el-col>
              <el-col :span="8" style="padding:10px;">
                <div style="background-color: sandybrown;padding:0 10px;">
                  <h3 style="text-align: center;width:100%">安全目标</h3>
                  <div style="text-align: center;width:100%">质量好的不行获了好多奖好多好多奖多得数不清多得数不过来多多够了吧</div>
                </div>
              </el-col>
              <el-col :span="8" style="padding:10px;">
                <div style="background-color: lightcoral;padding:0 10px;">
                  <h3 style="text-align: center;width:100%">科技目标</h3>
                  <div style="text-align: center;width:100%">质量好的不行获了好多奖好多好多奖多得数不清多得数不过来多多够了吧</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col style="padding:0;">
          <div class="bgc" style="height:180px;margin-bottom:0;padding:0;">
            <header class="bs-header">昨日完成</header>
            <div class="bs-table">
              <el-table
                :data="finishData"
                max-height="170px"
                max-width="100%"
                :header-row-style="{height:'10px'}"
                :header-cell-style="{color:'#5078fc'}"
                :row-style="{height: '0'}"
                :cell-style="{padding: '0'}"
                style="width: 100%;height:100%">
                <el-table-column
                  prop="id"
                  label="序号"
                  width="50"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="area"
                  label="施工区域"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="security"
                  label="安全"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="quality"
                  label="质量"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="material"
                  label="物资"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="userNum"
                  label="劳务人员数量"
                  width="110"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="machine"
                  label="机械"
                  width="50"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col style="padding:0;">
          <div class="bgc" style="height:180px;margin-top:10px;margin-bottom:0;padding:0;">
            <header class="bs-header">明日计划</header>
            <div class="ba-table">
              <el-table
                :data="planData"
                max-height="170px"
                max-width="100%"
                :header-row-style="{height:'10px'}"
                :header-cell-style="{color:'#5078fc'}"
                :row-style="{height: '0'}"
                :cell-style="{padding: '0'}"
                style="width: 100%;height:100%">
                <el-table-column
                  prop="id"
                  label="序号"
                  width="30"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="userNum"
                  label="劳务人员数量"
                  width="100"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="machine"
                  label="机械"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="material"
                  label="物资"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="appraise"
                  label="风险评估"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="待处理"
                  header-align="center" min-width="50" align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-col>
      <el-col :span="12" style="padding:0;">
<!--        <el-col style="padding-left:10px;padding-right:10px;">-->
          <div class="bgc" style="height:150px;margin:0 10px;padding:0;">
            <header class="bs-header">工程进度</header>
            <construction-progress></construction-progress>
          </div>
<!--        </el-col>-->
        <el-row>
          <el-col :span="12" style="padding-left:10px;padding-right:0;">
            <div class="bgc" style="height:400px;margin-bottom:0;padding:0;">
              <header class="bs-header">用电量统计</header>
              <div>
                <el-row text="flex" justify="center">
                  <el-col :span="12">
                    <div class="bs-statistics">
                      总用电量：
                    </div>

                  </el-col>
                  <el-col :span="12">
                    <div class="bs-statistics">
                      <span >5000</span><span>度</span>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="bs-statistics">
                      当月用电量：
                    </div>

                  </el-col>
                  <el-col :span="12">
                    <div class="bs-statistics">
                      <span >1200</span><span>度</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div style="width:100%;height:70%">
                <electricity></electricity>
              </div>
            </div>
          </el-col>
          <el-col :span="12" style="padding-left:10px;padding-right:10px;">
            <div class="bgc" style="height:400px;margin-bottom:0;padding:0;">
              <header class="bs-header">用水量统计</header>
              <div>
                <el-row text="flex" justify="center">
                  <el-col :span="12">
                    <div class="bs-statistics">
                      总用水量：
                    </div>

                  </el-col>
                  <el-col :span="12">
                    <div class="bs-statistics">
                      <span >5000</span><span>m<sup>3</sup></span>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="bs-statistics">
                      当月用水量：

<!--                      https://www.makeapie.com/editor.html?c=xYPjM_33O-->
                    </div>

                  </el-col>
                  <el-col :span="12">
                    <div class="bs-statistics">
                      <span >1200</span><span>m<sup>3</sup></span>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div style="width:100%;height:70%">
                <water></water>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import ConstructionProgress from "../home/components/ConstructionProgress";
    import Water from "./components/Water";
    import Electricity from "./components/Electricity";
    export default {
      name: "index",
      components: {Electricity, Water, ConstructionProgress},
      data(){
        return{
          finishData: [{
            id: '1',
            area: '区域一',
            security:'安全检车5次',
            quality:'好',
            material:'验收3次',
            userNum:312,
            machine:32
          },
            {
              id: '2',
              area: '区域一',
              security:'安全检车5次',
              quality:'好',
              material:'验收3次',
              userNum:312,
              machine:32
            },
            {
              id: '3',
              area: '区域一',
              security:'安全检车5次',
              quality:'好',
              material:'验收3次',
              userNum:312,
              machine:32
            },
            {
              id: '4',
              area: '区域一',
              security:'安全检车5次',
              quality:'好',
              material:'验收3次',
              userNum:312,
              machine:32
            },{
              id: '5',
              area: '区域一',
              security:'安全检车5次',
              quality:'好',
              material:'验收3次',
              userNum:312,
              machine:32
            },

          ],
          planData: [{
            id: '1',
            area: '区域一',
            userNum:42,
            machine: '2',
            material: '物资退场4次',
            appraise:'无',
            num:0
          }]
        }
      },
      methods: {



      }
    }
</script>

<style scoped>
.bs-statistics{
  font-size: 20px;
  font-weight:bold;
  padding-left:15px;
  color: rgb(200, 200, 232);
  text-align: center;
  margin-top:20px;
}
.bs-table{
  height:150px
}
</style>
