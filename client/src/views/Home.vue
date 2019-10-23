<template>
  <div class="home">
    <b-container>
      <b-row align-h="center">
          <b-breadcrumb :items="items" class="my-3 breadcrumb"></b-breadcrumb>
      </b-row>
      <b-row align-h="center">
        <b-card
          overlay
          img-src="https://picsum.photos/900/250/?image=3"
          img-alt="Card Image"
          text-variant="white"
          title="實體店面位置圖"
          sub-title-text-variant="white"
          sub-title="免費試喝"
          class=""
        >
          <b-card-text style="color: #fff;font-size: 24px;">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur totam corporis sit itaque eveniet ipsum laboriosam. Possimus eligendi dolor cupiditate!
          </b-card-text>
        </b-card>
      </b-row>
    </b-container>
    <!-- 熱門產品 -->
    <div class="hot-product-text">熱門產品</div>
    <carousel :autoplay="false" :autoplayHoverPause="true" :perPageCustom="perPageCustom" style="cursor:pointer">
      <slide v-for="item in filterHotProducts" :key="item.key" class="slide">
        <img class="carousel-img" src="../assets/carousel-tea.jpg" alt="" height="100%" width="100%">
        <span class="tea-title">{{ item.title }}</span>
        <span class="tea-fee">${{ item.fee }}</span>
        <span class="tea-description">{{ item.description }}</span>
        <div class="tea-add-btn">加入購物車</div>
        <div class="hot-label" v-if="item.hot">熱銷</div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapState, mapMutations } from 'vuex'
import product from './Product';
export default {
  name: 'home',
  components: {
    product,
    Carousel,
    Slide
  },
  data() {
    return {
      items: [
          {
            text: '首頁',
            to: {name: 'home'}
          }
          // {
          //   text: 'Posts',
          //   to: { name: 'login' }
          // },
          // {
          //   text: 'Posts',
          //   to: { name: 'register' }
          // }
      ],
      slide: 0,
      sliding: null,
      perPageCustom: [
        [1024, 4], [768, 3],[512, 2]
      ],
      hotProducts: []
    }
  },
  computed: {
    ...mapState({
      msg: state => state.tryVuex.msg
    }),
    filterHotProducts() {
      return this.hotProducts.filter(i => {
        return i.hot
      })
    }
  },
  methods: {
    onSlideStart(slide) {
        this.sliding = true
      },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },
  created() {
    this.$axios.get('api/products/getProduct').then(res => {
      this.hotProducts = res.data
    })
    const token = localStorage.getItem('token').split('')[1]
    this.$axios.post('api/localAuth', {'jwt': token}, {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      console.log('Auth成功?', res)
    })
    
  }
}
</script>
<style lang="scss" scoped>
.hot-product-text{
  font-size: 30px;
  padding: 45px 0 0;
  margin: 90px 0 45px; 
  border-top: 1px solid #ddd;
  text-align: center;
}
.slide{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
  overflow: hidden;
  transition: .5s;
  padding: 15px;
  position: relative;
  padding-top: 20px;
  &:hover{
    background-color: rgb(238, 238, 238);
    transition: .5s;
    .tea-add-btn{
      display: block;
      transition: .5s;
      animation: upsideDown 1s both;
    }
  }
  
}
.carousel-img{
  display: block;
}
.tea-title{
  font-size: 15px;
  padding-top: 20px;
}
.tea-fee{
  margin: 10px 0;
  color: rgb(78, 221, 102);
}
.tea-description{
  font-size: 13px;
  line-height: 25px;
}
.tea-add-btn{
  position: absolute;
  left: calc(50% - 90px);
  top: calc(50% - 25px);
  width: 180px;
  height: 50px;
  color: #fff;
  display: none;
  border: 1px solid green;
  background-color: green;
  line-height: 50px;
  border-radius: 5px;
  cursor: pointer;
}
.hot-label{
  width: 69px;
  height: 26px;
  position: absolute;
  background-color: #eb0000;
  color: #fff;
  left: 0px;
  top: 28px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  line-height: 26px;
  border-radius: 5px;
  transform: rotate(-36deg);
}

@keyframes upsideDown{
  from{
    transform: translateY(160px);
  }
  to{
    transform: translateY(0);
  }
}
</style>