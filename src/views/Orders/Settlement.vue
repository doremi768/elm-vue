<template>
  <div class="settlement">
      <Header :isLeft="true" title="确认订单"/>
          <div class="view-body">
              <div class="">
                  <!-- 收货地址 -->
                  <section class="cart-address">
                      <p class="title">订单配送至
                        <span class="address-tag" v-if="userInfo && userInfo.tag">{{userInfo.tag}}</span>
                      </p>
                      <p class="address-detail">
                        <span @click="$router.push('/myAddress')" v-if="userInfo">{{userInfo.address}}{{userInfo.bottom}}</span>
                        <span v-else>
                          <span v-if="haveAddress" @click="$router.push('/myAddress')">选择收货地址</span>
                          <span v-else  @click="$router.push('/addAddress')">新增收货地址</span>
                          <i class="fa fa-angle-right"></i>
                        </span>
                      </p>
                      <h2 v-if="userInfo" class="address-name">
                        <span>{{userInfo.name}}</span>
                        <span v-if="userInfo.sex">({{userInfo.sex}})</span>
                        <span class="phone">{{userInfo.phone}}</span>
                      </h2>
                  </section>

                  <!-- 送达时间 -->
                  <Delivery :shopInfo="orderInfo.shopInfo"/>

                  <!-- 点餐内容 -->
                  <CartGroup :orderInfo="orderInfo" :totalPrice="totalPrice"/>
              
                  <!-- 备注信息 -->
                  <section class="checkout-section">
                    <CartItem title="餐具份数" subHead="未选择"/>
                    <CartItem title="订单备注" subHead="口味 偏好"/>
                    <CartItem title="发票信息" subHead="不需要开发票"/>
                  </section>
              </div>
          </div>
  </div>
</template>

<script>
import Header from '../../components/Headers';
import Delivery from '../../components/Orders/Delivery'
import CartGroup from '../../components/Orders/CartGroup'
import CartItem from '../../components/Orders/CartItem'
export default {
    name: 'Settlement',
    data() {
        return {
            haveAddress: false,
        }
    },
    components: {
        Header,
        Delivery,
        CartGroup,
        CartItem
    },
    beforeRouteEnter(to,from,next) {
        next(vm => {
          if(!vm.userInfo) {
            vm.getData();
          }
        })
    },
    computed: {
        addressArray() {
            return this.$store.getters.allAddress
        },
        userInfo() {
          return this.$store.getters.userInfo;
        },
        orderInfo() {
          return this.$store.getters.orderInfo;
        },
        totalPrice() {
          return this.$store.getters.totalPrice;
        }
    },
    methods: {
        getData() {
            if(this.addressArray.length> 0){
                this.haveAddress = true
            } else {
                this.haveAddress = false
            }
        }
    }
}
</script>

<style scoped>
.settlement {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 44px;
}

.view-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  font-size: 0.9rem;
  color: #333;
  padding-bottom: 14.133333vw;
  padding-left: 1.6vw;
  padding-right: 1.6vw;
  background-image: linear-gradient(
      0deg,
      #f5f5f5,
      #f5f5f5 65%,
      hsla(0, 0%, 96%, 0.3) 75%,
      hsla(0, 0%, 96%, 0)
    ),
    linear-gradient(270deg, #009eef, #009eef);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.cart-address {
  background-color: transparent;
  padding: 4.266667vw 2.133333vw 2.933333vw 2.133333vw;
  min-height: 22.133333vw;
  color: #fff;
  overflow: hidden;
}
.cart-address .title {
  font-size: 0.9rem;
  line-height: 1.21;
  color: hsla(0, 0%, 100%, 0.8);
}
.cart-address .address-detail {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.88;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.address-detail > span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 4vw);
}
.address-detail > i {
  margin-left: 2.133333vw;
}

/* 显示送货地址 */
.address-name {
  font-size: 0.86rem;
  line-height: 1.21;
  margin-bottom: 1.333333vw;
}
.address-name .phone {
  margin-left: 2.133333vw;
}
.address-tag {
  border: 0.133334vw solid hsla(0, 0%, 100%, 0.8);
  margin-left: 1.6vw;
  display: inline-block;
  padding: 0.533333vw;
  white-space: nowrap;
  border-radius: 0.133333vw;
  font-size: 0.6rem !important;
  line-height: 2.666667vw;
}

.checkout-section {
  margin-bottom: 2.133333vw;
  padding: 0 5.333333vw;
  background: #fff;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
}

/* 底部支付样式 */
.action-bar {
  height: 11.733333vw;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #3c3c3c;
  z-index: 2;
}
.action-bar > span {
  color: #fff;
  font-size: 1.2rem;
  line-height: 11.733333vw;
  padding-left: 2.666667vw;
  vertical-align: middle;
}
.action-bar > button {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: #00e067;
  min-width: 28vw;
  padding: 0 1.333333vw;
  border: none;
  color: #fff;
  font-size: 1.2rem;
}
</style>