
<template>
  <div class="component-style"  style="width: 100%;">
    <div style="width: 98%;height: 15px;padding-left:10px;padding-right:10px;margin-top:5px;">
      <swiper :options="swiperOption1"
              ref="mySwiper">
        <swiper-slide class="swiper-slide-text"
                      v-for="(item,index) in collocateData"
                      :key="index"
                      @click.native="goJump(item)"
                      style="height:20px">
          <!--    按钮展示内容    -->
          <div>{{item.unsafeBehaviorName}}</div>
          <div>({{item.num}})</div>
        </swiper-slide>
        <!--    向左按钮    -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <!--    向右按钮    -->
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>


    </div>
    <div style="width: 100%;height: 90px;padding-left:-10px;margin-top:10px;">
      <swiper :options="swiperOption"
              ref="mySwiper">
        <swiper-slide class="swiper-slide"
                      v-for="(item,index) in showImg"
                      :key="index"
                      :style="{ backgroundImage:'url('+ item.dangerBehaviorPic+')',backgroundSize:'100%'}">
          <!--          @click.native="goJump(item)" 每一个图片的点击事件-->
          <div class="bs-swiper-bottom">
            <div>{{item.dangerBehaviorName}}</div>
<!--            <div>{{item.regionName}}</div>-->
          </div>
        </swiper-slide>
        <div style="display: none" class="swiper-button-prev" slot="button-prev"></div>
        <div style="display: none" class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

  </div>
</template>

<script>

  import {Swiper,SwiperSlide } from "vue-awesome-swiper";
  // import 'swiper/swiper-bundle.css';
  // import swiper from 'swiper';
  // import 'swiper/css/swiper.min.css';

  export default {
    name: "RealTimeWarning",
    components: {
      Swiper,
      SwiperSlide
    },

    data(){
      return{
        collocateData:[

        ],
        collocateContentDtos:[
        ],
        showImg:[],
        swiperOption1:{
          slidesPerView: 5,  //一行显示3个
          spaceBetween: 10,  //间隔30
          freeMode: true,
          speed: 1000,   //滑动速度
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        },
        swiperOption:{
          slidesPerView: 4,  //一行显示3个
          spaceBetween: 10,  //间隔30
          freeMode: true,
          speed: 1000,   //滑动速度
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        },


      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      this.init();
    },
    methods:{
      goJump(item){
        console.log(item);
        this.showImg.length=0;
        let len=this.collocateContentDtos.length;
        for(let i=0;i<len;i++){
          if(item.unsafeBehaviorName===this.collocateContentDtos[i].dangerBehaviorName){
            this.showImg.push(this.collocateContentDtos[i]);
          }
        }
      },
      init(){
        this.$http.get('/warning/today_all_info')//图片集合
          .then(res => {
            this.collocateContentDtos=res.data.data;
            let len=this.collocateContentDtos.length;
            for(let i=0;i<len;i++){
              if(this.collocateContentDtos[i].dangerBehaviorName=='未使用安全挂钩'){
                this.showImg.push(this.collocateContentDtos[i]);
              }
            }
          }).catch(err => {
          this.$message.error({message: '数据异常预警按钮', center: true})
        });
        this.$http.get('/warning/all_type_unsafe_num')//按钮集合
          .then(res => {
            this.collocateData=res.data.data;
          }).catch(err => {
          this.$message.error({message: '数据异常图片', center: true})
        });
      }
    },
    created(){

    }
  }
</script>

<style lang="scss" scoped>
  .swiper-container{
    width:100%;
    padding:0 20px;
    position:relative;
  }
  .swiper-slide-text{
    height:20px;
    font-size:12px;
    color:#fff;
    border:1px solid #fff;
    display:flex;
  }
  .swiper-slide {
    width: 33%;
    height: 70px;
    position:relative;
    margin-right:20px;
  }
  .bs-swiper-bottom{
    position:absolute;
    bottom:0;
    width:100%;
    height:20px;
    background-color: rgba(65, 105, 225, 0.7);
    color:#fff;
    font-size:10px;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }
  .swiper-button-prev:after, .swiper-button-next:after {
    font-size: 14px;
  }
  .swiper-button-prev, .swiper-button-next{
    color: rgb(250, 250, 252);
    font-weight:900;
    background: rgb(42, 43, 42);
    position:absolute;

  }
  .swiper-button-prev{
    left:-10px;
  }
  .swiper-button-next{
    right:-10px
  }

</style>
