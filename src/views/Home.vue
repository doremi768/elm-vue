<template>
  <div class="home">
      <div class="header">
        <div class="address_map" @click="$router.push({name:'address',params:{city: city}})">
          <i class="fa fa-map-marker"></i>
          <span>{{address}}</span>
          <i class="fa fa-sort-desc"></i>
        </div>
        
      </div>
      <div class="search_wrap" :class="{'fixedview': showFilter}">
        <div class="shop_search">
          <i class="fa fa-search"></i>
          搜索商家 商家名称
        </div>
      </div>

      <div id="container">
          <!-- 轮播 -->
        <mt-swipe :auto="4000" class="swiper">
          <mt-swipe-item v-for="(img,index) in swipeImgs" :key="index">
            <img :src="img" alt>
          </mt-swipe-item>
        </mt-swipe>
        <!-- 分类 -->
        <mt-swipe :auto="0" class="entries">
          <mt-swipe-item v-for="(entry,i) in entries" :key="i"
          class="entry_wrap"
          >
            <div class="foodentry" v-for="(item,index) in entry"
            :key="index"
            >
              <div class="img_wrap">
                <img :src="item.image" alt="">
                <span>{{item.name}}</span>
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <!-- 推荐商家 -->
      <div class="shoplist-title">推荐商家</div>

      <!-- 导航 -->
      <FilterView :filterData="filterData" @searchFixed="showFilterView" @updata="updata"/>
  
      <!-- 商家信息 -->
      <div class="shoplist"></div>
      <IndexShop v-for="(item,index) in restaurants" :key="index" :restaurant="item.restaurant"/>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import FilterView from '../components/FilterView'
import IndexShop from '../components/IndexShop'
export default {
    name: 'home',
    data() {
      return {
        swipeImgs: [],    //轮播图
        entries: [],
        filterData: null, //排序的数据
        showFilter: false,
        page: 1,    //商品页数
        size: 5,    //商品个数
        restaurants: [] //存商品
      }
    },
    components: {
      FilterView,
      IndexShop
    },
   computed: {
     address(){
       if(this.$store.getters.address){
        return this.$store.getters.address;
       } else {
         return '收货地址'
       }
     },
     city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      )
     }
   },
   created(){
     this.getData();
   },
   methods: {
     //获取接口
     getData(){
       this.$axios('/api/profile/shopping').then(res => {
         this.swipeImgs = res.data.swipeImgs;
         this.entries = res.data.entries;
       });

       this.$axios('/api/profile/filter').then(res => {
         this.filterData = res.data;
       });

       this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`).then(res => {
         this.restaurants = res.data;
         console.log(res.data)
       })
     },
     showFilterView(isShow){
       this.showFilter = isShow
     },
     updata(condation){
       console.log(condation)
     }
   }
};
</script>

<style scoped>
.home{
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,.search_wrap{
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search_wrap .shop_search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.search_wrap {
  position: sticky;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}
.swiper {
  height: 100px;
  /* overflow: hidden; */
}
.swiper img{
  width: 100%;
  height: 100px;
}
.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}

.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
</style>
