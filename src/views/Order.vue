<template>
  <div class="order" @click="a">
    <div class="order-card-body">
      <div
        class="order-card-wrap"
        v-if="list" @click="$router.push({name:'orderInfo',params:{list:list}})"
      >
        <img :src="list.orderInfo.shopInfo.image_path" alt>
        <div class="order-card-content">
          <div class="order-card-head">
            <div class="title">
              <a>
                <span>{{list.orderInfo.shopInfo.name}}</span>
                <i class="fa fa-angle-right"></i>
              </a>
              <p>订单已完成</p>
            </div>
            <p class="date-time">4分钟</p>
          </div>
          <div class="order-card-detail">
            <p class="detail">{{list.orderInfo.selectFoods[0].name}}</p>
            <p class="price">¥{{list.totalPrice}}</p>
          </div>
        </div>
      </div>
      <div class="order-card-bottom">
        <button class="cardbutton" @click="$router.push('/shop')">再来一单</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'order',
    data() {
      return {
        list: null,
        // orderList: []
      }
    },
    beforeRouteEnter(to,from,next){
      next(vm => {
          vm.list = to.params.orderlist
      })
    },
    methods: {
      a() {
            // for(let key in this.list) {
            //   if(this.list.hasOwnProperty(key)){
            //     // this.orderlist.push(this.list[key]);
            //     console.log(this.list[key])
            //   }
            // }
            console.log(this.list)
            // console.log(this.orderlist)
        }
    }
}
</script>

<style scoped>
.order {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  margin-bottom: 2.666667vw;
  background-color: #f0f0f0;
}
.order-card-body {
  margin-top: 2.666667vw;
  background-color: #fff;
  padding: 3.733333vw 0 0 4vw;
}
.order-card-wrap {
  display: flex;
}
.order-card-wrap > img {
  height: 8.533333vw;
  border-radius: 0.533333vw;
  border: 1px solid #eee;
  width: 8.533333vw;
  margin-right: 2.666667vw;
}
.order-card-content {
  flex: 1;
}
.order-card-head {
  border-bottom: 1px solid #eee;
  padding-right: 3.466667vw;
  padding-bottom: 2.666667vw;
}
.order-card-head .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-card-head .title > a {
  font-size: 1rem;
  line-height: 1.5em;
  color: #333;
  text-decoration: none;
}
.order-card-head .title > a > span {
  display: inline-block;
  max-width: 10em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.order-card-head .title > a > i {
  margin-left: 1.333333vw;
  color: #ccc;
  vertical-align: super;
}
.order-card-head .title > p {
  font-size: 0.8rem;
  text-align: right;
  color: #333;
  max-width: 14em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.date-time {
  font-size: 0.6rem;
  color: #999;
}
.order-card-detail {
  display: flex;
  justify-content: space-between;
  padding: 4vw 3.466667vw 4vw 0;
  font-size: 0.8rem;
}
.order-card-detail .detail {
  color: #666;
  display: flex;
  align-items: center;
}
.order-card-detail .price {
  flex-basis: 16vw;
  text-align: right;
  color: #333;
  font-weight: 700;
}
.order-card-bottom {
  display: flex;
  border-top: 1px solid #eee;
  padding: 2.666667vw 4.266667vw;
  justify-content: flex-end;
}
.cardbutton {
  padding: 1.333333vw 2.666667vw;
  border: 1px solid #2395ff;
  border-radius: 0.533333vw;
  background-color: transparent;
  outline: none;
  font-size: 0.8rem;
  color: #2395ff;
  margin-left: 2vw;
}
</style>