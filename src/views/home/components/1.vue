<template>
  <div id="user-distribution" style="height: 90%;">
    <div id="weather-v2-plugin-standard"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'UserDistribution',
  data() {
    return {

    }
  },
  mounted() {
    window.WIDGET = {
      CONFIG: {
        "layout": 1,
        "width": "180",
        "height": "120",
        "background": 5,
        "dataColor": "FFFFFF",
        "borderRadius": 0,
        "modules": "10",
        "key": "FXzweB7UbO",
      }
    };
    (function (d) {
      var c = d.createElement('link')
      c.rel = 'stylesheet'
      c.href = 'https://apip.weatherdt.com/standard/static/css/weather-standard.css?v=2.0'
      var s = d.createElement('script')
      s.src = 'https://apip.weatherdt.com/standard/static/js/weather-standard.js?v=2.0'
      var sn = d.getElementsByTagName('script')[0]
      sn.parentNode.insertBefore(c, sn)
      sn.parentNode.insertBefore(s, sn)
    })(document)
  },
  methods: {},
};
</script>

<style scoped>
#user-distribution {
  display: block;
}
</style>
