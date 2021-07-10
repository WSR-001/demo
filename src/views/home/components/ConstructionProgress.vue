<template>
    <div class="Construction-progress" style="height:80%">
      <el-row style="margin-bottom: 0;">
        <el-col :span="8" style="margin-bottom: 0;">
          <construction-days></construction-days>
        </el-col>
        <el-col :span="16">
          <time-line></time-line>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import ConstructionDays from "../../../components/publiccomponents/ConstructionDays";
    import TimeLine from "../../../components/publiccomponents/TimeLine";
    export default {
        name: "ConstructionProgress",
      components: {TimeLine, ConstructionDays}
    }
</script>

<style scoped>

</style>
