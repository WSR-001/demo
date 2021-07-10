<template>
    <div class="center-container">
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
      name: "BsCenter",
      computed: {

      },
    }
</script>

<style lang="scss">
  .center-container {
    padding:0 0 10px 10px;
    box-sizing:border-box;

  }

</style>
