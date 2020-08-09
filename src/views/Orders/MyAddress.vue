<template>
  <div class="myAddress">
      <Header :isLeft="true" :title="title"/>
      <div class="address-view-bottom" @click="$router.push('/addAddress')">
        <i class="fa fa-plus-circle"></i>
        <span>新增收获地址</span>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Headers'
export default {
    name: 'myAddress',
    data() {
        return {
            title: '我的地址'
        }
    },
    components: {
        Header,
    }
}
</script>

<style scoped>
.myAddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}

.address-view-bottom {
  position: fixed;
  height: 13.866667vw;
  bottom: 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.266667vw solid #ddd;
  color: #3190e8;
  font-size: 1rem;
}
.address-view-bottom > i {
  font-size: 1.3rem;
  margin-right: 8px;
}

</style>