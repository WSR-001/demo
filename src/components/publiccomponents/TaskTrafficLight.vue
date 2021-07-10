<template>
    <div v-if="taskStatus != null" class="traffic-light">
        <i class="el-icon-s-opportunity" :class="lightColor"/>
      <span :class="lightColor">{{lightText}}</span>
    </div>

<!--  <div v-if="taskStatus != null"  class="task-status-lamp" >-->
<!--    <el-tag effect="plain" v-for="(item, idx) in trafficLight" :key="item.color" :class="lightColor">-->

<!--    </el-tag>-->
<!--  </div>-->
</template>

<script>
  export default {
    name: 'TaskTrafficLight',           // 节点红绿灯
    props: {
      lcStyle: {                      // 控件样式
        type: String
      },

      taskStatus: {                   // 节点状态
        type: Number,
        default: null
      }
    },
    computed: {
      lightColor() {
        return this.trafficLight[this.taskStatus].color;
      },
      lightText() {
        return this.trafficLight[this.taskStatus].text;
      }
    },
    data() {
      return {
        trafficLight: [ {
          color: 'color-gray',
          text: '离线'
        },{
          color: 'color-green',
          text: '在线'
        }, ]
      };
    },
    methods: {
      // 状态灯点击事件
      // handleLightClick(idx) {
      //   // 调用父类筛选节点
      //   this.$emit('filterCallback', idx);
      // }
    }
  };
</script>

<style scoped>
  .traffic-light {
    font-size: 14px;
    vertical-align: middle;
    /*text-align:center;*/
    /*margin-right: 12px;*/
  }

</style>
